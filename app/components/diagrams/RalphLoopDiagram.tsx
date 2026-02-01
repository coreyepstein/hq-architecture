"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";
import { applyDagreLayout } from "./primitives/auto-layout";

const s = { width: 140, height: 48 };

const rawNodes: Node[] = [
  { id: "prd", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Read PRD" }, style: s },
  { id: "pick", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Pick Task", sublabel: "passes: false" }, style: s },
  { id: "spawn", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Spawn Agent", sublabel: "fresh context" }, style: { width: 150, height: 48 } },
  { id: "exec", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Execute Task" }, style: s },
  { id: "bp", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "Back Pressure", sublabel: "typecheck + build + test" }, style: { width: 160, height: 48 } },
  { id: "cp", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Checkpoint", sublabel: "thread + git" }, style: s },
  { id: "update", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Update PRD", sublabel: "passes: true" }, style: s },
  { id: "check", type: "hqDiamond", position: { x: 0, y: 0 }, data: { label: "All passing?" }, style: { width: 65, height: 65 } },
  { id: "done", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "Create PR" }, style: s },
];

const edges: Edge[] = [
  { id: "e1", source: "prd", target: "pick", type: "hqDefault" },
  { id: "e2", source: "pick", target: "spawn", type: "hqDefault" },
  { id: "e3", source: "spawn", target: "exec", type: "hqDefault" },
  { id: "e4", source: "exec", target: "bp", type: "hqDefault" },
  { id: "e5", source: "bp", target: "cp", type: "hqDefault" },
  { id: "e6", source: "cp", target: "update", type: "hqDefault" },
  { id: "e7", source: "update", target: "check", type: "hqDefault" },
  { id: "e8", source: "check", target: "done", type: "hqLabeled", data: { label: "Yes" } },
  { id: "e9", source: "check", target: "pick", type: "hqLabeled", data: { label: "No" } },
];

const nodes = applyDagreLayout(rawNodes, edges, { direction: "LR", rankSep: 60, nodeSep: 40 });

export default function RalphLoopDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={400}
      ariaLabel="Ralph loop orchestration flow with back-pressure and loopback"
    />
  );
}
