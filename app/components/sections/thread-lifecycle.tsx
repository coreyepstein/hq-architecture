"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";

const chart = `sequenceDiagram
  participant U as User
  participant O as Orchestrator
  participant W as Worker
  participant G as Git
  participant T as Threads

  U->>O: /run worker skill
  O->>W: Load context + execute
  W->>W: Execute skill
  W->>G: Commit changes
  G-->>W: commit hash
  W->>T: Save thread JSON
  T-->>O: Checkpoint available
  O-->>U: Result + thread ID

  Note over U,T: Session Resume
  U->>O: /reanchor or /handoff
  O->>T: Load latest thread
  T-->>O: Git state + worker state
  O-->>U: Context restored`;

const threadFields = [
  { field: "thread_id", example: "T-20260123-143052-slug", description: "Unique timestamped identifier" },
  { field: "git.branch", example: "feature/my-project", description: "Active branch at time of save" },
  { field: "git.commits_made", example: '["abc1234: feat: ..."]', description: "Commits made during session" },
  { field: "worker.id", example: "backend-dev", description: "Worker that executed the skill" },
  { field: "worker.state", example: "completed", description: "idle | loading | executing | verifying | completed | error" },
  { field: "files_touched", example: '["workspace/reports/..."]', description: "All files modified during session" },
  { field: "next_steps", example: '["Run tests", "Deploy"]', description: "Continuation hints for next session" },
];

export default function ThreadLifecycleSection() {
  return (
    <SectionWrapper
      id="threads"
      badge="PERSISTENCE"
      title="Thread Lifecycle"
      subtitle="Sessions are captured as thread JSON files with full git context, worker state, and continuation hints."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-8">
        <h3 className="mb-4 font-mono text-sm font-semibold text-text-secondary">
          Thread Schema
        </h3>
        <div className="space-y-2">
          {threadFields.map((f) => (
            <div
              key={f.field}
              className="flex flex-col gap-1 rounded-lg border border-border bg-bg-card p-3 md:flex-row md:items-center md:gap-4"
            >
              <span className="shrink-0 font-mono text-xs text-text-primary">
                {f.field}
              </span>
              <span className="hidden text-text-muted md:inline">·</span>
              <code className="shrink-0 rounded bg-bg-elevated px-2 py-0.5 font-mono text-[10px] text-text-muted">
                {f.example}
              </code>
              <span className="hidden text-text-muted md:inline">·</span>
              <span className="text-xs text-text-secondary">
                {f.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
