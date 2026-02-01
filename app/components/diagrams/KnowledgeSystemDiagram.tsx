"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import DiagramGroup from "./primitives/DiagramGroup";
import type { NodeDef, EdgeDef, GroupDef } from "./primitives/types";

const groups: GroupDef[] = [
  { id: "public", x: 20, y: 130, width: 340, height: 200, label: "Public Knowledge" },
  { id: "private", x: 380, y: 130, width: 200, height: 130, label: "Private Knowledge" },
  { id: "company", x: 600, y: 130, width: 340, height: 200, label: "Company Knowledge" },
];

const nodes: NodeDef[] = [
  // Search node at top
  { id: "search", x: 370, y: 20, width: 220, height: 52, label: "qmd Search", sublabel: "BM25 + Semantic + Hybrid", variant: "rounded", emphasis: true },
  // Public
  { id: "ralph", x: 40, y: 170, width: 90, height: 34, label: "Ralph" },
  { id: "wk", x: 140, y: 170, width: 90, height: 34, label: "workers" },
  { id: "hqc", x: 240, y: 170, width: 100, height: 34, label: "hq-core" },
  { id: "dt", x: 40, y: 214, width: 90, height: 34, label: "dev-team" },
  { id: "ds", x: 140, y: 214, width: 110, height: 34, label: "design-styles" },
  { id: "loom", x: 260, y: 214, width: 80, height: 34, label: "loom" },
  { id: "proj", x: 40, y: 258, width: 90, height: 34, label: "projects" },
  { id: "sec", x: 140, y: 258, width: 110, height: 34, label: "ai-security" },
  // Private
  { id: "yt", x: 400, y: 170, width: 160, height: 34, label: "your-tools" },
  { id: "yd", x: 400, y: 214, width: 160, height: 34, label: "your-domain" },
  // Company
  { id: "c1k", x: 620, y: 170, width: 150, height: 34, label: "company-a/" },
  { id: "c2k", x: 780, y: 170, width: 150, height: 34, label: "company-b/" },
  { id: "pk", x: 700, y: 214, width: 150, height: 34, label: "personal/" },
];

const edges: EdgeDef[] = [
  { from: "search", to: "ralph", fromSide: "bottom", toSide: "top" },
  { from: "search", to: "yt", fromSide: "bottom", toSide: "top" },
  { from: "search", to: "c1k", fromSide: "bottom", toSide: "top" },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function KnowledgeSystemDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 960 350" ariaLabel="Knowledge system with search connecting to public, private, and company knowledge bases">
      {groups.map((g, i) => (
        <DiagramGroup key={g.id} {...g} delay={i * 0.1} />
      ))}
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.25 + i * 0.05} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={0.1 + i * 0.04} />
      ))}
    </DiagramCanvas>
  );
}
