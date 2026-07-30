import { readFile } from "node:fs/promises";

const file = new URL("../app/data/ecosystem.json", import.meta.url);
const model = JSON.parse(await readFile(file, "utf8"));

const errors = [];
const ids = new Set();
const zoneIds = new Set(model.zones.map((zone) => zone.id));
const productIds = new Set(["core", "cloud", "pro", "surface"]);
const runtimeIds = new Set([
  "local",
  "bridge",
  "data-plane",
  "control-plane",
  "runtime",
  "surface"
]);
const domainIds = new Set([
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
]);
const relationKinds = new Set([
  "invokes",
  "reads",
  "writes",
  "syncs",
  "authenticates",
  "enforces",
  "publishes",
  "subscribes"
]);
const iconIds = new Set([
  "activity",
  "blocks",
  "book",
  "bot",
  "brain",
  "building",
  "cloud",
  "cpu",
  "credit-card",
  "files",
  "fingerprint",
  "git-branch",
  "history",
  "key-round",
  "lock-keyhole",
  "messages",
  "messages-square",
  "monitor",
  "network",
  "orbit",
  "package",
  "plug",
  "radio",
  "refresh",
  "refresh-cw",
  "rocket",
  "route",
  "server-cog",
  "shield",
  "sparkles",
  "store",
  "terminal",
  "users",
  "workflow"
]);

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validGeometry(item) {
  return (
    Number.isFinite(item?.position?.x) &&
    Number.isFinite(item?.position?.y) &&
    Number.isFinite(item?.size?.width) &&
    Number.isFinite(item?.size?.height) &&
    item.size.width > 0 &&
    item.size.height > 0
  );
}

for (const field of ["title", "version", "updated", "claim"]) {
  if (!hasText(model.meta?.[field])) errors.push(`Missing meta.${field}`);
}
if (!Array.isArray(model.meta?.principles) || !model.meta.principles.every(hasText)) {
  errors.push("Meta principles must be a non-empty text array");
}

for (const zone of model.zones) {
  if (ids.has(zone.id)) errors.push(`Duplicate id: ${zone.id}`);
  ids.add(zone.id);
  if (![zone.label, zone.eyebrow, zone.description].every(hasText)) {
    errors.push(`Zone copy incomplete: ${zone.id}`);
  }
  if (!validGeometry(zone)) errors.push(`Invalid zone geometry: ${zone.id}`);
}

for (const capability of model.capabilities) {
  if (ids.has(capability.id)) errors.push(`Duplicate id: ${capability.id}`);
  ids.add(capability.id);
  if (!zoneIds.has(capability.parentId)) {
    errors.push(`Unknown parent zone for ${capability.id}: ${capability.parentId}`);
  }
  if (!productIds.has(capability.product)) {
    errors.push(`Unknown product for ${capability.id}: ${capability.product}`);
  }
  if (!runtimeIds.has(capability.runtime)) {
    errors.push(`Unknown runtime for ${capability.id}: ${capability.runtime}`);
  }
  if (!domainIds.has(capability.domain)) {
    errors.push(`Unknown domain for ${capability.id}: ${capability.domain}`);
  }
  if (!iconIds.has(capability.icon)) {
    errors.push(`Unknown icon for ${capability.id}: ${capability.icon}`);
  }
  if (!validGeometry(capability)) {
    errors.push(`Invalid capability geometry: ${capability.id}`);
  }
  for (const field of ["commands", "repos", "sources", "tags"]) {
    if (!Array.isArray(capability[field])) {
      errors.push(`Capability ${capability.id} has invalid ${field}`);
    }
  }
  for (const field of ["repos", "sources", "tags"]) {
    if (!capability[field]?.length || !capability[field].every(hasText)) {
      errors.push(`Capability ${capability.id} has no valid ${field}`);
    }
  }
  if (![capability.label, capability.kicker, capability.summary, capability.detail].every(hasText)) {
    errors.push(`Capability copy incomplete: ${capability.id}`);
  }
}

const capabilityIds = new Set(model.capabilities.map((capability) => capability.id));
const relationIds = new Set();

for (const relation of model.relations) {
  if (relationIds.has(relation.id)) errors.push(`Duplicate relation id: ${relation.id}`);
  relationIds.add(relation.id);
  if (!relationKinds.has(relation.kind)) {
    errors.push(`Relation ${relation.id} has unknown kind: ${relation.kind}`);
  }
  if (!capabilityIds.has(relation.source)) {
    errors.push(`Relation ${relation.id} has unknown source: ${relation.source}`);
  }
  if (!capabilityIds.has(relation.target)) {
    errors.push(`Relation ${relation.id} has unknown target: ${relation.target}`);
  }
}

const sceneIds = new Set();
for (const scene of model.tour) {
  if (sceneIds.has(scene.id)) errors.push(`Duplicate tour id: ${scene.id}`);
  sceneIds.add(scene.id);
  if (![scene.id, scene.number, scene.title, scene.claim, scene.body].every(hasText)) {
    errors.push(`Tour copy incomplete: ${scene.id}`);
  }
  if (!Array.isArray(scene.focus) || scene.focus.length === 0) {
    errors.push(`Tour ${scene.id} has no focus systems`);
    continue;
  }
  for (const focusId of scene.focus) {
    if (!capabilityIds.has(focusId)) {
      errors.push(`Tour ${scene.id} references unknown capability: ${focusId}`);
    }
  }
}

const connected = new Set(
  model.relations.flatMap((relation) => [relation.source, relation.target])
);
for (const capability of model.capabilities) {
  if (!connected.has(capability.id) && capability.independent !== true) {
    errors.push(`Orphan capability: ${capability.id}`);
  }
}

if (errors.length) {
  console.error(`Ecosystem validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${model.zones.length} zones, ${model.capabilities.length} capabilities, ` +
    `${model.relations.length} relations, and ${model.tour.length} tour scenes.`
);
