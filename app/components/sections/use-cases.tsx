"use client";

import SectionWrapper from "@/app/components/section-wrapper";

const useCases = [
  {
    persona: "Solo Founder",
    pain: "You're running 3 businesses from one laptop. Context-switching kills your output.",
    solution:
      "HQ isolates each company — credentials, knowledge, and workers stay separate. Switch context in one command.",
    color: "text-cyan",
    borderColor: "border-cyan/20",
  },
  {
    persona: "Agency / Studio",
    pain: "10+ clients, each with their own repos, brand guidelines, and deploy targets. AI keeps mixing them up.",
    solution:
      "Company isolation enforces boundaries. Workers inherit the right company context automatically. No cross-contamination.",
    color: "text-amber",
    borderColor: "border-amber/20",
  },
  {
    persona: "Enterprise Team",
    pain: "Your AI toolchain is fragmented — ChatGPT for writing, Copilot for code, custom scripts for everything else.",
    solution:
      "HQ unifies everything under one orchestrator. Workers handle code, content, design, and ops. PRDs drive execution end-to-end.",
    color: "text-green",
    borderColor: "border-green/20",
  },
];

export default function UseCasesSection() {
  return (
    <SectionWrapper
      id="use-cases"
      badge="WHO IT'S FOR"
      title="Built for Operators"
      subtitle="Whether you're a solo founder, an agency, or an enterprise team — HQ scales with your complexity."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {useCases.map((uc) => (
          <div
            key={uc.persona}
            className={`rounded-xl border ${uc.borderColor} bg-bg-card p-6 transition-all hover:bg-bg-elevated`}
          >
            <h3 className={`font-mono text-sm font-bold tracking-wider ${uc.color}`}>
              {uc.persona}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {uc.pain}
            </p>
            <div className="my-4 h-px bg-border" />
            <p className="text-sm leading-relaxed text-text-secondary">
              {uc.solution}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
