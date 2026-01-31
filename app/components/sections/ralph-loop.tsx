"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";

const chart = `flowchart LR
  PRD["Read PRD"]
  Pick["Pick Task<br/><i>passes: false</i>"]
  Spawn["Spawn Agent<br/><i>fresh context</i>"]
  Exec["Execute Task"]
  BP["Back Pressure<br/><i>typecheck · build · test</i>"]
  CP["Checkpoint<br/><i>thread + git</i>"]
  Update["Update PRD<br/><i>passes: true</i>"]
  Check{"All tasks<br/>passing?"}
  Done["Create PR"]

  PRD --> Pick
  Pick --> Spawn
  Spawn --> Exec
  Exec --> BP
  BP --> CP
  CP --> Update
  Update --> Check
  Check -->|No| Pick
  Check -->|Yes| Done

  style PRD fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Pick fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Spawn fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Exec fill:#18181b,stroke:#3f3f46,color:#fafafa
  style BP fill:#18181b,stroke:#52525b,color:#fafafa
  style CP fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Update fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Check fill:#18181b,stroke:#52525b,color:#fafafa
  style Done fill:#27272a,stroke:#52525b,color:#fafafa`;

const principles = [
  {
    title: "One task at a time",
    description: "No context overload. Each agent handles exactly one user story.",
  },
  {
    title: "Fresh context per task",
    description: "Sub-agent spawns with 100% clean context. Orchestrator stays lean (<30%).",
  },
  {
    title: "Back pressure",
    description: "Every task must pass typecheck, build, and tests before completion.",
  },
  {
    title: "Simple loops",
    description: "for-loop orchestration over complex frameworks. PRD is the source of truth.",
  },
  {
    title: "Feature branches",
    description: "All work on feature/{project-name}. Never commit to main. PR when done.",
  },
  {
    title: "Auto-checkpoint",
    description: "Thread state saved after every task — git context, worker state, files touched.",
  },
];

export default function RalphLoopSection() {
  return (
    <SectionWrapper
      id="ralph"
      badge="ORCHESTRATION"
      title="The Ralph Loop"
      subtitle="Simple for-loop orchestration: read PRD, pick task, spawn fresh agent, execute, verify, checkpoint, repeat."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <div
            key={p.title}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <h3 className="font-mono text-sm font-semibold text-text-primary">
              {p.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
