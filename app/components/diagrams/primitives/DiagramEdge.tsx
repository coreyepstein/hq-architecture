"use client";

import { motion } from "motion/react";
import type { NodeDef, EdgeDef } from "./types";
import { t } from "./theme";
import { getNodePort, autoSide, computePath } from "./utils";

interface DiagramEdgeProps extends EdgeDef {
  nodes: Map<string, NodeDef>;
  delay?: number;
}

export default function DiagramEdge({
  from,
  to,
  label,
  dashed = false,
  fromSide,
  toSide,
  waypoints,
  nodes,
  delay = 0,
}: DiagramEdgeProps) {
  const fromNode = nodes.get(from);
  const toNode = nodes.get(to);
  if (!fromNode || !toNode) return null;

  const sides = fromSide && toSide
    ? { fromSide, toSide }
    : autoSide(fromNode, toNode);

  const start = getNodePort(fromNode, fromSide ?? sides.fromSide);
  const end = getNodePort(toNode, toSide ?? sides.toSide);
  const d = computePath(start, end, waypoints);

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <path
        d={d}
        fill="none"
        stroke={t.edgeStroke}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "6 4" : undefined}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={midX}
          y={midY - 6}
          textAnchor="middle"
          fill={t.edgeLabel}
          fontFamily={t.fontMono}
          fontSize={10}
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}
