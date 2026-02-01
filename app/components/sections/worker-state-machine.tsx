"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import StateMachineDiagram from "@/app/components/diagrams/StateMachineDiagram";

const states = [
  { name: "idle", description: "Worker registered, awaiting invocation" },
  { name: "loading", description: "Loading context from knowledge bases and worker.yaml" },
  { name: "planning", description: "Analyzing task, determining approach" },
  { name: "executing", description: "Performing the skill — writing code, generating reports" },
  { name: "verifying", description: "Running typecheck, build, tests — back pressure gate" },
  { name: "post_hook", description: "Auto-checkpoint, metrics logging, thread save" },
  { name: "completed", description: "Task done, output delivered, state persisted" },
  { name: "error", description: "Failure caught — can retry or escalate" },
];

export default function WorkerStateMachineSection() {
  return (
    <SectionWrapper
      id="state-machine"
      badge="LIFECYCLE"
      title="Worker State Machine"
      subtitle="Every worker follows the same lifecycle: load context, plan, execute, verify, checkpoint."
    >
      <StateMachineDiagram />

      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {states.map((state) => (
          <div
            key={state.name}
            className="rounded-lg border border-border bg-bg-card p-4"
          >
            <span className="font-mono text-sm font-semibold text-text-primary">
              {state.name}
            </span>
            <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
              {state.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
