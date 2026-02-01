"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import IndexMdDiagram from "@/app/components/diagrams/IndexMdDiagram";
import { indexMdLocations, indexMdUpdaters } from "@/app/data/hq-data";

export default function IndexMdSystemSection() {
  return (
    <SectionWrapper
      id="index-system"
      badge="NAVIGATION"
      title="INDEX.md System"
      subtitle="Hierarchical INDEX.md files provide a navigable map of HQ. Commands auto-update them so the map stays current."
    >
      <IndexMdDiagram />

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
