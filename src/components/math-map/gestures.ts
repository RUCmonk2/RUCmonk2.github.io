import { type Camera, GRAPH_HEIGHT, GRAPH_WIDTH, type Point } from "./layout";

export const MIN_ZOOM = 0.25;
export const MAX_ZOOM = 6;
export function zoomAt(camera: Camera, factor: number, anchor: Point): Camera {
  const zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, camera.zoom * factor));
  const ratio = zoom / camera.zoom;
  return {
    zoom,
    x: anchor.x - (anchor.x - camera.x) * ratio,
    y: anchor.y - (anchor.y - camera.y) * ratio,
  };
}

type Surface = Pick<
  SVGSVGElement,
  "addEventListener" | "removeEventListener" | "getBoundingClientRect"
>;
type Gesture = Event & { scale: number; clientX?: number; clientY?: number };
// Native, non-passive listeners are necessary: a passive wheel listener cannot
// cancel the browser's trackpad zoom. Scope all listeners to this SVG only.
export function bindGraphGestures(
  surface: Surface,
  update: (change: (previous: Camera) => Camera) => void,
  onActivity?: () => void,
) {
  let safariGesture = false;
  let previousScale = 1;
  const anchor = (event: { clientX?: number; clientY?: number }): Point => {
    const box = surface.getBoundingClientRect();
    const scale = Math.min(box.width / GRAPH_WIDTH, box.height / GRAPH_HEIGHT);
    return {
      x:
        ((event.clientX ?? box.left + box.width / 2) -
          box.left -
          (box.width - GRAPH_WIDTH * scale) / 2) /
        scale,
      y:
        ((event.clientY ?? box.top + box.height / 2) -
          box.top -
          (box.height - GRAPH_HEIGHT * scale) / 2) /
        scale,
    };
  };
  const wheel = (raw: Event) => {
    onActivity?.();
    const event = raw as WheelEvent;
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    event.stopPropagation();
    if (safariGesture) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 800 : 1;
    const factor = Math.exp(
      Math.max(-0.4, Math.min(0.4, -event.deltaY * unit * 0.01)),
    );
    const target = anchor(event);
    update((camera) => zoomAt(camera, factor, target));
  };
  const start = (event: Event) => {
    onActivity?.();
    event.preventDefault();
    event.stopPropagation();
    safariGesture = true;
    previousScale = (event as Gesture).scale || 1;
  };
  const change = (event: Event) => {
    onActivity?.();
    event.preventDefault();
    event.stopPropagation();
    const gesture = event as Gesture;
    if (!safariGesture || !Number.isFinite(gesture.scale) || gesture.scale <= 0)
      return;
    const factor = gesture.scale / previousScale;
    previousScale = gesture.scale;
    const target = anchor(gesture);
    update((camera) => zoomAt(camera, factor, target));
  };
  const end = (event: Event) => {
    onActivity?.();
    event.preventDefault();
    event.stopPropagation();
    safariGesture = false;
  };
  const options = { passive: false, capture: true };
  surface.addEventListener("wheel", wheel, options);
  surface.addEventListener("gesturestart", start, options);
  surface.addEventListener("gesturechange", change, options);
  surface.addEventListener("gestureend", end, options);
  return () => {
    surface.removeEventListener("wheel", wheel, options);
    surface.removeEventListener("gesturestart", start, options);
    surface.removeEventListener("gesturechange", change, options);
    surface.removeEventListener("gestureend", end, options);
  };
}
