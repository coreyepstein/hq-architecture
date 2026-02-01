"use client";

import type { Node } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";

const nw = 125;
const nh = 32;
const gap = 6;

function col(c: number) { return 10 + c * (nw + gap); }
function row(r: number) { return 34 + r * (nh + gap); }

const nodes: Node[] = [
  // Groups
  { id: "dev", type: "hqGroup", position: { x: 0, y: 0 }, data: { label: "Dev Team  (12)" }, style: { width: 3 * nw + 4 * gap + 20, height: 4 * nh + 5 * gap + 34 } },
  { id: "content", type: "hqGroup", position: { x: 420, y: 0 }, data: { label: "Content Team  (5)" }, style: { width: 2 * 115 + 30, height: 3 * nh + 4 * gap + 34 } },
  { id: "utility", type: "hqGroup", position: { x: 420, y: 160 }, data: { label: "Utility  (3)" }, style: { width: 2 * 115 + 30, height: nh + 2 * gap + 34 } },
  { id: "custom", type: "hqGroup", position: { x: 690, y: 0 }, data: { label: "Custom  (you create)" }, style: { width: 200, height: 4 * nh + 5 * gap + 34 } },

  // Dev Team
  { id: "pm", type: "hqDefault", position: { x: col(0), y: row(0) }, data: { label: "project-manager" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "te", type: "hqDefault", position: { x: col(0), y: row(1) }, data: { label: "task-executor" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "arch", type: "hqDefault", position: { x: col(0), y: row(2) }, data: { label: "architect" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "be", type: "hqDefault", position: { x: col(0), y: row(3) }, data: { label: "backend-dev" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "db", type: "hqDefault", position: { x: col(1), y: row(0) }, data: { label: "database-dev" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "fe", type: "hqDefault", position: { x: col(1), y: row(1) }, data: { label: "frontend-dev" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "infra", type: "hqDefault", position: { x: col(1), y: row(2) }, data: { label: "infra-dev" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "md", type: "hqDefault", position: { x: col(1), y: row(3) }, data: { label: "motion-designer" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "cr", type: "hqDefault", position: { x: col(2), y: row(0) }, data: { label: "code-reviewer" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "kc", type: "hqDefault", position: { x: col(2), y: row(1) }, data: { label: "knowledge-curator" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "pp", type: "hqDefault", position: { x: col(2), y: row(2) }, data: { label: "product-planner" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },
  { id: "dqa", type: "hqDefault", position: { x: col(2), y: row(3) }, data: { label: "dev-qa-tester" }, style: { width: nw, height: nh }, parentId: "dev", extent: "parent" as const },

  // Content Team
  { id: "cb", type: "hqDefault", position: { x: 10, y: 34 }, data: { label: "content-brand" }, style: { width: 115, height: nh }, parentId: "content", extent: "parent" as const },
  { id: "cs", type: "hqDefault", position: { x: 10, y: 34 + nh + gap }, data: { label: "content-sales" }, style: { width: 115, height: nh }, parentId: "content", extent: "parent" as const },
  { id: "cp", type: "hqDefault", position: { x: 135, y: 34 }, data: { label: "content-product" }, style: { width: 115, height: nh }, parentId: "content", extent: "parent" as const },
  { id: "cl", type: "hqDefault", position: { x: 135, y: 34 + nh + gap }, data: { label: "content-legal" }, style: { width: 115, height: nh }, parentId: "content", extent: "parent" as const },
  { id: "csh", type: "hqDefault", position: { x: 10, y: 34 + 2 * (nh + gap) }, data: { label: "content-shared" }, style: { width: 115, height: nh }, parentId: "content", extent: "parent" as const },

  // Utility
  { id: "fd", type: "hqDefault", position: { x: 10, y: 34 }, data: { label: "frontend-designer" }, style: { width: 115, height: nh }, parentId: "utility", extent: "parent" as const },
  { id: "qt", type: "hqDefault", position: { x: 135, y: 34 }, data: { label: "qa-tester" }, style: { width: 115, height: nh }, parentId: "utility", extent: "parent" as const },

  // Custom
  { id: "yc", type: "hqDefault", position: { x: 10, y: row(0) }, data: { label: "your-cfo" }, style: { width: 180, height: nh }, parentId: "custom", extent: "parent" as const },
  { id: "ym", type: "hqDefault", position: { x: 10, y: row(1) }, data: { label: "your-cmo" }, style: { width: 180, height: nh }, parentId: "custom", extent: "parent" as const },
  { id: "ya", type: "hqDefault", position: { x: 10, y: row(2) }, data: { label: "your-analyst" }, style: { width: 180, height: nh }, parentId: "custom", extent: "parent" as const },
  { id: "ys", type: "hqDefault", position: { x: 10, y: row(3) }, data: { label: "your-social" }, style: { width: 180, height: nh }, parentId: "custom", extent: "parent" as const },
];

export default function WorkerHierarchyDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={[]}
      nodeTypes={hqNodeTypes}
      height={310}
      ariaLabel="Worker hierarchy organized into Dev Team, Content Team, Utility, and Custom groups"
    />
  );
}
