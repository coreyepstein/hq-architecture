# HQ Architecture

Visual architecture guide for [HQ](https://github.com/coreyepstein/hq-starter-kit) — a personal OS for orchestrating work across companies, workers, and AI.

Built with Next.js 15, React Flow, Mermaid, and Framer Motion.

## Sections

- **Directory Structure** — HQ file tree and what lives where
- **INDEX.md System** — hierarchical navigation maps, auto-updated by commands
- **Company Isolation** — multi-company contexts with credential/knowledge firewalls
- **Worker Hierarchy** — 30+ specialized AI workers across dev, content, and ops teams
- **Commands** — 22 slash commands organized by category
- **Ralph Loop** — PRD-driven autonomous execution cycle
- **Worker State Machine** — lifecycle states from idle → executing → learning
- **Skill Execution** — how workers route and execute skills
- **Thread Lifecycle** — checkpoint, handoff, and session recovery
- **Learning System** — tiered rule capture and injection
- **Knowledge System** — searchable knowledge bases (qmd-powered)
- **Knowledge Repos** — independent git repos symlinked into HQ

## Run locally

```bash
bun install
bun dev
```

## Stack

Next.js 15 · React 19 · React Flow · Mermaid · Framer Motion · Tailwind CSS 4 · TypeScript

## Related

- [hq-starter-kit](https://github.com/coreyepstein/hq-starter-kit) — the framework itself
- [ralph-methodology](https://github.com/coreyepstein/ralph-methodology) — the autonomous coding loop
