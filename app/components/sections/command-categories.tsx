"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import { commandCategories } from "@/app/data/hq-data";

export default function CommandCategoriesSection() {
  return (
    <SectionWrapper
      id="commands"
      badge="COMMANDS"
      title="Slash Commands"
      subtitle="Organized into categories — from session management to deployment. Each command maps to a Claude skill."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {commandCategories.map((cat) => (
          <div
            key={cat.name}
            className="rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-border-accent"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-text-primary">
                {cat.name}
              </h3>
              <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted">
                {cat.count}
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              {cat.commands.map((cmd) => (
                <div key={cmd.id} className="group flex items-start gap-2">
                  <span className="font-mono text-xs text-text-muted">/</span>
                  <div>
                    <span className="font-mono text-xs text-text-primary">
                      {cmd.id}
                    </span>
                    <p className="text-[10px] leading-tight text-text-muted">
                      {cmd.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
