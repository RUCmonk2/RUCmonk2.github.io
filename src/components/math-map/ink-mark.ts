// Small, deterministic variations survive hydration and moving the nodes.
// Coordinates stay close to a unit circle: radius still encodes connections.
export function inkMark(id: string) {
  let seed = 2166136261;
  for (const char of id) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619);
  const random = () => {
    seed = Math.imul(seed, 1664525) + 1013904223;
    return (seed >>> 0) / 4294967296;
  };
  const rotation = random() * Math.PI * 2;
  const points = Array.from({ length: 14 }, (_, i) => {
    const angle = rotation + (i / 14) * Math.PI * 2;
    const radius = 0.94 + random() * 0.14;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
  const number = (value: number) => value.toFixed(3);
  const first = points[0],
    last = points[points.length - 1];
  let path = `M${number((last.x + first.x) / 2)},${number((last.y + first.y) / 2)}`;
  for (let i = 0; i < points.length; i++) {
    const p = points[i],
      next = points[(i + 1) % points.length];
    path += `Q${number(p.x)},${number(p.y)} ${number((p.x + next.x) / 2)},${number((p.y + next.y) / 2)}`;
  }
  return path + "Z";
}
