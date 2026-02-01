"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";
import { applyDagreLayout } from "./primitives/auto-layout";

const rawNodes: Node[] = [
  { id: "root", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "INDEX.md", sublabel: "Root directory map" }, style: { width: 180, height: 52 } },
  { id: "projects", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "projects/INDEX.md" }, style: { width: 170, height: 44 } },
  { id: "workers", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "workers/INDEX.md" }, style: { width: 170, height: 44 } },
  { id: "knowledge", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "knowledge/INDEX.md" }, style: { width: 180, height: 44 } },
  { id: "workspace", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "workspace/INDEX.md" }, style: { width: 180, height: 44 } },
  { id: "kpub", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "public/INDEX.md" }, style: { width: 160, height: 44 } },
  { id: "orch", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "orchestrator/INDEX.md" }, style: { width: 190, height: 44 } },
  { id: "reports", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "reports/INDEX.md" }, style: { width: 160, height: 44 } },
];

const edges: Edge[] = [
  { id: "e1", source: "root", target: "projects", type: "hqDefault" },
  { id: "e2", source: "root", target: "workers", type: "hqDefault" },
  { id: "e3", source: "root", target: "knowledge", type: "hqDefault" },
  { id: "e4", source: "root", target: "workspace", type: "hqDefault" },
  { id: "e5", source: "knowledge", target: "kpub", type: "hqDefault" },
  { id: "e6", source: "workspace", target: "orch", type: "hqDefault" },
  { id: "e7", source: "workspace", target: "reports", type: "hqDefault" },
];

const nodes = applyDagreLayout(rawNodes, edges, { direction: "TB", rankSep: 55, nodeSep: 30 });

export default function IndexMdDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={380}
      ariaLabel="INDEX.md hierarchical navigation system"
    />
  );
}
