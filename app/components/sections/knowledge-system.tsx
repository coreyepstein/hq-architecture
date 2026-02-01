"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import { knowledgeBases } from "@/app/data/hq-data";

const chart = `graph TD
  Search["<b>qmd Search</b><br/>BM25 · Semantic · Hybrid"]

  subgraph Public["<b>Public Knowledge</b>"]
    ralph["Ralph"]
    wk["workers"]
    hqc["hq-core"]
    dt["dev-team"]
    ds["design-styles"]
    loom["loom"]
    proj["projects"]
    sec["ai-security"]
  end

  subgraph Private["<b>Private Knowledge</b>"]
    yt["your-tools"]
    yd["your-domain"]
  end

  subgraph Company["<b>Company Knowledge</b>"]
    c1k["company-a/<br/><i>metrics · schema</i>"]
    c2k["company-b/<br/><i>brand · products</i>"]
    pk["personal/<br/><i>voice · style</i>"]
  end

  Search --> Public
  Search --> Private
  Search --> Company

  style Search fill:#27272a,stroke:#52525b,color:#fafafa
  style Public fill:#111113,stroke:#3f3f46,color:#fafafa
  style Private fill:#111113,stroke:#3f3f46,color:#fafafa
  style Company fill:#111113,stroke:#3f3f46,color:#fafafa`;

const searchModes = [
  { mode: "qmd search", type: "BM25 keyword", description: "Fast exact-match keyword search across all HQ content", speed: "Fast" },
  { mode: "qmd vsearch", type: "Semantic vector", description: "Conceptual/meaning-based search using embeddings", speed: "Medium" },
  { mode: "qmd query", type: "Hybrid + re-ranking", description: "BM25 + vector search combined with result re-ranking", speed: "Best quality" },
];

export default function KnowledgeSystemSection() {
  return (
    <SectionWrapper
      id="knowledge"
      badge="KNOWLEDGE"
      title="Knowledge System"
      subtitle="Three-tier knowledge architecture with semantic search. Workers load relevant knowledge automatically from their context.base paths."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {searchModes.map((s) => (
          <div key={s.mode} className="rounded-xl border border-border bg-bg-card p-5">
            <div className="flex items-center justify-between">
              <code className="font-mono text-sm text-text-primary">{s.mode}</code>
              <span className="rounded-full bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted">{s.speed}</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-text-secondary">{s.type}</p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">{s.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <h3 className="font-mono text-sm font-semibold text-text-primary">
            Public <span className="text-text-muted">({knowledgeBases.public.length})</span>
          </h3>
          <div className="mt-3 space-y-1">
            {knowledgeBases.public.map((kb, i) => (
              <div key={`${kb.id}-${i}`} className="flex items-center justify-between text-xs">
                <span className="font-mono text-text-primary">{kb.id}/</span>
                <span className="text-text-muted">{kb.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-5">
          <h3 className="font-mono text-sm font-semibold text-text-primary">
            Private <span className="text-text-muted">({knowledgeBases.private.length})</span>
          </h3>
          <div className="mt-3 space-y-1">
            {knowledgeBases.private.map((kb) => (
              <div key={kb.id} className="flex items-center justify-between text-xs">
                <span className="font-mono text-text-primary">{kb.id}/</span>
                <span className="text-text-muted">{kb.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-bg-card p-5">
          <h3 className="font-mono text-sm font-semibold text-text-primary">
            Company-Level <span className="text-text-muted">({knowledgeBases.company.length})</span>
          </h3>
          <div className="mt-3 space-y-2">
            {knowledgeBases.company.map((kb) => (
              <div key={kb.company}>
                <span className="font-mono text-xs text-text-primary">{kb.company}/</span>
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {kb.topics.map((t) => (
                    <span key={t} className="rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-text-muted">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
