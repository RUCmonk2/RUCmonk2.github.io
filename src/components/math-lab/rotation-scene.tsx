"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type {
  RotationQuaternion,
  RotationVector,
} from "@/lib/math-lab/rotations";

type RotationSceneProps = {
  quaternion: RotationQuaternion;
  ghostQuaternions?: RotationQuaternion[];
  axis?: RotationVector;
  /** Axis-angle rotation in degrees, including continuous 360° / 720° turns. */
  angle?: number;
  /** Intrinsic ZYX angles, supplied as [roll, pitch, yaw] in degrees. */
  gimbal?: RotationVector;
  resetKey?: number;
  label?: string;
};

type SceneHandle = {
  update: (props: RotationSceneProps) => void;
  reset: () => void;
};

type SceneLabel = {
  sprite: THREE.Sprite;
  baseCenter: THREE.Vector2;
  priority: number;
};

// A small, deterministic search keeps letters near their actual anchors.
const LABEL_OFFSETS = [
  [0, 0],
  [0, -14],
  [14, 0],
  [0, 14],
  [-14, 0],
  [14, -14],
  [-14, -14],
  [14, 14],
  [-14, 14],
  [0, -28],
  [28, 0],
  [0, 28],
  [-28, 0],
  [24, -18],
  [-24, -18],
  [24, 18],
  [-24, 18],
  [18, -24],
  [-18, -24],
  [18, 24],
  [-18, 24],
];

const COLORS = {
  x: 0x8d4b3d,
  y: 0x526557,
  z: 0x536470,
  axis: 0x8d784c,
  trace: 0xaa4436,
};
const X = new THREE.Vector3(1, 0, 0);
const Y = new THREE.Vector3(0, 1, 0);
const Z = new THREE.Vector3(0, 0, 1);
const ORIGIN = new THREE.Vector3();
const TRACE_RADIUS = 1.48;

function makeArrow(
  direction: THREE.Vector3,
  origin: THREE.Vector3,
  length: number,
  color: number,
  headLength: number,
  headWidth: number,
) {
  const arrow = new THREE.ArrowHelper(
    direction,
    origin,
    length,
    color,
    headLength,
    headWidth,
  );
  // ArrowHelper shares geometry globally. Own these copies so changing one
  // scene's axis does not dispose the geometry used by another mounted scene.
  arrow.line.geometry = arrow.line.geometry.clone();
  arrow.cone.geometry = arrow.cone.geometry.clone();
  [arrow.line.material, arrow.cone.material].forEach((material) => {
    if (!Array.isArray(material)) {
      material.transparent = true;
      material.opacity = 0.86;
    }
  });
  return arrow;
}

function asQuaternion([w, x, y, z]: RotationQuaternion) {
  return new THREE.Quaternion(x, y, z, w).normalize();
}

/** Dispose each shared resource once, including CanvasTextures on face labels. */
function disposeTree(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);
    if (mesh.material) {
      const items = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      items.forEach((material) => {
        materials.add(material);
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
      });
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  textures.forEach((texture) => texture.dispose());
}

function clearGroup(group: THREE.Group) {
  disposeTree(group);
  group.clear();
}

function labelTexture(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const fontSize = text.length <= 2 ? 100 : 80;
    const font = /[\u3400-\u9fff]/.test(text)
      ? `${fontSize}px "STKaiti", "KaiTi", "Kaiti SC", serif`
      : `italic ${fontSize}px "Baskerville", "Georgia", serif`;
    context.font = font;
    canvas.width = Math.max(
      112,
      Math.ceil(context.measureText(text).width) + 44,
    );
    // Resizing the canvas resets its drawing state.
    context.clearRect(0, 0, canvas.width, 128);
    context.font = font;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, 68);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addLabel(
  parent: THREE.Object3D,
  text: string,
  color: string,
  position: THREE.Vector3,
  pixelHeight = 30,
  priority = 0,
) {
  const texture = labelTexture(text, color);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      depthTest: false,
      transparent: true,
      toneMapped: false,
      sizeAttenuation: false,
    }),
  );
  sprite.position.copy(position);
  // Convert these CSS-pixel dimensions to camera coordinates before drawing.
  // Narrow comparison panes and zooming should not shrink labels to illegibility.
  sprite.userData.labelPixelHeight = pixelHeight;
  sprite.userData.labelAspect = texture.image.width / texture.image.height;
  sprite.userData.labelPriority = priority;
  sprite.renderOrder = 10;
  parent.add(sprite);
  return sprite;
}

