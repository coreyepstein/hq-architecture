"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";

const nw = 270;
const nh = 36;

const nodes: Node[] = [
  // Groups
  { id: "hqGroup", type: "hqGroup", position: { x: 0, y: 0 }, data: { label: "HQ Git Repo" }, style: { width: 300, height: 170 } },
  { id: "reposGroup", type: "hqGroup", position: { x: 500, y: 0 }, data: { label: "Independent Git Repos" }, style: { width: 340, height: 170 } },

  // HQ children
  { id: "k1", type: "hqDefault", position: { x: 15, y: 35 }, data: { label: "knowledge/public/Ralph" }, style: { width: nw, height: nh }, parentId: "hqGroup", extent: "parent" as const },
  { id: "k2", type: "hqDefault", position: { x: 15, y: 80 }, data: { label: "knowledge/public/workers" }, style: { width: nw, height: nh }, parentId: "hqGroup", extent: "parent" as const },
  { id: "ck", type: "hqDefault", position: { x: 15, y: 125 }, data: { label: "companies/company-a/knowledge" }, style: { width: nw, height: nh }, parentId: "hqGroup", extent: "parent" as const },

  // Repo children
  { id: "r1", type: "hqDefault", position: { x: 15, y: 35 }, data: { label: "repos/public/ralph-methodology" }, style: { width: 310, height: nh }, parentId: "reposGroup", extent: "parent" as const },
  { id: "r2", type: "hqDefault", position: { x: 15, y: 80 }, data: { label: "repos/public/knowledge-workers" }, style: { width: 310, height: nh }, parentId: "reposGroup", extent: "parent" as const },
  { id: "r3", type: "hqDefault", position: { x: 15, y: 125 }, data: { label: "repos/private/knowledge-company-a" }, style: { width: 310, height: nh }, parentId: "reposGroup", extent: "parent" as const },
];

const edges: Edge[] = [
  { id: "e1", source: "k1", target: "r1", type: "hqDashedLabeled", data: { label: "symlink" } },
  { id: "e2", source: "k2", target: "r2", type: "hqDashedLabeled", data: { label: "symlink" } },
  { id: "e3", source: "ck", target: "r3", type: "hqDashedLabeled", data: { label: "symlink" } },
];

export default function KnowledgeReposDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={240}
      ariaLabel="Knowledge repos architecture showing HQ symlinks pointing to independent git repos"
    />
  );
}
