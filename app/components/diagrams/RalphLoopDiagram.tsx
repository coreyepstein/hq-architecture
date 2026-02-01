"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import type { NodeDef, EdgeDef } from "./primitives/types";

const nodes: NodeDef[] = [
  { id: "prd", x: 20, y: 100, width: 120, height: 48, label: "Read PRD", variant: "rounded" },
  { id: "pick", x: 170, y: 100, width: 140, height: 48, label: "Pick Task", sublabel: "passes: false", variant: "rounded" },
  { id: "spawn", x: 340, y: 100, width: 150, height: 48, label: "Spawn Agent", sublabel: "fresh context", variant: "rounded" },
  { id: "exec", x: 520, y: 100, width: 140, height: 48, label: "Execute Task", variant: "rounded" },
  { id: "bp", x: 690, y: 100, width: 160, height: 48, label: "Back Pressure", sublabel: "typecheck + build + test", variant: "rounded", emphasis: true },
  { id: "cp", x: 880, y: 100, width: 140, height: 48, label: "Checkpoint", sublabel: "thread + git", variant: "rounded" },
  { id: "update", x: 1050, y: 100, width: 140, height: 48, label: "Update PRD", sublabel: "passes: true", variant: "rounded" },
  { id: "check", x: 1050, y: 210, width: 140, height: 48, label: "All passing?", variant: "diamond" },
  { id: "done", x: 1050, y: 310, width: 140, height: 48, label: "Create PR", variant: "rounded", emphasis: true },
];

const edges: EdgeDef[] = [
  { from: "prd", to: "pick" },
  { from: "pick", to: "spawn" },
  { from: "spawn", to: "exec" },
  { from: "exec", to: "bp" },
  { from: "bp", to: "cp" },
  { from: "cp", to: "update" },
  { from: "update", to: "check", fromSide: "bottom", toSide: "top" },
  { from: "check", to: "done", label: "Yes", fromSide: "bottom", toSide: "top" },
  // Loop back
  { from: "check", to: "pick", label: "No", fromSide: "left", toSide: "bottom", waypoints: [{ x: 240, y: 234 }] },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function RalphLoopDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 1220 380" ariaLabel="Ralph loop orchestration flow with back-pressure and loopback">
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.2 + i * 0.04} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={i * 0.05} />
      ))}
    </DiagramCanvas>
  );
}
