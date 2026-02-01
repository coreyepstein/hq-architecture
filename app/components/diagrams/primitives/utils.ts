import type { Point, NodeDef } from "./types";

const DEFAULT_W = 160;
const DEFAULT_H = 48;

export function getNodePort(
  node: NodeDef,
  side: "top" | "right" | "bottom" | "left"
): Point {
  const w = node.width ?? DEFAULT_W;
  const h = node.height ?? DEFAULT_H;
  switch (side) {
    case "top":
      return { x: node.x + w / 2, y: node.y };
    case "bottom":
      return { x: node.x + w / 2, y: node.y + h };
    case "left":
      return { x: node.x, y: node.y + h / 2 };
    case "right":
      return { x: node.x + w, y: node.y + h / 2 };
  }
}

export function autoSide(
  from: NodeDef,
  to: NodeDef
): { fromSide: "top" | "right" | "bottom" | "left"; toSide: "top" | "right" | "bottom" | "left" } {
  const fw = from.width ?? DEFAULT_W;
  const fh = from.height ?? DEFAULT_H;
  const tw = to.width ?? DEFAULT_W;
  const th = to.height ?? DEFAULT_H;
  const fcx = from.x + fw / 2;
  const fcy = from.y + fh / 2;
  const tcx = to.x + tw / 2;
  const tcy = to.y + th / 2;
  const dx = tcx - fcx;
  const dy = tcy - fcy;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0
      ? { fromSide: "right", toSide: "left" }
      : { fromSide: "left", toSide: "right" };
  }
  return dy > 0
    ? { fromSide: "bottom", toSide: "top" }
    : { fromSide: "top", toSide: "bottom" };
}

export function computePath(from: Point, to: Point, waypoints?: Point[]): string {
  if (!waypoints || waypoints.length === 0) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    // Use a cubic bezier that curves based on dominant direction
    if (Math.abs(dx) > Math.abs(dy)) {
      const midX = from.x + dx / 2;
      return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
    }
    const midY = from.y + dy / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
  }
  const points = [from, ...waypoints, to];
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      const midX = prev.x + dx / 2;
      d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
    } else {
      const midY = prev.y + dy / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
  }
  return d;
}
