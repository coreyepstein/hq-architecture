"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramGroup from "./primitives/DiagramGroup";
import type { NodeDef, GroupDef } from "./primitives/types";

const groups: GroupDef[] = [
  { id: "dev", x: 20, y: 10, width: 440, height: 240, label: "Dev Team  (12)" },
  { id: "content", x: 480, y: 10, width: 260, height: 130, label: "Content Team  (5)" },
  { id: "utility", x: 480, y: 155, width: 260, height: 95, label: "Utility  (3)" },
  { id: "custom", x: 760, y: 10, width: 220, height: 240, label: "Custom  (you create)" },
];

const nodes: NodeDef[] = [
  // Dev Team — 3 columns x 4 rows
  { id: "pm", x: 40, y: 44, width: 125, height: 34, label: "project-manager" },
  { id: "te", x: 40, y: 86, width: 125, height: 34, label: "task-executor" },
  { id: "arch", x: 40, y: 128, width: 125, height: 34, label: "architect" },
  { id: "be", x: 40, y: 170, width: 125, height: 34, label: "backend-dev" },

  { id: "db", x: 178, y: 44, width: 125, height: 34, label: "database-dev" },
  { id: "fe", x: 178, y: 86, width: 125, height: 34, label: "frontend-dev" },
  { id: "infra", x: 178, y: 128, width: 125, height: 34, label: "infra-dev" },
  { id: "md", x: 178, y: 170, width: 125, height: 34, label: "motion-designer" },

  { id: "cr", x: 316, y: 44, width: 125, height: 34, label: "code-reviewer" },
  { id: "kc", x: 316, y: 86, width: 125, height: 34, label: "knowledge-curator" },
  { id: "pp", x: 316, y: 128, width: 125, height: 34, label: "product-planner" },
  { id: "dqa", x: 316, y: 170, width: 125, height: 34, label: "dev-qa-tester" },

  // Content Team
  { id: "cb", x: 500, y: 44, width: 110, height: 34, label: "content-brand" },
  { id: "cs", x: 500, y: 86, width: 110, height: 34, label: "content-sales" },
  { id: "cp", x: 620, y: 44, width: 110, height: 34, label: "content-product" },
  { id: "cl", x: 620, y: 86, width: 110, height: 34, label: "content-legal" },

  // Utility
  { id: "fd", x: 500, y: 190, width: 110, height: 34, label: "frontend-designer" },
  { id: "qt", x: 620, y: 190, width: 110, height: 34, label: "qa-tester" },

  // Custom
  { id: "yc", x: 780, y: 44, width: 180, height: 34, label: "your-cfo" },
  { id: "ym", x: 780, y: 86, width: 180, height: 34, label: "your-cmo" },
  { id: "ya", x: 780, y: 128, width: 180, height: 34, label: "your-analyst" },
  { id: "ys", x: 780, y: 170, width: 180, height: 34, label: "your-social" },
];

export default function WorkerHierarchyDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 1000 265" ariaLabel="Worker hierarchy organized into Dev Team, Content Team, Utility, and Custom groups">
      {groups.map((g, i) => (
        <DiagramGroup key={g.id} {...g} delay={i * 0.08} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={0.15 + i * 0.03} />
      ))}
    </DiagramCanvas>
  );
}
