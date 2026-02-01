"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";
import { applyDagreLayout } from "./primitives/auto-layout";

const s = { width: 130, height: 44 };

const rawNodes: Node[] = [
  { id: "start", type: "hqCircle", position: { x: 0, y: 0 }, data: { label: "" }, style: { width: 20, height: 20 } },
  { id: "idle", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "idle" }, style: s },
  { id: "loading", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "loading" }, style: s },
  { id: "planning", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "planning" }, style: s },
  { id: "executing", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "executing" }, style: s },
  { id: "verifying", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "verifying" }, style: s },
  { id: "post_hook", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "post_hook" }, style: s },
  { id: "completed", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "completed" }, style: s },
  { id: "end", type: "hqCircle", position: { x: 0, y: 0 }, data: { label: "" }, style: { width: 20, height: 20 } },
  { id: "error", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "error" }, style: s },
];

const edges: Edge[] = [
  { id: "e1", source: "start", target: "idle", type: "hqDefault" },
  { id: "e2", source: "idle", target: "loading", type: "hqLabeled", data: { label: "skill_requested" } },
  { id: "e3", source: "loading", target: "planning", type: "hqLabeled", data: { label: "context_loaded" } },
  { id: "e4", source: "planning", target: "executing", type: "hqLabeled", data: { label: "plan_ready" } },
  { id: "e5", source: "executing", target: "verifying", type: "hqLabeled", data: { label: "execution_done" } },
  { id: "e6", source: "verifying", target: "post_hook", type: "hqLabeled", data: { label: "verification_passed" } },
  { id: "e7", source: "post_hook", target: "completed", type: "hqLabeled", data: { label: "hook_complete" } },
  { id: "e8", source: "completed", target: "end", type: "hqDefault" },
  { id: "e9", source: "loading", target: "error", type: "hqLabeled", data: { label: "load_failed" } },
  { id: "e10", source: "executing", target: "error", type: "hqLabeled", data: { label: "exec_failed" } },
  { id: "e11", source: "verifying", target: "error", type: "hqLabeled", data: { label: "verify_failed" } },
  { id: "e12", source: "error", target: "loading", type: "hqLabeled", data: { label: "retry" } },
  { id: "e13", source: "error", target: "completed", type: "hqLabeled", data: { label: "max_retries" } },
];

const nodes = applyDagreLayout(rawNodes, edges, { direction: "LR", rankSep: 70, nodeSep: 50 });

export default function StateMachineDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={380}
      ariaLabel="Worker state machine lifecycle from idle through execution to completion or error"
    />
  );
}