function placeSceneLabels(
  labels: SceneLabel[],
  camera: THREE.PerspectiveCamera,
  viewportWidth: number,
  viewportHeight: number,
) {
  const placed: { left: number; top: number; right: number; bottom: number }[] =
    [];
  const anchor = new THREE.Vector3();
  const pixelScale =
    (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / viewportHeight;
  const margin = 5;
  for (const { sprite, baseCenter } of labels) {
    const height = sprite.userData.labelPixelHeight as number;
    const width = height * sprite.userData.labelAspect;
    sprite.scale.set(width * pixelScale, height * pixelScale, 1);
    sprite.center.copy(baseCenter);
    let ancestor: THREE.Object3D | null = sprite;
    let visible = true;
    while (ancestor) {
      if (!ancestor.visible) {
        visible = false;
        break;
      }
      ancestor = ancestor.parent;
    }
    if (!visible) continue;
    anchor.setFromMatrixPosition(sprite.matrixWorld).project(camera);
    if (anchor.z < -1 || anchor.z > 1) continue;
    const left = ((anchor.x + 1) * viewportWidth) / 2 - baseCenter.x * width;
    const top =
      ((1 - anchor.y) * viewportHeight) / 2 - (1 - baseCenter.y) * height;
    let bestX = 0;
    let bestY = 0;
    let bestScore = Infinity;
    for (const [offsetX, offsetY] of LABEL_OFFSETS) {
      // Edge correction is also bounded: letters never detach far from an axis.
      const x = THREE.MathUtils.clamp(
        THREE.MathUtils.clamp(
          left + offsetX,
          margin,
          viewportWidth - margin - width,
        ) - left,
        -30,
        30,
      );
      const y = THREE.MathUtils.clamp(
        THREE.MathUtils.clamp(
          top + offsetY,
          margin,
          viewportHeight - margin - height,
        ) - top,
        -30,
        30,
      );
      const boxLeft = left + x;
      const boxTop = top + y;
      const outside =
        Math.max(0, margin - boxLeft) +
        Math.max(0, margin - boxTop) +
        Math.max(0, boxLeft + width + margin - viewportWidth) +
        Math.max(0, boxTop + height + margin - viewportHeight);
      let overlap = 0;
      for (const box of placed) {
        // Transparent texture padding is not ink; retain a small optical gap.
        const w =
          Math.min(boxLeft + width - 3, box.right) -
          Math.max(boxLeft + 3, box.left);
        const h =
          Math.min(boxTop + height - 3, box.bottom) -
          Math.max(boxTop + 3, box.top);
        if (w > 0 && h > 0) overlap += 1000 + w * h;
      }
      const score = outside * 10000 + overlap * 100 + x * x + y * y;
      if (score < bestScore) {
        bestScore = score;
        bestX = x;
        bestY = y;
      }
      if (outside === 0 && overlap === 0) break;
    }
    // Sprite.center shifts the label in screen space; its world anchor and all
    // axis/trajectory positions remain untouched.
    sprite.center.set(
      baseCenter.x - bestX / width,
      baseCenter.y + bestY / height,
    );
    placed.push({
      left: left + bestX + 3,
      top: top + bestY + 3,
      right: left + bestX + width - 3,
      bottom: top + bestY + height - 3,
    });
  }
}

function faceMaterial(axis: string, name: string, background: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = background;
    context.fillRect(0, 0, 256, 256);
    // A few quiet paper fibers stay attached to each face, without adding
    // displaced edges or jitter to the mathematical geometry.
    context.strokeStyle = "rgba(77, 72, 59, 0.035)";
    context.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const y = 17 + i * 20;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(256, y + (i % 3) - 1);
      context.stroke();
    }
    context.fillStyle = "#464840";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '88px "STKaiti", "KaiTi", "Kaiti SC", serif';
    context.fillText(name, 128, 112);
    context.fillStyle = "#75786e";
    context.font = 'italic 42px "Baskerville", "Georgia", serif';
    context.fillText(axis, 128, 188);
    // A small vermilion seal provides a second, orientation-specific cue.
    context.strokeStyle = "rgba(170, 68, 54, 0.62)";
    context.lineWidth = 1.5;
    context.strokeRect(190, 23, 39, 39);
    context.fillStyle = "#aa4436";
    context.font = '27px "STKaiti", "KaiTi", "Kaiti SC", serif';
    context.fillText(name, 210, 43);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // Flat paper tones read like a diagram; no specular sheen or overexposure.
  return new THREE.MeshBasicMaterial({ map: texture });
}

