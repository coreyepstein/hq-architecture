"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import { indexMdLocations, indexMdUpdaters } from "@/app/data/hq-data";

const chart = `graph TD
  Root["<b>INDEX.md</b><br/>Root directory map"]

  Root --> P["projects/INDEX.md"]
  Root --> W["workers/INDEX.md"]
  Root --> K["knowledge/INDEX.md"]
  Root --> WS["workspace/INDEX.md"]

  WS --> Orch["orchestrator/INDEX.md"]
  WS --> Rep["reports/INDEX.md"]

  K --> KPub["public/INDEX.md"]

  style Root fill:#27272a,stroke:#52525b,color:#fafafa
  style P fill:#18181b,stroke:#3f3f46,color:#fafafa
  style W fill:#18181b,stroke:#3f3f46,color:#fafafa
  style K fill:#18181b,stroke:#3f3f46,color:#fafafa
  style WS fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Orch fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Rep fill:#18181b,stroke:#3f3f46,color:#fafafa
  style KPub fill:#18181b,stroke:#3f3f46,color:#fafafa`;

export default function IndexMdSystemSection() {
  return (
    <SectionWrapper
      id="index-system"
      badge="NAVIGATION"
      title="INDEX.md System"
      subtitle="Hierarchical INDEX.md files provide a navigable map of HQ. Commands auto-update them so the map stays current."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {indexMdLocations.map((loc) => (
          <div
            key={loc.path}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <code className="font-mono text-sm text-text-primary">
              {loc.path}
            </code>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {loc.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-mono text-sm font-semibold text-text-secondary">
          Auto-Updated By
        </h3>
        <div className="flex flex-wrap gap-2">
          {indexMdUpdaters.map((cmd) => (
            <span
              key={cmd}
              className="rounded-full border border-border bg-bg-elevated px-3 py-1 font-mono text-xs text-text-muted"
            >
              {cmd}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
