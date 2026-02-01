"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import type { NodeDef, EdgeDef } from "./primitives/types";

const nodes: NodeDef[] = [
  { id: "root", x: 310, y: 20, width: 180, height: 52, label: "INDEX.md", sublabel: "Root directory map", variant: "rounded", emphasis: true },
  { id: "projects", x: 40, y: 140, width: 170, height: 44, label: "projects/INDEX.md", variant: "rounded" },
  { id: "workers", x: 230, y: 140, width: 160, height: 44, label: "workers/INDEX.md", variant: "rounded" },
  { id: "knowledge", x: 410, y: 140, width: 180, height: 44, label: "knowledge/INDEX.md", variant: "rounded" },
  { id: "workspace", x: 610, y: 140, width: 180, height: 44, label: "workspace/INDEX.md", variant: "rounded" },
  { id: "kpub", x: 410, y: 260, width: 180, height: 44, label: "public/INDEX.md", variant: "rounded" },
  { id: "orch", x: 560, y: 260, width: 200, height: 44, label: "orchestrator/INDEX.md", variant: "rounded" },
  { id: "reports", x: 780, y: 260, width: 170, height: 44, label: "reports/INDEX.md", variant: "rounded" },
];

const edges: EdgeDef[] = [
  { from: "root", to: "projects" },
  { from: "root", to: "workers" },
  { from: "root", to: "knowledge" },
  { from: "root", to: "workspace" },
  { from: "knowledge", to: "kpub" },
  { from: "workspace", to: "orch" },
  { from: "workspace", to: "reports" },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function IndexMdDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 980 330" ariaLabel="INDEX.md hierarchical navigation system">
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.2 + i * 0.04} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={i * 0.06} />
      ))}
    </DiagramCanvas>
  );
}
