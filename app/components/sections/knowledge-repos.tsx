"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import { knowledgeRepoExamples } from "@/app/data/hq-data";

const chart = `graph LR
  subgraph HQ["<b>HQ Git Repo</b>"]
    K1["knowledge/public/Ralph"]
    K2["knowledge/public/workers"]
    CK["companies/company-a/knowledge"]
  end

  subgraph Repos["<b>Independent Git Repos</b>"]
    R1["repos/public/<br/>ralph-methodology"]
    R2["repos/public/<br/>knowledge-workers"]
    R3["repos/private/<br/>knowledge-company-a"]
  end

  K1 -.->|symlink| R1
  K2 -.->|symlink| R2
  CK -.->|symlink| R3

  style HQ fill:#111113,stroke:#3f3f46,color:#fafafa
  style Repos fill:#111113,stroke:#3f3f46,color:#fafafa`;

const concepts = [
  {
    title: "Transparent Reading",
    description:
      "qmd, Glob, Grep, and Read all follow symlinks. No special handling needed — knowledge is accessed like any file.",
  },
  {
    title: "Independent Versioning",
    description:
      "Each knowledge base is its own git repo. Commit, push, and share independently from HQ.",
  },
  {
    title: "Module Sync",
    description:
      "modules/modules.yaml manages the repo inventory. /hq-sync keeps symlinks current.",
  },
];

export default function KnowledgeReposSection() {
  return (
    <SectionWrapper
      id="knowledge-repos"
      badge="ARCHITECTURE"
      title="Knowledge Repos"
      subtitle="Every knowledge folder is its own git repo, symlinked into HQ. Independent versioning, sharing, and publishing per knowledge base."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {concepts.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <h3 className="font-mono text-sm font-semibold text-text-primary">
              {c.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {c.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 font-mono text-sm font-semibold text-text-secondary">
          Repo Mapping
        </h3>
        <div className="space-y-2">
          {knowledgeRepoExamples.map((r) => (
            <div
              key={r.symlink}
              className="flex flex-col gap-1 rounded-lg border border-border bg-bg-card p-3 md:flex-row md:items-center md:gap-4"
            >
              <span className="shrink-0 font-mono text-xs text-text-primary">
                {r.symlink}
              </span>
              <span className="hidden text-text-muted md:inline">&rarr;</span>
              <code className="shrink-0 rounded bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted">
                {r.repo}
              </code>
              <span className="hidden text-text-muted md:inline">·</span>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                  r.visibility === "public"
                    ? "border-white/10 text-text-muted"
                    : "border-white/5 text-text-muted/70"
                }`}
              >
                {r.visibility}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
