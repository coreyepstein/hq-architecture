"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import SkillExecutionDiagram from "@/app/components/diagrams/SkillExecutionDiagram";

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
      <SkillExecutionDiagram />

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
