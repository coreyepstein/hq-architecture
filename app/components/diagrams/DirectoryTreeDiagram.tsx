"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import type { NodeDef, EdgeDef } from "./primitives/types";

const nodes: NodeDef[] = [
  // Root
  { id: "hq", x: 440, y: 10, width: 180, height: 52, label: "HQ/", sublabel: "Personal OS Root", variant: "rounded", emphasis: true },
  // Tier 1
  { id: "claude", x: 10, y: 110, width: 150, height: 44, label: ".claude/commands/", variant: "rounded" },
  { id: "agents", x: 170, y: 110, width: 130, height: 44, label: "agents.md", variant: "rounded" },
  { id: "companies", x: 310, y: 110, width: 140, height: 44, label: "companies/", variant: "rounded" },
  { id: "knowledge", x: 460, y: 110, width: 140, height: 44, label: "knowledge/", variant: "rounded" },
  { id: "projects", x: 610, y: 110, width: 130, height: 44, label: "projects/", variant: "rounded" },
  { id: "repos", x: 750, y: 110, width: 110, height: 44, label: "repos/", variant: "rounded" },
  { id: "workers", x: 870, y: 110, width: 120, height: 44, label: "workers/", variant: "rounded" },
  { id: "workspace", x: 1000, y: 110, width: 140, height: 44, label: "workspace/", variant: "rounded" },
  // Tier 2 — companies
  { id: "c1", x: 230, y: 220, width: 110, height: 38, label: "company-a/" },
  { id: "c2", x: 350, y: 220, width: 110, height: 38, label: "company-b/" },
  { id: "c3", x: 470, y: 220, width: 100, height: 38, label: "personal/" },
  // Tier 2 — knowledge
  { id: "kpub", x: 390, y: 310, width: 110, height: 38, label: "public/" },
  { id: "kpriv", x: 510, y: 310, width: 110, height: 38, label: "private/" },
  // Tier 2 — workers
  { id: "wpub", x: 830, y: 220, width: 110, height: 38, label: "public/" },
  { id: "wpriv", x: 950, y: 220, width: 110, height: 38, label: "private/" },
  // Tier 2 — repos
  { id: "rpub", x: 680, y: 220, width: 110, height: 38, label: "public/" },
  { id: "rpriv", x: 770, y: 220, width: 110, height: 38, label: "private/" },
  // Tier 2 — workspace
  { id: "threads", x: 920, y: 310, width: 100, height: 38, label: "threads/" },
  { id: "orch", x: 1030, y: 310, width: 120, height: 38, label: "orchestrator/" },
  { id: "reports", x: 1160, y: 310, width: 100, height: 38, label: "reports/" },
  { id: "social", x: 1050, y: 370, width: 120, height: 38, label: "social-drafts/" },
];

const edges: EdgeDef[] = [
  { from: "hq", to: "claude" },
  { from: "hq", to: "agents" },
  { from: "hq", to: "companies" },
  { from: "hq", to: "knowledge" },
  { from: "hq", to: "projects" },
  { from: "hq", to: "repos" },
  { from: "hq", to: "workers" },
  { from: "hq", to: "workspace" },
  { from: "companies", to: "c1" },
  { from: "companies", to: "c2" },
  { from: "companies", to: "c3" },
  { from: "knowledge", to: "kpub" },
  { from: "knowledge", to: "kpriv" },
  { from: "repos", to: "rpub" },
  { from: "repos", to: "rpriv" },
  { from: "workers", to: "wpub" },
  { from: "workers", to: "wpriv" },
  { from: "workspace", to: "threads" },
  { from: "workspace", to: "orch" },
  { from: "workspace", to: "reports" },
  { from: "workspace", to: "social" },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function DirectoryTreeDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 1280 430" ariaLabel="HQ directory architecture tree">
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.2 + i * 0.03} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={i * 0.04} />
      ))}
    </DiagramCanvas>
  );
}
