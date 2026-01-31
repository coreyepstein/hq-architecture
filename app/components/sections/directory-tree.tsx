"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import { directoryTree } from "@/app/data/hq-data";

const chart = `graph TD
  HQ["<b>HQ/</b><br/>Personal OS Root"]

  HQ --> claude[".claude/commands/<br/><i>Slash commands</i>"]
  HQ --> agents["agents.md<br/><i>User profile</i>"]
  HQ --> companies["companies/<br/><i>Isolated contexts</i>"]
  HQ --> knowledge["knowledge/<br/><i>Organized KBs</i>"]
  HQ --> projects["projects/<br/><i>PRD-driven</i>"]
  HQ --> repos["repos/<br/><i>Git repositories</i>"]
  HQ --> workers["workers/<br/><i>AI specialists</i>"]
  HQ --> workspace["workspace/<br/><i>Runtime state</i>"]

  companies --> c1["company-a/"]
  companies --> c2["company-b/"]
  companies --> c3["personal/"]

  knowledge --> kpub["public/<br/><i>Shared KBs</i>"]
  knowledge --> kpriv["private/<br/><i>Your KBs</i>"]

  workers --> wpub["public/<br/><i>Dev + Content + Utility</i>"]
  workers --> wpriv["private/<br/><i>Your custom workers</i>"]

  repos --> rpub["public/<br/><i>Open source</i>"]
  repos --> rpriv["private/<br/><i>Company repos</i>"]

  workspace --> threads["threads/<br/><i>Session state</i>"]
  workspace --> orch["orchestrator/<br/><i>Ralph loop</i>"]
  workspace --> reports["reports/<br/><i>Generated output</i>"]
  workspace --> social["social-drafts/<br/><i>Content pipeline</i>"]

  style HQ fill:#27272a,stroke:#52525b,color:#fafafa
  style companies fill:#18181b,stroke:#3f3f46,color:#fafafa
  style knowledge fill:#18181b,stroke:#3f3f46,color:#fafafa
  style workers fill:#18181b,stroke:#3f3f46,color:#fafafa
  style workspace fill:#18181b,stroke:#3f3f46,color:#fafafa
  style projects fill:#18181b,stroke:#3f3f46,color:#fafafa
  style repos fill:#18181b,stroke:#3f3f46,color:#fafafa`;

export default function DirectoryTreeSection() {
  return (
    <SectionWrapper
      id="structure"
      badge="STRUCTURE"
      title="Directory Architecture"
      subtitle="Everything has a place. Companies, workers, knowledge, and projects — all isolated yet interconnected."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {directoryTree.map((item) => (
          <div
            key={item.path}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <span className="text-lg">{item.icon}</span>
            <p className="mt-1 font-mono text-sm text-text-primary">
              {item.path}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
