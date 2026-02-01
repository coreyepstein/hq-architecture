"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";
import { applyDagreLayout } from "./primitives/auto-layout";

const rawNodes: Node[] = [
  { id: "input", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Inputs", sublabel: "string + number + boolean + array" }, style: { width: 200, height: 50 } },
  { id: "worker", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Worker + Skill", sublabel: "worker.yaml + skills/*.md" }, style: { width: 200, height: 50 } },
  { id: "verify", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "Verification", sublabel: "shell commands + must_pass" }, style: { width: 200, height: 50 } },
  { id: "mutating", type: "hqDiamond", position: { x: 0, y: 0 }, data: { label: "mutating?" }, style: { width: 70, height: 70 } },
  { id: "hook", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "PostToolsHook", sublabel: "checkpoint + metrics + thread" }, style: { width: 200, height: 50 } },
  { id: "readonly", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Read-only", sublabel: "no side effects" }, style: { width: 200, height: 50 } },
  { id: "output", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "Outputs", sublabel: "markdown + json + git_commit" }, style: { width: 200, height: 50 } },
];

const edges: Edge[] = [
  { id: "e1", source: "input", target: "worker", type: "hqDefault" },
  { id: "e2", source: "worker", target: "verify", type: "hqDefault" },
  { id: "e3", source: "verify", target: "mutating", type: "hqDefault" },
  { id: "e4", source: "mutating", target: "hook", type: "hqLabeled", data: { label: "true" } },
  { id: "e5", source: "mutating", target: "readonly", type: "hqLabeled", data: { label: "false" } },
  { id: "e6", source: "hook", target: "output", type: "hqDefault" },
  { id: "e7", source: "readonly", target: "output", type: "hqDefault" },
];

const nodes = applyDagreLayout(rawNodes, edges, { direction: "TB", rankSep: 50, nodeSep: 60 });

export default function SkillExecutionDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={550}
      ariaLabel="Skill execution flow with verification and mutating decision fork"
    />
  );
}
