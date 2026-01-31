"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import { companies } from "@/app/data/hq-data";

const chart = `graph LR
  subgraph CompanyA["<b>Company A</b>"]
    a_s["settings/"]
    a_d["data/"]
    a_k["knowledge/"]
  end

  subgraph CompanyB["<b>Company B</b>"]
    b_s["settings/"]
    b_d["data/"]
    b_k["knowledge/"]
  end

  subgraph Personal["<b>Personal</b>"]
    p_s["settings/"]
    p_k["knowledge/"]
  end

  style CompanyA fill:#111113,stroke:#3f3f46,color:#fafafa
  style CompanyB fill:#111113,stroke:#3f3f46,color:#fafafa
  style Personal fill:#111113,stroke:#3f3f46,color:#fafafa`;

export default function CompanyIsolationSection() {
  return (
    <SectionWrapper
      id="companies"
      badge="COMPANIES"
      title="Company Isolation"
      subtitle="Each company owns its own settings, data, and knowledge — fully isolated contexts with dedicated credentials."
    >
      <MermaidDiagram chart={chart} />

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
