"use client";

import SectionWrapper from "@/app/components/section-wrapper";
import { CornerBrackets } from "@/app/components/corner-brackets";

export default function GetStartedSection() {
  return (
    <SectionWrapper id="get-started">
      <div className="text-center">
        <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent-glow px-4 py-1.5 font-mono text-xs tracking-widest text-accent">
          READY?
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          Build your HQ today
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-text-secondary">
          One command to install. Open source. Free forever.
          Or work with Indigo to get a custom HQ for your team.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Dev path */}
        <CornerBrackets size="md">
          <div className="rounded-xl border border-border bg-bg-card p-8 text-center transition-all hover:border-cyan/20">
            <span className="font-mono text-xs tracking-wider text-cyan">
              FOR DEVELOPERS
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-primary">
              Install & Customize
            </h3>
            <p className="mt-2 rounded-lg bg-bg/80 px-4 py-2 font-mono text-sm text-cyan">
              npx create-hq
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              17 commands, 26 workers, 5 knowledge bases — ready in 30 seconds.
              Customize your workers, add companies, and start orchestrating.
            </p>
            <a
              href="https://github.com/indigoai-us/hq"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-2.5 font-mono text-sm text-text-primary transition-all hover:bg-accent/20 hover:border-accent/50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </CornerBrackets>

        {/* Enterprise path */}
        <CornerBrackets size="md">
          <div className="rounded-xl border border-border bg-bg-card p-8 text-center transition-all hover:border-amber/20">
            <span className="font-mono text-xs tracking-wider text-amber">
              FOR TEAMS & ENTERPRISES
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-primary">
              Build With Indigo
            </h3>
            <p className="mt-3 text-sm text-text-secondary">
              Get a custom HQ built, configured, and handed off — worker
              architecture, knowledge bases, and orchestration pipelines your
              team actually uses.
            </p>
            <a
              href="https://getindigo.ai/advisory"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-6 py-2.5 font-mono text-sm text-text-primary transition-all hover:bg-amber/20 hover:border-amber/50"
            >
              HQ Advisory Services
            </a>
          </div>
        </CornerBrackets>
      </div>
    </SectionWrapper>
  );
}
