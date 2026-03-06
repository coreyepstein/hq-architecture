"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import { TerminalCard } from "@/app/components/terminal-card";

const tree = `hq/
├── .claude/
│   ├── commands/          # 35 slash commands (/prd, /run, /handoff...)
│   ├── hooks/             # PreToolUse, PostToolUse, PreCompact
│   ├── policies/          # Hard/soft enforcement rules
│   └── skills/            # Reusable skill definitions
├── companies/
│   ├── manifest.yaml      # Source of truth: company → resources
│   ├── liverecover/
│   │   ├── knowledge/     # Embedded git repo
│   │   ├── settings/      # Credentials by service (aws/, linear/, stripe/...)
│   │   ├── policies/      # Company-scoped rules
│   │   ├── projects/      # PRDs + execution state
│   │   ├── workers/       # Company-scoped AI workers
│   │   └── data/          # Exports, reports, checkpoints
│   ├── indigo/
│   ├── personal/
│   └── ...                # 16 companies, fully isolated
├── knowledge/
│   ├── public/            # Symlinks → repos/public/knowledge-*
│   └── private/           # Internal knowledge bases
├── repos/
│   ├── public/            # Open-source repos (hq, slack-mcp, ralph...)
│   └── private/           # Client repos (vyg, indigo-nx, moonflow...)
├── workers/
│   └── public/            # Shared workers (dev-team, content-team, qa...)
├── workspace/
│   ├── threads/           # Session continuity (handoff.json, thread files)
│   ├── orchestrator/      # Project execution state
│   ├── reports/           # Generated reports
│   └── social-drafts/     # Content queue
├── settings/              # Shared config (orchestrator.yaml)
└── CLAUDE.md              # System prompt — all rules live here`;

export default function DirectoryTreeSection() {
  return (
    <SectionWrapper
      id="structure"
      badge="STRUCTURE"
      title="Directory Architecture"
      subtitle="Everything has a place. Companies, workers, knowledge, and projects — all isolated yet interconnected."
    >
      <div className="mx-auto max-w-3xl">
        <TerminalCard title="tree" language="shell">
          {tree}
        </TerminalCard>
      </div>
    </SectionWrapper>
  );
}
