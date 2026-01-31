"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import MermaidDiagram from "@/app/components/mermaid-diagram";
import {
  workers,
  workerTypeBgColors,
  teamLabels,
  type Team,
  type WorkerType,
} from "@/app/data/hq-data";

const chart = `graph TD
  subgraph DevTeam["<b>Dev Team</b> — 12 CodeWorkers"]
    pm["project-manager"]
    te["task-executor"]
    arch["architect"]
    be["backend-dev"]
    db["database-dev"]
    fe["frontend-dev"]
    infra["infra-dev"]
    md["motion-designer"]
    cr["code-reviewer"]
    kc["knowledge-curator"]
    pp["product-planner"]
    dqa["dev-qa-tester"]
  end

  subgraph ContentTeam["<b>Content Team</b> — 5 ContentWorkers"]
    cb["content-brand"]
    cs["content-sales"]
    cp["content-product"]
    cl["content-legal"]
    csh["content-shared"]
  end

  subgraph Utility["<b>Utility</b> — 3 OpsWorkers"]
    fd["frontend-designer"]
    qt["qa-tester"]
    ss["security-scanner"]
  end

  subgraph Custom["<b>Custom</b> — You Create These"]
    yc["your-cfo"]
    ym["your-cmo"]
    ya["your-analyst"]
    ys["your-social"]
  end

  style DevTeam fill:#111113,stroke:#3f3f46,color:#fafafa
  style ContentTeam fill:#111113,stroke:#3f3f46,color:#fafafa
  style Utility fill:#111113,stroke:#3f3f46,color:#fafafa
  style Custom fill:#111113,stroke:#52525b,color:#a1a1aa`;

const workerTypes: WorkerType[] = ["CodeWorker", "ContentWorker", "SocialWorker", "OpsWorker", "ResearchWorker"];
const teams: Team[] = ["dev-team", "content-team", "utility", "custom"];

export default function WorkerHierarchySection() {
  return (
    <SectionWrapper
      id="workers"
      badge="WORKERS"
      title="Worker Hierarchy"
      subtitle="Specialized AI workers organized into teams. Each has a YAML definition, skills, verification, and state machine lifecycle."
    >
      <MermaidDiagram chart={chart} />

      <div className="mt-8 flex flex-wrap gap-3">
        {workerTypes.map((type) => (
          <span
            key={type}
            className={`inline-flex items-center gap-2 rounded-full border ${workerTypeBgColors[type]} px-3 py-1 font-mono text-xs text-text-secondary`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
            {type}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {teams.map((team) => {
          const teamWorkers = workers.filter((w) => w.team === team);
          return (
            <div
              key={team}
              className="rounded-xl border border-border bg-bg-card p-5"
            >
              <h3 className="font-mono text-sm font-semibold text-text-primary">
                {teamLabels[team]}{" "}
                <span className="text-text-muted">({teamWorkers.length})</span>
              </h3>
              <div className="mt-3 space-y-1.5">
                {teamWorkers.map((w) => (
                  <div
                    key={w.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-mono text-text-primary">{w.id}</span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {w.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
