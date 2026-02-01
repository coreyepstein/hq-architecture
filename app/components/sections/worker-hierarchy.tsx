"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import WorkerHierarchyDiagram from "@/app/components/diagrams/WorkerHierarchyDiagram";
import {
  workers,
  workerTypeBgColors,
  teamLabels,
  type Team,
  type WorkerType,
} from "@/app/data/hq-data";

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
      <WorkerHierarchyDiagram />

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
