"use client";

import type { Node, Edge } from "@xyflow/react";
import FlowDiagram from "./primitives/FlowDiagram";
import { hqNodeTypes } from "./primitives/custom-nodes";
import { hqEdgeTypes } from "./primitives/custom-edges";
import { applyDagreLayout } from "./primitives/auto-layout";

const s = { width: 140, height: 42 };

const rawNodes: Node[] = [
  { id: "hq", type: "hqEmphasis", position: { x: 0, y: 0 }, data: { label: "HQ/", sublabel: "Personal OS Root" }, style: { width: 170, height: 50 } },
  { id: "claude", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: ".claude/commands/" }, style: { width: 160, height: 42 } },
  { id: "agents", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "agents.md" }, style: s },
  { id: "companies", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "companies/" }, style: s },
  { id: "knowledge", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "knowledge/" }, style: s },
  { id: "projects", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "projects/" }, style: s },
  { id: "repos", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "repos/" }, style: s },
  { id: "workers", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "workers/" }, style: s },
  { id: "workspace", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "workspace/" }, style: s },
  { id: "c1", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "company-a/" }, style: s },
  { id: "c2", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "company-b/" }, style: s },
  { id: "c3", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "personal/" }, style: s },
  { id: "kpub", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "public/" }, style: s },
  { id: "kpriv", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "private/" }, style: s },
  { id: "rpub", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "public/" }, style: s },
  { id: "rpriv", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "private/" }, style: s },
  { id: "wpub", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "public/" }, style: s },
  { id: "wpriv", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "private/" }, style: s },
  { id: "threads", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "threads/" }, style: s },
  { id: "orch", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "orchestrator/" }, style: s },
  { id: "reports", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "reports/" }, style: s },
  { id: "social", type: "hqDefault", position: { x: 0, y: 0 }, data: { label: "social-drafts/" }, style: s },
];

const edges: Edge[] = [
  { id: "e1", source: "hq", target: "claude", type: "hqDefault" },
  { id: "e2", source: "hq", target: "agents", type: "hqDefault" },
  { id: "e3", source: "hq", target: "companies", type: "hqDefault" },
  { id: "e4", source: "hq", target: "knowledge", type: "hqDefault" },
  { id: "e5", source: "hq", target: "projects", type: "hqDefault" },
  { id: "e6", source: "hq", target: "repos", type: "hqDefault" },
  { id: "e7", source: "hq", target: "workers", type: "hqDefault" },
  { id: "e8", source: "hq", target: "workspace", type: "hqDefault" },
  { id: "e9", source: "companies", target: "c1", type: "hqDefault" },
  { id: "e10", source: "companies", target: "c2", type: "hqDefault" },
  { id: "e11", source: "companies", target: "c3", type: "hqDefault" },
  { id: "e12", source: "knowledge", target: "kpub", type: "hqDefault" },
  { id: "e13", source: "knowledge", target: "kpriv", type: "hqDefault" },
  { id: "e14", source: "repos", target: "rpub", type: "hqDefault" },
  { id: "e15", source: "repos", target: "rpriv", type: "hqDefault" },
  { id: "e16", source: "workers", target: "wpub", type: "hqDefault" },
  { id: "e17", source: "workers", target: "wpriv", type: "hqDefault" },
  { id: "e18", source: "workspace", target: "threads", type: "hqDefault" },
  { id: "e19", source: "workspace", target: "orch", type: "hqDefault" },
  { id: "e20", source: "workspace", target: "reports", type: "hqDefault" },
  { id: "e21", source: "workspace", target: "social", type: "hqDefault" },
];

const nodes = applyDagreLayout(rawNodes, edges, { direction: "TB", rankSep: 50, nodeSep: 20 });

export default function DirectoryTreeDiagram() {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      nodeTypes={hqNodeTypes}
      edgeTypes={hqEdgeTypes}
      height={500}
      ariaLabel="HQ directory architecture tree"
    />
  );
}
