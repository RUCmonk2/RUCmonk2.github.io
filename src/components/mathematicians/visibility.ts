import type { Mathematician } from "@/data/mathematicians";
import type { ScholarVisuals } from "@/data/scientist-atlas";

import {
  type Camera,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  MIN_ZOOM,
  nodeAppearance,
  type Point,
  portraitTier,
} from "./layout";

/** A nested reveal schedule keeps portraits stable while zooming and panning. */
export function revealPeople(
  people: Mathematician[],
  positions: Record<string, Point>,
  camera: Camera,
  overviewZoom: number,
  viewportWidth: number,
  selected: string,
  focused: string | null,
  neighbors: ReadonlySet<string>,
  explicitScope: boolean,
  visual?: ScholarVisuals,
) {
  const zoom = camera.zoom / overviewZoom;
  const scoped = explicitScope && people.length <= 18;
  const pinned = new Set([selected, focused].filter(Boolean));
  const opacityAt = (person: Mathematician, z: number) => {
    if (
      scoped ||
      pinned.has(person.id) ||
      portraitTier(person.id, visual) === 3
    )
      return 1;
    const fade = (start: number, end: number) => {
      const t = Math.max(0, Math.min(1, (z - start) / (end - start)));
      return t * t * (3 - 2 * t);
    };
    const ordinary =
      portraitTier(person.id, visual) === 2
        ? fade(1.28, 1.62)
        : fade(1.78, 2.12);
    return neighbors.has(person.id)
      ? Math.max(ordinary, fade(1.22, 1.55))
      : ordinary;
  };
  const ordered = [...people].sort((a, b) => {
    const rank = (id: string) =>
      pinned.has(id)
        ? 100
        : portraitTier(id, visual) * 10 + (neighbors.has(id) ? 1 : 0);
    return rank(b.id) - rank(a.id);
  });
  const chosen: Mathematician[] = [];
  const chosenIds = new Set<string>();
  // Every zoom uses a prefix of the same fixed steps, independent of camera
  // position. Once admitted, a portrait never loses its place to a later one.
  const start = MIN_ZOOM / overviewZoom,
    stepSize = 0.04;
  const steps = Math.max(0, Math.floor((zoom - start + 1e-9) / stepSize));
  for (let step = 0; step <= (scoped ? 0 : steps); step++) {
    const z = start + step * stepSize;
    const scale = Math.max(
      0.1,
      (viewportWidth / GRAPH_WIDTH) * overviewZoom * z,
    );
    const gap = Math.max(52, 72 - (z - 1) * 12) / scale;
    for (const person of ordered) {
      if (chosenIds.has(person.id) || opacityAt(person, z) < 0.1) continue;
      const p = positions[person.id];
      const crowded =
        !scoped &&
        !pinned.has(person.id) &&
        chosen.some((other) => {
          const q = positions[other.id];
          return (
            Math.hypot(p.x - q.x, p.y - q.y) <
            nodeAppearance(person.id, scale, visual).radius +
              nodeAppearance(other.id, scale, visual).radius +
              gap
          );
        });
      if (!crowded) {
        chosen.push(person);
        chosenIds.add(person.id);
      }
    }
  }
  const cx = GRAPH_WIDTH / 2 + camera.x,
    cy = GRAPH_HEIGHT / 2 + camera.y;
  const halfWidth = GRAPH_WIDTH / 2 / camera.zoom,
    halfHeight = GRAPH_HEIGHT / 2 / camera.zoom;
  const opacity = new Map<string, number>();
  for (const person of chosen) {
    const p = positions[person.id],
      margin =
        nodeAppearance(
          person.id,
          (viewportWidth / GRAPH_WIDTH) * camera.zoom,
          visual,
        ).radius + 40;
    const inFrame =
      Math.abs(p.x - cx) <= halfWidth + margin &&
      Math.abs(p.y - cy) <= halfHeight + margin;
    if (inFrame || pinned.has(person.id))
      opacity.set(person.id, opacityAt(person, zoom));
  }
  return {
    people: people.filter((person) => opacity.has(person.id)),
    opacity,
    level:
      scoped || zoom >= 1.78
        ? "detail"
        : zoom >= 1.22
          ? "exploring"
          : "overview",
  };
}