function line(
  points: THREE.Vector3[],
  color: number,
  opacity = 1,
  dashed = false,
) {
  const material = dashed
    ? new THREE.LineDashedMaterial({
        color,
        opacity,
        transparent: opacity < 1,
        dashSize: 0.09,
        gapSize: 0.1,
      })
    : new THREE.LineBasicMaterial({
        color,
        opacity,
        transparent: opacity < 1,
      });
  const object = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    material,
  );
  if (dashed) object.computeLineDistances();
  return object;
}

function addWorldAxes(scene: THREE.Scene) {
  const axes: [THREE.Vector3, number, string][] = [
    [X, COLORS.x, "#8d4b3d"],
    [Y, COLORS.y, "#526557"],
    [Z, COLORS.z, "#536470"],
  ];
  axes.forEach(([direction, color, textColor], i) => {
    scene.add(makeArrow(direction, ORIGIN, 2.34, color, 0.1, 0.045));
    scene.add(
      line([ORIGIN, direction.clone().multiplyScalar(-2.2)], color, 0.2, true),
    );
    addLabel(
      scene,
      ["X", "Y", "Z"][i],
      textColor,
      direction.clone().multiplyScalar(2.62),
      30,
    );
  });
  const grid = new THREE.GridHelper(6, 6, 0xaaa596, 0xbab6a9);
  grid.rotation.x = Math.PI / 2;
  grid.position.z = -0.79;
  const materials = Array.isArray(grid.material)
    ? grid.material
    : [grid.material];
  materials.forEach((material) => {
    material.transparent = true;
    material.opacity = 0.16;
    material.depthWrite = false;
  });
  scene.add(grid);
}

function makeBody() {
  const body = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
  body.add(
    new THREE.Mesh(geometry, [
      faceMaterial("+X", "前", "#efebe0"),
      faceMaterial("−X", "后", "#e4e1d7"),
      faceMaterial("+Y", "左", "#e7e8dd"),
      faceMaterial("−Y", "右", "#dddfd7"),
      faceMaterial("+Z", "上", "#f6f2e8"),
      faceMaterial("−Z", "下", "#deddd3"),
    ]),
  );
  body.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: 0x686b60,
        opacity: 0.58,
        transparent: true,
      }),
    ),
  );
  [X, Y, Z].forEach((direction, i) => {
    const color = [COLORS.trace, COLORS.y, COLORS.z][i];
    body.add(
      makeArrow(
        direction,
        ORIGIN,
        i === 0 ? TRACE_RADIUS : 1.13,
        color,
        i === 0 ? 0.12 : 0.09,
        i === 0 ? 0.06 : 0.042,
      ),
    );
  });
  const endpoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 16, 12),
    new THREE.MeshBasicMaterial({ color: COLORS.trace }),
  );
  endpoint.position.copy(X).multiplyScalar(TRACE_RADIUS);
  body.add(endpoint);
  addLabel(
    body,
    "p′",
    "#aa4436",
    X.clone().multiplyScalar(TRACE_RADIUS + 0.3),
    30,
    2,
  );
  return body;
}

