// ─── Types ───────────────────────────────────────────────────────────────────

export type WorkerType =
  | "CodeWorker"
  | "ContentWorker"
  | "SocialWorker"
  | "OpsWorker"
  | "ResearchWorker";

export type Team = "dev-team" | "content-team" | "utility" | "custom";

export interface Worker {
  id: string;
  type: WorkerType;
  team: Team;
  description: string;
}

export interface Company {
  id: string;
  label: string;
  description: string;
  owns: string[];
}

export interface CommandCategory {
  name: string;
  count: number;
  commands: { id: string; description: string }[];
}

export interface Stat {
  label: string;
  description: string;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export const stats: Stat[] = [
  { label: "Companies", description: "Isolated business contexts" },
  { label: "Workers", description: "Specialized AI agents" },
  { label: "Commands", description: "Slash command skills" },
  { label: "Projects", description: "PRD-driven execution" },
  { label: "Knowledge Bases", description: "Searchable context" },
];

// ─── Companies ───────────────────────────────────────────────────────────────

export const companies: Company[] = [
  {
    id: "company-a",
    label: "Company A",
    description: "Each company is an isolated context with its own credentials, data, and knowledge.",
    owns: ["settings/", "data/", "knowledge/"],
  },
  {
    id: "company-b",
    label: "Company B",
    description: "Workers and commands can be scoped to a specific company.",
    owns: ["settings/", "data/", "knowledge/"],
  },
  {
    id: "personal",
    label: "Personal",
    description: "Personal context for individual workflows and social presence.",
    owns: ["settings/", "knowledge/"],
  },
];

// ─── Workers ─────────────────────────────────────────────────────────────────

export const workers: Worker[] = [
  // Dev Team — built-in public workers
  { id: "project-manager", type: "CodeWorker", team: "dev-team", description: "PRD lifecycle, issue selection" },
  { id: "task-executor", type: "CodeWorker", team: "dev-team", description: "Route to workers, validate completion" },
  { id: "architect", type: "CodeWorker", team: "dev-team", description: "System & API design" },
  { id: "backend-dev", type: "CodeWorker", team: "dev-team", description: "Endpoints, business logic" },
  { id: "database-dev", type: "CodeWorker", team: "dev-team", description: "Schema, migrations, queries" },
  { id: "frontend-dev", type: "CodeWorker", team: "dev-team", description: "React/Next.js components" },
  { id: "infra-dev", type: "CodeWorker", team: "dev-team", description: "CI/CD, deployment, monitoring" },
  { id: "motion-designer", type: "CodeWorker", team: "dev-team", description: "Animations, visual polish" },
  { id: "code-reviewer", type: "CodeWorker", team: "dev-team", description: "PR review, merge gating" },
  { id: "knowledge-curator", type: "CodeWorker", team: "dev-team", description: "Learnings, documentation" },
  { id: "product-planner", type: "CodeWorker", team: "dev-team", description: "PRD creation, technical specs" },
  { id: "dev-qa-tester", type: "CodeWorker", team: "dev-team", description: "Testing, automation, a11y" },

  // Content Team — built-in public workers
  { id: "content-brand", type: "ContentWorker", team: "content-team", description: "Voice, messaging, tone" },
  { id: "content-sales", type: "ContentWorker", team: "content-team", description: "Conversion copy, CTAs" },
  { id: "content-product", type: "ContentWorker", team: "content-team", description: "Feature accuracy, claims" },
  { id: "content-legal", type: "ContentWorker", team: "content-team", description: "Compliance, regulatory" },
  { id: "content-shared", type: "ContentWorker", team: "content-team", description: "Shared utilities library" },

  // Utility — built-in public workers
  { id: "frontend-designer", type: "OpsWorker", team: "utility", description: "UI generation" },
  { id: "qa-tester", type: "OpsWorker", team: "utility", description: "Automated testing (Playwright)" },
  { id: "security-scanner", type: "OpsWorker", team: "utility", description: "Vulnerability detection" },

  // Custom — user-created private workers (examples)
  { id: "your-cfo", type: "OpsWorker", team: "custom", description: "Financial reporting for your company" },
  { id: "your-cmo", type: "OpsWorker", team: "custom", description: "Marketing ops for your company" },
  { id: "your-analyst", type: "ResearchWorker", team: "custom", description: "Data analysis, anomaly detection" },
  { id: "your-social", type: "SocialWorker", team: "custom", description: "Social media posting" },
];

// ─── Commands ────────────────────────────────────────────────────────────────

export const commandCategories: CommandCategory[] = [
  {
    name: "Session",
    count: 5,
    commands: [
      { id: "reanchor", description: "Context reanchoring" },
      { id: "checkpoint", description: "Save thread state" },
      { id: "handoff", description: "Hand off to fresh session" },
      { id: "nexttask", description: "Scan and suggest next tasks" },
      { id: "remember", description: "Capture learnings" },
    ],
  },
  {
    name: "Workers",
    count: 3,
    commands: [
      { id: "run", description: "Execute worker skills" },
      { id: "newworker", description: "Scaffold new worker" },
      { id: "metrics", description: "View worker metrics" },
    ],
  },
  {
    name: "Projects",
    count: 4,
    commands: [
      { id: "prd", description: "Plan project, generate PRD" },
      { id: "run-project", description: "Execute project (Ralph loop)" },
      { id: "execute-task", description: "Execute single task" },
      { id: "pure-ralph", description: "Launch Pure Ralph orchestrator" },
    ],
  },
  {
    name: "Content",
    count: 6,
    commands: [
      { id: "contentidea", description: "Build content idea into posts" },
      { id: "suggestposts", description: "Research and suggest posts" },
      { id: "scheduleposts", description: "Choose what to post" },
      { id: "preview-post", description: "Preview, select images, approve" },
      { id: "post-now", description: "Post to social platforms" },
      { id: "humanize", description: "Remove AI writing patterns" },
    ],
  },
  {
    name: "Design",
    count: 3,
    commands: [
      { id: "generateimage", description: "Generate images" },
      { id: "svg", description: "Generate SVG graphics" },
      { id: "design-iterate", description: "A/B design iterations with git" },
    ],
  },
  {
    name: "System",
    count: 5,
    commands: [
      { id: "hq-sync", description: "Sync modules from manifest" },
      { id: "cleanup", description: "Audit and enforce policies" },
      { id: "search", description: "Search HQ (qmd-powered)" },
      { id: "search-reindex", description: "Reindex (semantic + full-text)" },
      { id: "setup", description: "Interactive setup wizard" },
    ],
  },
  {
    name: "Deploy",
    count: 2,
    commands: [
      { id: "deploy", description: "Deploy to production" },
      { id: "publish-kit", description: "Publish content kit" },
    ],
  },
];

// ─── Worker Type Colors ──────────────────────────────────────────────────────

export const workerTypeColors: Record<WorkerType, string> = {
  CodeWorker: "text-text-secondary",
  ContentWorker: "text-text-secondary",
  SocialWorker: "text-text-secondary",
  OpsWorker: "text-text-secondary",
  ResearchWorker: "text-text-secondary",
};

export const workerTypeBgColors: Record<WorkerType, string> = {
  CodeWorker: "bg-white/5 border-white/10",
  ContentWorker: "bg-white/5 border-white/10",
  SocialWorker: "bg-white/5 border-white/10",
  OpsWorker: "bg-white/5 border-white/10",
  ResearchWorker: "bg-white/5 border-white/10",
};

export const teamLabels: Record<Team, string> = {
  "dev-team": "Dev Team",
  "content-team": "Content Team",
  utility: "Utility",
  custom: "Custom (You Create)",
};

// ─── Directory Structure ─────────────────────────────────────────────────────

export const directoryTree = [
  { path: ".claude/commands/", description: "Slash commands (skills)", icon: "⚡" },
  { path: "agents.md", description: "User profile & preferences", icon: "👤" },
  { path: "companies/", description: "Isolated business contexts", icon: "🏢" },
  { path: "knowledge/", description: "Public + private KBs", icon: "📚" },
  { path: "projects/", description: "PRD-driven projects", icon: "📋" },
  { path: "repos/", description: "Public + private repos", icon: "💻" },
  { path: "workers/", description: "Specialized AI workers", icon: "🤖" },
  { path: "workspace/", description: "Runtime state & output", icon: "📁" },
];

// ─── Knowledge Bases ─────────────────────────────────────────────────────────

export const knowledgeBases = {
  public: [
    { id: "Ralph", description: "Coding methodology" },
    { id: "workers", description: "Worker framework" },
    { id: "hq-core", description: "Thread schema, HQ patterns" },
    { id: "dev-team", description: "Dev team patterns" },
    { id: "design-styles", description: "Image generation styles" },
    { id: "pure-ralph", description: "Pure Ralph orchestration" },
    { id: "projects", description: "Project templates" },
    { id: "ai-security", description: "Security practices" },
  ],
  private: [
    { id: "your-tools", description: "Your tool integrations" },
    { id: "your-domain", description: "Your domain knowledge" },
  ],
  company: [
    { company: "company-a", topics: ["metrics", "schema", "integrations"] },
    { company: "company-b", topics: ["brand", "products", "messaging"] },
    { company: "personal", topics: ["voice", "style"] },
  ],
};
