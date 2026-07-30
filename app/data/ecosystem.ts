import rawEcosystem from "./ecosystem.json";

export const products = ["core", "cloud", "pro", "surface"] as const;
export type Product = (typeof products)[number];

export const runtimes = [
  "local",
  "bridge",
  "data-plane",
  "control-plane",
  "runtime",
  "surface"
] as const;
export type Runtime = (typeof runtimes)[number];

export const domains = [
  "context",
  "execution",
  "collaboration",
  "trust",
  "continuity",
  "planning",
  "knowledge",
  "integration",
  "shipping",
  "learning",
  "sync",
  "governance",
  "operations"
] as const;
export type Domain = (typeof domains)[number];

export const relationKinds = [
  "invokes",
  "reads",
  "writes",
  "syncs",
  "authenticates",
  "enforces",
  "publishes",
  "subscribes"
] as const;
export type RelationKind = (typeof relationKinds)[number];

export interface AtlasPoint {
  x: number;
  y: number;
}

export interface AtlasSize {
  width: number;
  height: number;
}

export interface AtlasZone {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  position: AtlasPoint;
  size: AtlasSize;
}

export interface Capability {
  id: string;
  label: string;
  kicker: string;
  summary: string;
  detail: string;
  product: Product;
  runtime: Runtime;
  domain: Domain;
  icon: string;
  parentId: string;
  position: AtlasPoint;
  size: AtlasSize;
  commands: string[];
  repos: string[];
  sources: string[];
  tags: string[];
  focal?: boolean;
}

export interface Relation {
  id: string;
  source: string;
  target: string;
  kind: RelationKind;
  label?: string;
}

export interface TourScene {
  id: string;
  number: string;
  title: string;
  claim: string;
  body: string;
  focus: string[];
}

export interface EcosystemModel {
  meta: {
    title: string;
    version: string;
    updated: string;
    claim: string;
    principles: string[];
  };
  zones: AtlasZone[];
  capabilities: Capability[];
  relations: Relation[];
  tour: TourScene[];
}

export const ecosystem = rawEcosystem as EcosystemModel;

export const capabilityById = new Map(
  ecosystem.capabilities.map((capability) => [capability.id, capability])
);

export const zoneById = new Map(
  ecosystem.zones.map((zone) => [zone.id, zone])
);

export const productLabels: Record<Product, string> = {
  core: "Core",
  cloud: "Cloud",
  pro: "Pro",
  surface: "Surfaces"
};

export const runtimeLabels: Record<Runtime, string> = {
  local: "Local",
  bridge: "Client bridge",
  "data-plane": "Data plane",
  "control-plane": "Control plane",
  runtime: "Hosted runtime",
  surface: "Experience surface"
};

export const domainLabels: Record<Domain, string> = {
  context: "Context",
  execution: "Execution",
  collaboration: "Collaboration",
  trust: "Trust",
  continuity: "Continuity",
  planning: "Planning",
  knowledge: "Knowledge",
  integration: "Integrations",
  shipping: "Shipping",
  learning: "Learning",
  sync: "Sync",
  governance: "Governance",
  operations: "Operations"
};