function makeGimbals() {
  const root = new THREE.Group();
  const yaw = new THREE.Group();
  const pitch = new THREE.Group();
  const roll = new THREE.Group();
  root.add(yaw);
  yaw.add(pitch);
  pitch.add(roll);

  [
    {
      parent: yaw,
      normal: Z,
      radius: 2.04,
      color: COLORS.z,
      offset: X,
    },
    {
      parent: pitch,
      normal: Y,
      radius: 1.76,
      color: COLORS.y,
      offset: Z,
    },
    {
      parent: roll,
      normal: X,
      radius: 1.48,
      color: COLORS.x,
      offset: Y,
    },
  ].forEach(({ parent, normal, radius, color, offset }) => {
    // TorusGeometry starts in XY, with its normal along +Z.
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.016, 8, 100),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.67 }),
    );
    ring.quaternion.setFromUnitVectors(Z, normal);
    parent.add(ring);
    const shaft = line(
      [
        normal.clone().multiplyScalar(-radius),
        normal.clone().multiplyScalar(radius),
      ],
      color,
      0.38,
      true,
    );
    parent.add(shaft);
    const joint = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 8),
      new THREE.MeshBasicMaterial({ color }),
    );
    joint.position.copy(offset).multiplyScalar(radius);
    parent.add(joint);
  });
  root.visible = false;
  return { root, yaw, pitch, roll };
}

function makeAxisAngle() {
  const root = new THREE.Group();
  const fixedAxis = new THREE.Group();
  fixedAxis.add(
    makeArrow(Z, Z.clone().multiplyScalar(-2.1), 4.2, COLORS.axis, 0.12, 0.06),
  );
  const axisLabel = addLabel(
    fixedAxis,
    "u",
    "#8d784c",
    Z.clone().multiplyScalar(2.22),
    30,
    1,
  );
  // Offset the axis name beside the shaft so u=Z does not cover the Z label.
  axisLabel.center.set(-0.35, 0.5);
  // Allocate GPU buffers and the label texture once. Playing or scrubbing only
  // writes the used vertices; no CanvasTexture / geometry churn per frame.
  const maxSegments = 320;
  const curve = (color: number, opacity: number) => {
    const positions = new THREE.BufferAttribute(
      new Float32Array((maxSegments + 1) * 3),
      3,
    ).setUsage(THREE.DynamicDrawUsage);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", positions);
    geometry.setDrawRange(0, 0);
    const object = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    );
    object.frustumCulled = false;
    return { object, geometry, positions };
  };
  const arc = curve(COLORS.axis, 0.38);
  const trace = curve(COLORS.trace, 0.68);
  const arcHead = makeArrow(X, ORIGIN, 0.14, COLORS.axis, 0.09, 0.045);
  root.add(fixedAxis, arc.object, trace.object, arcHead);
  root.visible = false;

  const direction = new THREE.Vector3();
  const basis = new THREE.Vector3();
  const point = new THREE.Vector3();
  const end = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  let signature = "";
  return {
    root,
    update(axis?: RotationVector, angle?: number) {
      const nextSignature = JSON.stringify([axis, angle]);
      if (signature === nextSignature) return;
      signature = nextSignature;
      if (!axis || angle === undefined || !Number.isFinite(angle)) {
        root.visible = false;
        return;
      }
      direction.set(...axis);
      if (direction.lengthSq() < 1e-10) {
        root.visible = false;
        return;
      }
      root.visible = true;
      direction.normalize();
      fixedAxis.quaternion.setFromUnitVectors(Z, direction);
      basis.copy(Math.abs(direction.dot(Z)) < 0.94 ? Z : X);
      basis.addScaledVector(direction, -basis.dot(direction)).normalize();
      const angleRadians = THREE.MathUtils.degToRad(angle);
      const segments = Math.max(
        2,
        Math.min(maxSegments, Math.ceil(Math.abs(angle) / 3)),
      );
      for (let step = 0; step <= segments; step++) {
        rotation.setFromAxisAngle(direction, (angleRadians * step) / segments);
        point.copy(basis).multiplyScalar(1.91).applyQuaternion(rotation);
        arc.positions.setXYZ(step, point.x, point.y, point.z);
        if (step === segments) end.copy(point);
        point.copy(X).multiplyScalar(TRACE_RADIUS).applyQuaternion(rotation);
        trace.positions.setXYZ(step, point.x, point.y, point.z);
      }
      [arc, trace].forEach(({ geometry, positions }) => {
        geometry.setDrawRange(0, segments + 1);
        positions.needsUpdate = true;
      });
      arcHead.visible = Math.abs(angle) > 2;
      if (arcHead.visible) {
        tangent
          .crossVectors(direction, end)
          .normalize()
          .multiplyScalar(Math.sign(angle));
        arcHead.position.copy(end).addScaledVector(tangent, -0.14);
        arcHead.setDirection(tangent);
      }
    },
  };
}

