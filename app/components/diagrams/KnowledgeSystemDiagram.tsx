"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";

const ns = { width: 100, height: 34 };

const nodes: Node[] = [
  // Search node (standalone, above groups)
  { id: "search", type: "hqEmphasis", position: { x: 330, y: 0 }, data: { label: "qmd Search", sublabel: "BM25 + Semantic + Hybrid" }, style: { width: 220, height: 52 } },

  // Groups
  { id: "public", type: "hqGroup", position: { x: 0, y: 90 }, data: { label: "Public Knowledge" }, style: { width: 320, height: 175 } },
  { id: "private", type: "hqGroup", position: { x: 340, y: 90 }, data: { label: "Private Knowledge" }, style: { width: 200, height: 120 } },
  { id: "company", type: "hqGroup", position: { x: 560, y: 90 }, data: { label: "Company Knowledge" }, style: { width: 320, height: 130 } },

  // Public children
  { id: "ralph", type: "hqDefault", position: { x: 10, y: 34 }, data: { label: "Ralph" }, style: ns, parentId: "public", extent: "parent" as const },
  { id: "wk", type: "hqDefault", position: { x: 116, y: 34 }, data: { label: "workers" }, style: ns, parentId: "public", extent: "parent" as const },
  { id: "hqc", type: "hqDefault", position: { x: 222, y: 34 }, data: { label: "hq-core" }, style: { width: 90, height: 34 }, parentId: "public", extent: "parent" as const },
  { id: "dt", type: "hqDefault", position: { x: 10, y: 76 }, data: { label: "dev-team" }, style: ns, parentId: "public", extent: "parent" as const },
  { id: "ds", type: "hqDefault", position: { x: 116, y: 76 }, data: { label: "design-styles" }, style: { width: 110, height: 34 }, parentId: "public", extent: "parent" as const },
  { id: "loom", type: "hqDefault", position: { x: 232, y: 76 }, data: { label: "loom" }, style: { width: 80, height: 34 }, parentId: "public", extent: "parent" as const },
  { id: "proj", type: "hqDefault", position: { x: 10, y: 118 }, data: { label: "projects" }, style: ns, parentId: "public", extent: "parent" as const },
  { id: "sec", type: "hqDefault", position: { x: 116, y: 118 }, data: { label: "ai-security" }, style: { width: 110, height: 34 }, parentId: "public", extent: "parent" as const },

  // Private children
  { id: "yt", type: "hqDefault", position: { x: 15, y: 34 }, data: { label: "your-tools" }, style: { width: 170, height: 34 }, parentId: "private", extent: "parent" as const },
  { id: "yd", type: "hqDefault", position: { x: 15, y: 74 }, data: { label: "your-domain" }, style: { width: 170, height: 34 }, parentId: "private", extent: "parent" as const },

  // Company children
  { id: "c1k", type: "hqDefault", position: { x: 10, y: 34 }, data: { label: "company-a/" }, style: { width: 140, height: 34 }, parentId: "company", extent: "parent" as const },
  { id: "c2k", type: "hqDefault", position: { x: 160, y: 34 }, data: { label: "company-b/" }, style: { width: 140, height: 34 }, parentId: "company", extent: "parent" as const },
  { id: "pk", type: "hqDefault", position: { x: 85, y: 76 }, data: { label: "personal/" }, style: { width: 140, height: 34 }, parentId: "company", extent: "parent" as const },
];

const edges: Edge[] = [
  { id: "e1", source: "search", target: "ralph", type: "hqDefault" },
  { id: "e2", source: "search", target: "yt", type: "hqDefault" },
  { id: "e3", source: "search", target: "c1k", type: "hqDefault" },
];

export default function KnowledgeSystemDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={380}
      ariaLabel="Knowledge system with search connecting to public, private, and company knowledge bases"
    />
  );
}
