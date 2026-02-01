"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import CompanyIsolationDiagram from "@/app/components/diagrams/CompanyIsolationDiagram";
import { companies } from "@/app/data/hq-data";

export default function CompanyIsolationSection() {
  return (
    <SectionWrapper
      id="companies"
      badge="COMPANIES"
      title="Company Isolation"
      subtitle="Each company owns its own settings, data, and knowledge — fully isolated contexts with dedicated credentials."
    >
      <CompanyIsolationDiagram />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <h3 className="font-mono text-sm font-semibold text-text-primary">
              {company.label}
            </h3>
            <p className="mt-1 text-xs text-text-secondary">
              {company.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {company.owns.map((dir) => (
                <span
                  key={dir}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-text-muted"
                >
                  {dir}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