function drawGhosts(group: THREE.Group, quaternions: RotationQuaternion[]) {
  if (!quaternions.length) return;
  const box = new THREE.BoxGeometry(1.1, 1.1, 1.1);
  const edges = new THREE.EdgesGeometry(box);
  box.dispose();
  const material = new THREE.LineBasicMaterial({
    color: 0x73796b,
    transparent: true,
    opacity: 0.17,
    depthWrite: false,
  });
  // Keep the trajectory detailed without obscuring the object with dense boxes.
  const stride = Math.max(1, Math.ceil(quaternions.length / 9));
  const points: THREE.Vector3[] = [];
  quaternions.forEach((quaternion, index) => {
    const q = asQuaternion(quaternion);
    const tip = X.clone().multiplyScalar(TRACE_RADIUS).applyQuaternion(q);
    points.push(tip);
    if (index % stride === 0 || index === quaternions.length - 1) {
      const ghost = new THREE.LineSegments(edges, material);
      ghost.quaternion.copy(q);
      group.add(ghost);
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 10, 8),
        new THREE.MeshBasicMaterial({
          color: COLORS.trace,
          transparent: true,
          opacity: 0.4,
        }),
      );
      marker.position.copy(tip);
      group.add(marker);
    }
  });
  if (points.length > 1) group.add(line(points, COLORS.trace, 0.48));
}

