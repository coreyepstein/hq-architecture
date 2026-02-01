"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramGroup from "./primitives/DiagramGroup";
import type { NodeDef, GroupDef } from "./primitives/types";

const groups: GroupDef[] = [
  { id: "compA", x: 20, y: 20, width: 260, height: 200, label: "Company A" },
  { id: "compB", x: 310, y: 20, width: 260, height: 200, label: "Company B" },
  { id: "personal", x: 600, y: 20, width: 260, height: 200, label: "Personal" },
];

const nodes: NodeDef[] = [
  // Company A
  { id: "a-settings", x: 50, y: 60, width: 200, height: 40, label: "settings/", variant: "rounded" },
  { id: "a-data", x: 50, y: 112, width: 200, height: 40, label: "data/", variant: "rounded" },
  { id: "a-knowledge", x: 50, y: 164, width: 200, height: 40, label: "knowledge/", variant: "rounded" },
  // Company B
  { id: "b-settings", x: 340, y: 60, width: 200, height: 40, label: "settings/", variant: "rounded" },
  { id: "b-data", x: 340, y: 112, width: 200, height: 40, label: "data/", variant: "rounded" },
  { id: "b-knowledge", x: 340, y: 164, width: 200, height: 40, label: "knowledge/", variant: "rounded" },
  // Personal
  { id: "p-settings", x: 630, y: 60, width: 200, height: 40, label: "settings/", variant: "rounded" },
  { id: "p-knowledge", x: 630, y: 112, width: 200, height: 40, label: "knowledge/", variant: "rounded" },
];

export default function CompanyIsolationDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 880 240" ariaLabel="Company isolation architecture showing three isolated contexts">
      {groups.map((g, i) => (
        <DiagramGroup key={g.id} {...g} delay={i * 0.1} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={0.15 + i * 0.04} />
      ))}
    </DiagramCanvas>
  );
}
