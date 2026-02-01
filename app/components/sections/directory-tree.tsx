"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import DirectoryTreeDiagram from "@/app/components/diagrams/DirectoryTreeDiagram";
import { directoryTree } from "@/app/data/hq-data";

export default function DirectoryTreeSection() {
  return (
    <SectionWrapper
      id="structure"
      badge="STRUCTURE"
      title="Directory Architecture"
      subtitle="Everything has a place. Companies, workers, knowledge, and projects — all isolated yet interconnected."
    >
      <DirectoryTreeDiagram />

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
