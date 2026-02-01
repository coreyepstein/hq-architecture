"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import DiagramEdge from "./primitives/DiagramEdge";
import type { NodeDef, EdgeDef } from "./primitives/types";

const nodes: NodeDef[] = [
  { id: "input", x: 200, y: 10, width: 200, height: 52, label: "Inputs", sublabel: "string + number + boolean + array", variant: "rounded" },
  { id: "worker", x: 200, y: 100, width: 200, height: 52, label: "Worker + Skill", sublabel: "worker.yaml + skills/*.md", variant: "rounded" },
  { id: "verify", x: 200, y: 190, width: 200, height: 48, label: "Verification", sublabel: "shell commands + must_pass", variant: "rounded", emphasis: true },
  { id: "mutating", x: 200, y: 280, width: 200, height: 48, label: "mutating?", variant: "diamond" },
  { id: "hook", x: 60, y: 380, width: 180, height: 48, label: "PostToolsHook", sublabel: "checkpoint + metrics + thread", variant: "rounded" },
  { id: "readonly", x: 360, y: 380, width: 180, height: 48, label: "Read-only", sublabel: "no side effects", variant: "rounded" },
  { id: "output", x: 200, y: 480, width: 200, height: 52, label: "Outputs", sublabel: "markdown + json + git_commit", variant: "rounded" },
];

const edges: EdgeDef[] = [
  { from: "input", to: "worker" },
  { from: "worker", to: "verify" },
  { from: "verify", to: "mutating" },
  { from: "mutating", to: "hook", label: "true", fromSide: "left", toSide: "top" },
  { from: "mutating", to: "readonly", label: "false", fromSide: "right", toSide: "top" },
  { from: "hook", to: "output", fromSide: "bottom", toSide: "left" },
  { from: "readonly", to: "output", fromSide: "bottom", toSide: "right" },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

export default function SkillExecutionDiagram() {
  return (
    <DiagramCanvas viewBox="0 0 600 560" ariaLabel="Skill execution flow with verification and mutating decision fork">
      {edges.map((e, i) => (
        <DiagramEdge key={`${e.from}-${e.to}`} {...e} nodes={nodeMap} delay={0.2 + i * 0.04} />
      ))}
      {nodes.map((n, i) => (
        <DiagramNode key={n.id} {...n} delay={i * 0.06} />
      ))}
    </DiagramCanvas>
  );
}
