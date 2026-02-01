"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import type { NodeDef, EdgeDef } from "./primitives/types";

const nodes: NodeDef[] = [
  // Start
  { id: "start", x: 20, y: 130, width: 28, height: 28, label: "", variant: "circle" },
  // States — main flow
  { id: "idle", x: 80, y: 120, width: 120, height: 44, label: "idle", variant: "rounded" },
  { id: "loading", x: 240, y: 120, width: 140, height: 44, label: "loading", variant: "rounded" },
  { id: "planning", x: 420, y: 120, width: 140, height: 44, label: "planning", variant: "rounded" },
  { id: "executing", x: 600, y: 120, width: 150, height: 44, label: "executing", variant: "rounded" },
  { id: "verifying", x: 790, y: 120, width: 150, height: 44, label: "verifying", variant: "rounded", emphasis: true },
  { id: "post_hook", x: 980, y: 120, width: 150, height: 44, label: "post_hook", variant: "rounded" },
  { id: "completed", x: 1060, y: 240, width: 150, height: 44, label: "completed", variant: "rounded" },
  // End
  { id: "end", x: 1152, y: 310, width: 28, height: 28, label: "", variant: "circle" },
  // Error — below
  { id: "error", x: 520, y: 260, width: 140, height: 44, label: "error", variant: "rounded" },
];

const edges: EdgeDef[] = [
  { from: "start", to: "idle", label: "" },
  { from: "idle", to: "loading", label: "skill_requested" },
  { from: "loading", to: "planning", label: "context_loaded" },
  { from: "planning", to: "executing", label: "plan_ready" },
  { from: "executing", to: "verifying", label: "execution_done" },
  { from: "verifying", to: "post_hook", label: "verification_passed" },
  { from: "post_hook", to: "completed", label: "hook_complete", fromSide: "bottom", toSide: "top" },
  { from: "completed", to: "end", fromSide: "bottom", toSide: "top" },
  // Error branches
  { from: "loading", to: "error", label: "load_failed", fromSide: "bottom", toSide: "top" },
  { from: "executing", to: "error", label: "exec_failed", fromSide: "bottom", toSide: "top" },
  { from: "verifying", to: "error", label: "verify_failed", fromSide: "bottom", toSide: "top" },
  // Retry
  { from: "error", to: "loading", label: "retry", fromSide: "left", toSide: "bottom", waypoints: [{ x: 310, y: 282 }] },
  // Max retries
  { from: "error", to: "completed", label: "max_retries" },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function StateMachineDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 1240 360" ariaLabel="Worker state machine lifecycle from idle through execution to completion or error">
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.2 + i * 0.03} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={i * 0.05} />
      ))}
    </DiagramCanvas>
  );
}
