"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import { TerminalCard } from "@/app/components/terminal-card";

const workerExample = `# workers/public/backend-dev/worker.yaml
name: backend-dev
type: CodeWorker
team: dev-team
description: Endpoints, business logic, APIs

skills:
  - name: implement-endpoint
    description: Build a REST or GraphQL endpoint
    steps:
      - Read the PRD acceptance criteria
      - Check existing route patterns
      - Implement with tests
      - Run quality gates

instructions: |
  Always use existing auth middleware.
  Follow repository naming conventions.
  Include error handling for all edge cases.`;

const prdExample = `> /prd
Planning project: user-auth-migration

Generated 5 stories:
  US-001  Set up Clerk provider       P0  ■■■■■
  US-002  Migrate session handling     P0  ■■■■■
  US-003  Update API middleware        P0  ■■■■■
  US-004  Add role-based access        P1  ■■■□□
  US-005  Integration tests            P1  ■■■□□

PRD saved → companies/acme/projects/user-auth-migration/prd.json
Branch created → feature/user-auth-migration`;

const runExample = `> /run backend-dev implement-endpoint

Worker: backend-dev
Skill: implement-endpoint
Company: acme (auto-detected from cwd)

Reading PRD... US-003 "Update API middleware"
Reading knowledge... companies/acme/knowledge/auth.md
Checking patterns... repos/private/acme-api/src/middleware/

Implementing...
✓ Created src/middleware/clerk-auth.ts
✓ Updated src/routes/index.ts
✓ Added tests in __tests__/clerk-auth.test.ts
✓ All 14 tests passing

Quality gates:
  ✓ TypeScript — no errors
  ✓ Lint — clean
  ✓ Tests — 14/14 passed`;

const claudeMdExample = `# .claude/CLAUDE.md (excerpt)

## Company Isolation
- Infer active company from cwd, worker, or repo
- NEVER read credentials from another company
- NEVER mix company knowledge in outputs

## Workers
Worker-first rule: Before specialized tasks,
check workers/registry.yaml for a match.
Use /run {worker} {skill} — workers carry
domain instructions + learned rules.

## Ralph Loop
Plan → Execute → Review → Learn
Every project runs through this cycle
until acceptance criteria pass.`;

export default function HowItWorksSection() {
  return (
    <SectionWrapper
      id="how-it-works"
      badge="IN ACTION"
      title="How It Works"
      subtitle="HQ runs inside Claude Code. You type commands, workers execute, and the system learns."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-mono text-sm text-accent">
              01 — Define workers with domain knowledge
            </h3>
            <TerminalCard title="worker.yaml">{workerExample}</TerminalCard>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-sm text-accent">
              03 — Dispatch workers to execute
            </h3>
            <TerminalCard title="terminal" language="shell">
              {runExample}
            </TerminalCard>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 font-mono text-sm text-accent">
              02 — Plan projects with /prd
            </h3>
            <TerminalCard title="terminal" language="shell">
              {prdExample}
            </TerminalCard>
          </div>
          <div>
            <h3 className="mb-3 font-mono text-sm text-accent">
              04 — CLAUDE.md governs behavior
            </h3>
            <TerminalCard title="CLAUDE.md" language="markdown">
              {claudeMdExample}
            </TerminalCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
