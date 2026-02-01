"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import DiagramGroup from "./primitives/DiagramGroup";
import type { NodeDef, EdgeDef, GroupDef } from "./primitives/types";

const groups: GroupDef[] = [
  { id: "hq", x: 20, y: 10, width: 310, height: 190, label: "HQ Git Repo" },
  { id: "repos", x: 530, y: 10, width: 350, height: 190, label: "Independent Git Repos" },
];

const nodes: NodeDef[] = [
  // HQ side
  { id: "k1", x: 40, y: 50, width: 270, height: 36, label: "knowledge/public/Ralph", variant: "rounded" },
  { id: "k2", x: 40, y: 96, width: 270, height: 36, label: "knowledge/public/workers", variant: "rounded" },
  { id: "ck", x: 40, y: 142, width: 270, height: 36, label: "companies/company-a/knowledge", variant: "rounded" },
  // Repo side
  { id: "r1", x: 550, y: 50, width: 310, height: 36, label: "repos/public/ralph-methodology", variant: "rounded" },
  { id: "r2", x: 550, y: 96, width: 310, height: 36, label: "repos/public/knowledge-workers", variant: "rounded" },
  { id: "r3", x: 550, y: 142, width: 310, height: 36, label: "repos/private/knowledge-company-a", variant: "rounded" },
];

const edges: EdgeDef[] = [
  { from: "k1", to: "r1", label: "symlink", dashed: true },
  { from: "k2", to: "r2", label: "symlink", dashed: true },
  { from: "ck", to: "r3", label: "symlink", dashed: true },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function KnowledgeReposDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 900 220" ariaLabel="Knowledge repos architecture showing HQ symlinks pointing to independent git repos">
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
