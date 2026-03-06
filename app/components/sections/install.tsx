"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import { TerminalCard } from "@/app/components/terminal-card";
import { CornerBrackets } from "@/app/components/corner-brackets";

const installExample = `$ npx create-hq

  ╭─────────────────────────────────────╮
  │                                     │
  │   HQ — Personal OS for AI Workers   │
  │                                     │
  ╰─────────────────────────────────────╯

✓ Created .claude/commands/ (17 slash commands)
✓ Created workers/ (26 AI workers)
✓ Created knowledge/ (5 knowledge bases)
✓ Created workspace/ (threads, checkpoints)
✓ Created starter-projects/ (3 templates)

  Next steps:
    cd hq
    claude
    /setup`;

const modulesExample = `$ npm install -g @indigoai/hq-cli

$ hq modules list
  hq-core       v5.0.0  merge   ✓ synced
  ralph-method  v2.1.0  link    ✓ synced
  dev-patterns  v1.4.0  link    ✓ synced

$ hq modules sync
  Syncing hq-core... ✓ 3 files updated
  Syncing ralph-method... ✓ up to date
  Syncing dev-patterns... ✓ up to date`;

const cloudExample = `$ hq sync init
  Authenticating with IndigoAI...
  ✓ Connected to hq.indigoai.com

$ hq sync start
  ✓ Background sync active
  ✓ Watching 847 files across 16 companies
  ✓ Access your HQ at hq.indigoai.com`;

const packages = [
  {
    name: "create-hq",
    command: "npx create-hq",
    description:
      "One-command installer. Creates your HQ with commands, workers, knowledge bases, and project scaffolding.",
    color: "text-cyan",
    borderColor: "border-cyan/20 hover:border-cyan/40",
  },
  {
    name: "@indigoai/hq-cli",
    command: "npm i -g @indigoai/hq-cli",
    description:
      "Module management. Sync external knowledge, workers, and tools into your HQ with merge, link, or copy strategies.",
    color: "text-accent",
    borderColor: "border-accent/20 hover:border-accent/40",
  },
  {
    name: "@indigoai/hq-cloud",
    command: "hq sync start",
    description:
      "Cloud sync engine. Access your HQ from any device. S3-backed with real-time file watching.",
    color: "text-amber",
    borderColor: "border-amber/20 hover:border-amber/40",
  },
];

export default function InstallSection() {
  return (
    <SectionWrapper
      id="install"
      badge="GET STARTED"
      title="Install in 30 Seconds"
      subtitle="One command to create your HQ. Two more to keep it synced and updated."
    >
      {/* Package cards */}
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <CornerBrackets key={pkg.name} size="sm">
            <div
              className={`rounded-lg border ${pkg.borderColor} bg-bg-card p-5 transition-all`}
            >
              <code className={`font-mono text-xs ${pkg.color}`}>
                {pkg.command}
              </code>
              <h3 className="mt-2 font-mono text-sm font-semibold text-text-primary">
                {pkg.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">
                {pkg.description}
              </p>
            </div>
          </CornerBrackets>
        ))}
      </div>

      {/* Terminal demos */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 font-mono text-sm text-cyan">
            01 — Create your HQ
          </h3>
          <TerminalCard title="terminal" language="shell">
            {installExample}
          </TerminalCard>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-sm text-accent">
            02 — Manage modules
          </h3>
          <TerminalCard title="terminal" language="shell">
            {modulesExample}
          </TerminalCard>
        </div>
        <div>
          <h3 className="mb-3 font-mono text-sm text-amber">
            03 — Sync to cloud
          </h3>
          <TerminalCard title="terminal" language="shell">
            {cloudExample}
          </TerminalCard>
        </div>
      </div>

      {/* GitHub link */}
      <div className="mt-10 text-center">
        <a
          href="https://github.com/indigoai-us/hq"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          indigoai-us/hq — View on GitHub
        </a>
      </div>
    </SectionWrapper>
  );
}
