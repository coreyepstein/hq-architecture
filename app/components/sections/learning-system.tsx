"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import { learningTiers, learningTargets } from "@/app/data/hq-data";

const chart = `flowchart TD
  Task["Task Execution"]
  Remember["<b>/remember</b><br/>User correction"]
  Learn["<b>/learn</b><br/>Auto-capture"]
  Classify["Classify Scope<br/><i>worker · command · knowledge · global</i>"]
  Inject["Inject Rule<br/><i>into governing file</i>"]
  Log["Event Log<br/><i>workspace/learnings/*.json</i>"]

  Task --> Learn
  Remember --> Learn
  Learn --> Classify
  Classify --> Inject
  Classify --> Log

  style Task fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Learn fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Remember fill:#18181b,stroke:#52525b,color:#fafafa
  style Classify fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Inject fill:#27272a,stroke:#52525b,color:#fafafa
  style Log fill:#18181b,stroke:#3f3f46,color:#a1a1aa`;

export default function LearningSystemSection() {
  return (
    <SectionWrapper
      id="learning"
      badge="LEARNING"
      title="Learning System"
      subtitle="Rules are captured from task execution and injected directly into the files they govern. The system gets smarter with every session."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {learningTiers.map((t) => (
          <div
            key={t.tier}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-text-primary">
                {t.tier}
              </h3>
              <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted">
                {t.priority}
              </span>
            </div>
            <p className="mt-2 text-xs text-text-secondary">{t.trigger}</p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {t.target}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 font-mono text-sm font-semibold text-text-secondary">
          Injection Targets
        </h3>
        <div className="space-y-2">
          {learningTargets.map((lt) => (
            <div
              key={lt.scope}
              className="flex flex-col gap-1 rounded-lg border border-border bg-bg-card p-3 md:flex-row md:items-center md:gap-4"
            >
              <span className="shrink-0 font-mono text-xs text-text-primary">
                {lt.scope}
              </span>
              <span className="hidden text-text-muted md:inline">&rarr;</span>
              <code className="rounded bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted">
                {lt.target}
              </code>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
