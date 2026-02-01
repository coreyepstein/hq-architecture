"use client";

import MermaidDiagram from "../mermaid-diagram";

const chart = `sequenceDiagram
    participant User
    participant Orchestrator
    participant Worker
    participant Git
    participant Threads

    User->>Orchestrator: /run worker skill
    Orchestrator->>Worker: Load context + execute
    Worker->>Worker: Execute skill
    Worker->>Git: Commit changes
    Git-->>Worker: commit hash
    Worker->>Threads: Save thread JSON
    Threads-->>Orchestrator: Checkpoint available
    Orchestrator-->>User: Result + thread ID

    Note over User,Threads: Session Resume

    User->>Orchestrator: /reanchor or /handoff
    Orchestrator->>Threads: Load latest thread
    Threads-->>Orchestrator: Git state + worker state
    Orchestrator-->>User: Context restored`;

export default function ThreadLifecycleDiagram() {
  return (
    <MermaidDiagram
      chart={chart}
      ariaLabel="Thread lifecycle sequence diagram showing user, orchestrator, worker, git, and threads interaction"
    />
  );
}
