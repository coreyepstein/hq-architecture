"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import KnowledgeReposDiagram from "@/app/components/diagrams/KnowledgeReposDiagram";
import { knowledgeRepoExamples } from "@/app/data/hq-data";

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
      <KnowledgeReposDiagram />

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
