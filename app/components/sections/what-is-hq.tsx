"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import { CornerBrackets } from "@/app/components/corner-brackets";

const pillars = [
  {
    title: "Companies",
    description:
      "Each business gets isolated context — credentials, knowledge, workers, and projects never cross-contaminate.",
    icon: "01",
  },
  {
    title: "Workers",
    description:
      "Specialized AI agents with domain knowledge, tools, and learned rules. Route tasks to the right expert.",
    icon: "02",
  },
  {
    title: "Commands",
    description:
      "Slash commands that encode complex workflows. /prd plans projects, /run dispatches workers, /handoff preserves context.",
    icon: "03",
  },
  {
    title: "Ralph Loop",
    description:
      "Plan → Execute → Review → Learn. Every project runs through this cycle until acceptance criteria pass.",
    icon: "04",
  },
];

export default function WhatIsHqSection() {
  return (
    <SectionWrapper
      id="what-is-hq"
      badge="OVERVIEW"
      title="What is HQ?"
      subtitle="HQ is a filesystem-based operating system that gives Claude Code persistent memory, specialized workers, and multi-company orchestration. One terminal. Every business. Full autonomy."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {pillars.map((pillar) => (
          <CornerBrackets key={pillar.title} size="sm" className="group">
            <div className="rounded-xl border border-border bg-bg-card p-6 transition-all hover:border-accent/20">
              <span className="font-mono text-xs text-accent">
                {pillar.icon}
              </span>
              <h3 className="mt-2 font-mono text-lg font-semibold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {pillar.description}
              </p>
            </div>
          </CornerBrackets>
        ))}
      </div>
    </SectionWrapper>
  );
}