export default function RotationScene(props: RotationSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<SceneHandle | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setUnavailable(true);
      return;
    }
    let disposed = false;
    let contextLost = false;
    let frame = 0;
    const scene = new THREE.Scene();
    const labels: SceneLabel[] = [];
    let viewportWidth = 1;
    let viewportHeight = 1;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.up.copy(Z);
    camera.position.set(5.7, -6.7, 4.7);
    const canvas = renderer.domElement;
    canvas.tabIndex = 0;
    canvas.setAttribute(
      "aria-label",
      "三维旋转视图。拖动或使用方向键调整视角，加减键缩放，Home 键复位视角。",
    );
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = "none";
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(canvas);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.target.set(0, 0, 0.1);
    controls.update();
    controls.saveState();

    const render = () => {
      frame = 0;
      if (!disposed && !contextLost) {
        scene.updateMatrixWorld();
        camera.updateMatrixWorld();
        placeSceneLabels(labels, camera, viewportWidth, viewportHeight);
        renderer.render(scene, camera);
      }
    };
    const requestRender = () => {
      if (!disposed && !contextLost && !frame)
        frame = window.requestAnimationFrame(render);
    };
    controls.addEventListener("change", requestRender);
    const resize = () => {
      if (disposed) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      viewportWidth = width;
      viewportHeight = height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Keep the shorter dimension's field of view when a pane is narrow.
      camera.fov = THREE.MathUtils.radToDeg(
        2 *
          Math.atan(
            Math.tan(THREE.MathUtils.degToRad(19)) / Math.min(1, camera.aspect),
          ),
      );
      camera.updateProjectionMatrix();
      requestRender();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    addWorldAxes(scene);
    const body = makeBody();
    const ghosts = new THREE.Group();
    const axisAngle = makeAxisAngle();
    const gimbals = makeGimbals();
    scene.add(ghosts, axisAngle.root, gimbals.root, body);
    scene.traverse((object) => {
      if (object instanceof THREE.Sprite)
        labels.push({
          sprite: object,
          baseCenter: object.center.clone(),
          priority: object.userData.labelPriority,
        });
    });
    labels.sort((a, b) => a.priority - b.priority);
    let ghostSignature = "";

    const reset = () => {
      controls.reset();
      requestRender();
    };
    handleRef.current = {
      reset,
      update: ({ quaternion, ghostQuaternions = [], axis, angle, gimbal }) => {
        body.quaternion.copy(asQuaternion(quaternion));
        const nextGhostSignature = JSON.stringify(ghostQuaternions);
        if (nextGhostSignature !== ghostSignature) {
          ghostSignature = nextGhostSignature;
          clearGroup(ghosts);
          drawGhosts(ghosts, ghostQuaternions);
        }
        axisAngle.update(axis, angle);
        gimbals.root.visible = Boolean(gimbal);
        if (gimbal) {
          const [roll, pitch, yaw] = gimbal.map(THREE.MathUtils.degToRad);
          gimbals.yaw.quaternion.setFromAxisAngle(Z, yaw);
          gimbals.pitch.quaternion.setFromAxisAngle(Y, pitch);
          gimbals.roll.quaternion.setFromAxisAngle(X, roll);
        }
        requestRender();
      },
    };

    const handleKey = (event: KeyboardEvent) => {
      const offset = camera.position.clone().sub(controls.target);
      const step = 0.1;
      switch (event.key) {
        case "ArrowLeft":
          offset.applyAxisAngle(Z, -step);
          break;
        case "ArrowRight":
          offset.applyAxisAngle(Z, step);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          const right = new THREE.Vector3().crossVectors(offset, Z).normalize();
          offset.applyAxisAngle(right, event.key === "ArrowUp" ? -step : step);
          break;
        }
        case "+":
        case "=":
          offset.multiplyScalar(0.9);
          break;
        case "-":
          offset.multiplyScalar(1.1);
          break;
        case "Home":
          event.preventDefault();
          reset();
          return;
        default:
          return;
      }
      event.preventDefault();
      offset.setLength(
        THREE.MathUtils.clamp(
          offset.length(),
          controls.minDistance,
          controls.maxDistance,
        ),
      );
      camera.position.copy(controls.target).add(offset);
      controls.update();
      requestRender();
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      setUnavailable(true);
    };
    const handleContextRestored = () => {
      contextLost = false;
      setUnavailable(false);
      resize();
    };
    canvas.addEventListener("keydown", handleKey);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    resize();

    return () => {
      disposed = true;
      handleRef.current = null;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      controls.removeEventListener("change", requestRender);
      controls.dispose();
      disposeTree(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    handleRef.current?.update(props);
  }, [props]);

  useEffect(() => {
    handleRef.current?.reset();
  }, [props.resetKey]);

  return (
    <div
      className="rotation-scene"
      style={{ position: "relative", minHeight: 340, height: "100%" }}
      aria-label={props.label || "交互式三维旋转实验"}
      role="group"
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          visibility: unavailable ? "hidden" : "visible",
        }}
      />
      {props.gimbal && !unavailable && (
        <div
          className="rotation-gimbal-legend"
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            right: 16,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "4px 14px",
            fontSize: 11,
            fontFamily: '"STKaiti", "KaiTi", "Baskerville", "Georgia", serif',
            lineHeight: 1.6,
            pointerEvents: "none",
          }}
        >
          {[
            ["外环 Z · yaw", COLORS.z],
            ["中环 Y · pitch", COLORS.y],
            ["内环 X · roll", COLORS.x],
          ].map(([text, color]) => (
            <span
              key={text}
              style={{ color: `#${color.toString(16)}`, whiteSpace: "nowrap" }}
            >
              {text}
            </span>
          ))}
        </div>
      )}
      {unavailable && (
        <div
          className="rotation-scene-fallback"
          role="status"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            alignContent: "center",
            padding: 28,
            textAlign: "center",
          }}
        >
          <strong>三维视图暂时不可用</strong>
          <p>
            当前浏览器未能启用 WebGL。下方的旋转控制、数值和数学实验仍可使用。
          </p>
        </div>
      )}
    </div>
  );
}
