"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";
import { applyDagreLayout } from "./primitives/auto-layout";

const rawNodes: Node[] = [
  { id: "task", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Task Execution" }, style: { width: 180, height: 48 } },
  { id: "remember", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "/remember", sublabel: "User correction" }, style: { width: 180, height: 52 } },
  { id: "learn", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "/learn", sublabel: "Auto-capture" }, style: { width: 180, height: 52 } },
  { id: "classify", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Classify Scope", sublabel: "worker + command + knowledge + global" }, style: { width: 200, height: 52 } },
  { id: "inject", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "Inject Rule", sublabel: "into governing file" }, style: { width: 200, height: 48 } },
  { id: "log", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Event Log", sublabel: "workspace/learnings/*.json" }, style: { width: 200, height: 48 } },
];

const edges: Edge[] = [
  { id: "e1", source: "task", target: "learn", type: "hqDefault" },
  { id: "e2", source: "remember", target: "learn", type: "hqDefault" },
  { id: "e3", source: "learn", target: "classify", type: "hqDefault" },
  { id: "e4", source: "classify", target: "inject", type: "hqDefault" },
  { id: "e5", source: "classify", target: "log", type: "hqDefault" },
];

const nodes = applyDagreLayout(rawNodes, edges, { direction: "LR", rankSep: 60, nodeSep: 40 });

export default function LearningSystemDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={350}
      ariaLabel="Learning system flow from task execution through classification to rule injection"
    />
  );
}
