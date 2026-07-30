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

for (const zone of model.zones) {
  if (ids.has(zone.id)) errors.push(`Duplicate id: ${zone.id}`);
  ids.add(zone.id);
  if (!zone.description?.trim()) errors.push(`Zone has no description: ${zone.id}`);
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
  if (!capability.sources?.length) {
    errors.push(`Capability has no source provenance: ${capability.id}`);
  }
  if (!capability.summary?.trim() || !capability.detail?.trim()) {
    errors.push(`Capability copy incomplete: ${capability.id}`);
  }
}

const capabilityIds = new Set(model.capabilities.map((capability) => capability.id));
const relationIds = new Set();

for (const relation of model.relations) {
  if (relationIds.has(relation.id)) errors.push(`Duplicate relation id: ${relation.id}`);
  relationIds.add(relation.id);
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
  if (!connected.has(capability.id)) {
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
