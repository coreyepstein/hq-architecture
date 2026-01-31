"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";

const chart = `flowchart TD
  Input["<b>Inputs</b><br/>string · number · boolean<br/>array · date · path"]
  Worker["<b>Worker + Skill</b><br/>worker.yaml config<br/>skills/*.md instructions"]
  Verify["<b>Verification</b><br/>Shell commands with must_pass"]
  Output["<b>Outputs</b><br/>markdown · json · file<br/>git_commit · console"]

  Input --> Worker
  Worker --> Verify
  Verify --> Output

  Worker --> Mutating{"mutating?"}
  Mutating -->|"true"| Hook["PostToolsHook<br/><i>auto-checkpoint</i><br/><i>log metrics</i><br/><i>save thread</i>"]
  Mutating -->|"false"| ReadOnly["Read-only<br/><i>no side effects</i>"]

  Hook --> Output
  ReadOnly --> Output

  style Input fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Worker fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Verify fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Output fill:#18181b,stroke:#3f3f46,color:#fafafa
  style Mutating fill:#18181b,stroke:#52525b,color:#fafafa
  style Hook fill:#18181b,stroke:#52525b,color:#fafafa
  style ReadOnly fill:#18181b,stroke:#3f3f46,color:#a1a1aa`;

const schemaFields = [
  { field: "id", type: "string", description: "Unique skill identifier" },
  { field: "interface.inputs", type: "array", description: "Typed parameters: name, type, required, default" },
  { field: "interface.outputs", type: "array", description: "Result types with destination paths" },
  { field: "verification", type: "array", description: "Shell commands that must pass before completion" },
  { field: "mutating", type: "boolean", description: "If true, triggers auto-checkpoint + metrics logging" },
];

export default function SkillExecutionSection() {
  return (
    <SectionWrapper
      id="skills"
      badge="SKILLS"
      title="Skill Execution Flow"
      subtitle="Skills are atomic, verifiable operations with typed inputs and outputs. Mutating skills trigger automatic state management."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-8">
        <h3 className="mb-4 font-mono text-sm font-semibold text-text-secondary">
          Skill Schema
        </h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-bg-card">
                <th className="px-4 py-3 font-mono font-semibold text-text-primary">Field</th>
                <th className="px-4 py-3 font-mono font-semibold text-text-primary">Type</th>
                <th className="px-4 py-3 font-semibold text-text-primary">Description</th>
              </tr>
            </thead>
            <tbody>
              {schemaFields.map((f) => (
                <tr key={f.field} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-mono text-text-primary">{f.field}</td>
                  <td className="px-4 py-2.5 font-mono text-text-muted">{f.type}</td>
                  <td className="px-4 py-2.5 text-text-secondary">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  );
}
