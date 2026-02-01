"use client";

import type { Node } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";

const nodes: Node[] = [
  // Groups
  { id: "compA", type: "hqGroup", position: { x: 0, y: 0 }, data: { label: "Company A" }, style: { width: 240, height: 200 } },
  { id: "compB", type: "hqGroup", position: { x: 270, y: 0 }, data: { label: "Company B" }, style: { width: 240, height: 200 } },
  { id: "personal", type: "hqGroup", position: { x: 540, y: 0 }, data: { label: "Personal" }, style: { width: 240, height: 200 } },
  // Company A children
  { id: "a-settings", type: "hqDefault", position: { x: 15, y: 35 }, data: { label: "settings/" }, style: { width: 210, height: 40 }, parentId: "compA", extent: "parent" as const },
  { id: "a-data", type: "hqDefault", position: { x: 15, y: 85 }, data: { label: "data/" }, style: { width: 210, height: 40 }, parentId: "compA", extent: "parent" as const },
  { id: "a-knowledge", type: "hqDefault", position: { x: 15, y: 135 }, data: { label: "knowledge/" }, style: { width: 210, height: 40 }, parentId: "compA", extent: "parent" as const },
  // Company B children
  { id: "b-settings", type: "hqDefault", position: { x: 15, y: 35 }, data: { label: "settings/" }, style: { width: 210, height: 40 }, parentId: "compB", extent: "parent" as const },
  { id: "b-data", type: "hqDefault", position: { x: 15, y: 85 }, data: { label: "data/" }, style: { width: 210, height: 40 }, parentId: "compB", extent: "parent" as const },
  { id: "b-knowledge", type: "hqDefault", position: { x: 15, y: 135 }, data: { label: "knowledge/" }, style: { width: 210, height: 40 }, parentId: "compB", extent: "parent" as const },
  // Personal children
  { id: "p-settings", type: "hqDefault", position: { x: 15, y: 35 }, data: { label: "settings/" }, style: { width: 210, height: 40 }, parentId: "personal", extent: "parent" as const },
  { id: "p-knowledge", type: "hqDefault", position: { x: 15, y: 85 }, data: { label: "knowledge/" }, style: { width: 210, height: 40 }, parentId: "personal", extent: "parent" as const },
];

export default function CompanyIsolationDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={[]}
      nodeTypes={hqNodeTypes}
      height={260}
      ariaLabel="Company isolation architecture showing three isolated contexts"
    />
  );
}
