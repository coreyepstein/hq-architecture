"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import LearningSystemDiagram from "@/app/components/diagrams/LearningSystemDiagram";
import { learningTiers, learningTargets } from "@/app/data/hq-data";

export default function LearningSystemSection() {
  return (
    <SectionWrapper
      id="learning"
      badge="LEARNING"
      title="Learning System"
      subtitle="Rules are captured from task execution and injected directly into the files they govern. The system gets smarter with every session."
    >
      <LearningSystemDiagram />

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
