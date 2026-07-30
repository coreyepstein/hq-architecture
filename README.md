# HQ System Atlas

A navigable architecture briefing for the complete HQ ecosystem: **HQ Core**,
**HQ Cloud**, **HQ Pro**, and the product surfaces that connect people and agents
to them.

The Atlas is generated from one validated system model rather than a collection
of disconnected diagrams. Every node carries its runtime, capability domain,
operator surfaces, repository ownership, source lineage, and typed
relationships.

## Product planes

- **HQ Core** — the local context, policy, capability, execution, continuity,
  knowledge, and learning layer installed with every HQ.
- **HQ Cloud** — the entity-aware client bridge and data-movement layer for
  sync, realtime wakeups, files, secrets, MCP, maps, messages, and deploy.
- **HQ Pro** — the authoritative platform for identity, tenancy, durable shared
  truth, governance, hosted agents, Work Mesh, integrations, billing, delivery,
  and operations.
- **Experience surfaces** — AI clients, CLI, Desktop, Console, Auth,
  Onboarding, Installer/create-hq, Meet, Meta, Finance, and Ops.

The authority boundary is deliberate: **Core owns the local operating system;
Cloud moves and projects scoped state; Pro owns identity and durable shared
truth. Realtime wakes; databases remember.**

## Ways to navigate

- **Explorer** — pan, zoom, filter, search, and inspect the architecture graph.
- **Tour** — a ten-scene guided briefing with keyboard navigation, fullscreen,
  and a scene overview.
- **Catalog** — an accessible, searchable index generated from the same model.
- **Deep links** — routes such as `#atlas/core.kernel`,
  `#tour/continuity`, and `#catalog/pro.workmesh` preserve place.

Tour keys: `←` / `→` navigate, `Home` / `End` jump, `O` opens the scene
overview, and `F` toggles fullscreen.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
npm run check
npm run build
```

`npm run check` validates the full ecosystem schema and graph integrity before
running TypeScript and ESLint. Edit
[`app/data/ecosystem.json`](app/data/ecosystem.json) to extend the model; the
Explorer, Tour, Catalog, inspector, filters, and counts all update from it.

## Stack

Next.js 15 · React 19 · React Flow · Lucide · Tailwind CSS 4 · TypeScript
