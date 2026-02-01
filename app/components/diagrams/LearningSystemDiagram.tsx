"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import type { NodeDef, EdgeDef } from "./primitives/types";

const nodes: NodeDef[] = [
  { id: "task", x: 40, y: 20, width: 180, height: 48, label: "Task Execution", variant: "rounded" },
  { id: "remember", x: 40, y: 110, width: 180, height: 52, label: "/remember", sublabel: "User correction", variant: "rounded", emphasis: true },
  { id: "learn", x: 280, y: 65, width: 180, height: 52, label: "/learn", sublabel: "Auto-capture", variant: "rounded" },
  { id: "classify", x: 520, y: 65, width: 200, height: 52, label: "Classify Scope", sublabel: "worker + command + knowledge + global", variant: "rounded" },
  { id: "inject", x: 520, y: 180, width: 200, height: 48, label: "Inject Rule", sublabel: "into governing file", variant: "rounded", emphasis: true },
  { id: "log", x: 520, y: 270, width: 200, height: 48, label: "Event Log", sublabel: "workspace/learnings/*.json", variant: "rounded" },
];

const edges: EdgeDef[] = [
  { from: "task", to: "learn", fromSide: "right", toSide: "left" },
  { from: "remember", to: "learn", fromSide: "right", toSide: "left" },
  { from: "learn", to: "classify" },
  { from: "classify", to: "inject", fromSide: "bottom", toSide: "top" },
  { from: "classify", to: "log", fromSide: "bottom", toSide: "top" },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function LearningSystemDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 760 340" ariaLabel="Learning system flow from task execution through classification to rule injection">
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.2 + i * 0.04} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={i * 0.06} />
      ))}
    </DiagramCanvas>
  );
}
