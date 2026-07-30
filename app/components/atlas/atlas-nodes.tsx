"use client";

import {
  Handle,
  Position,
  type Node,
  type NodeProps
} from "@xyflow/react";
import type { AtlasZone, Capability } from "@/app/data/ecosystem";
import { productLabels, runtimeLabels } from "@/app/data/ecosystem";
import { SystemIcon } from "./icon-registry";

export interface CapabilityNodeData extends Record<string, unknown> {
  capability: Capability;
  selected: boolean;
  dimmed: boolean;
  related: boolean;
  onActivate: (id: string) => void;
}

export interface ZoneNodeData extends Record<string, unknown> {
  zone: AtlasZone;
  dimmed: boolean;
}

type CapabilityFlowNode = Node<CapabilityNodeData, "capability">;
type ZoneFlowNode = Node<ZoneNodeData, "zone">;

const positions = [
  ["target-top", "target", Position.Top],
  ["target-right", "target", Position.Right],
  ["target-bottom", "target", Position.Bottom],
  ["target-left", "target", Position.Left],
  ["source-top", "source", Position.Top],
  ["source-right", "source", Position.Right],
  ["source-bottom", "source", Position.Bottom],
  ["source-left", "source", Position.Left]
] as const;

export function CapabilityNode({
  data
}: NodeProps<CapabilityFlowNode>) {
  const { capability, selected, dimmed, related } = data;

  return (
    <button
      type="button"
      className={[
        "atlas-node",
        capability.focal ? "atlas-node--focal" : "",
        selected ? "atlas-node--selected" : "",
        related ? "atlas-node--related" : "",
        dimmed ? "atlas-node--dimmed" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`${capability.label}. ${capability.summary}`}
      aria-pressed={selected}
      onClick={() => data.onActivate(capability.id)}
    >
      <span className="atlas-node__corner atlas-node__corner--tl" />
      <span className="atlas-node__corner atlas-node__corner--br" />

      <div className="atlas-node__icon">
        <SystemIcon name={capability.icon} size={18} />
      </div>
      <div className="atlas-node__copy">
        <span className="atlas-node__kicker">
          {productLabels[capability.product]} / {capability.kicker}
        </span>
        <strong>{capability.label}</strong>
        <span className="atlas-node__runtime">
          {runtimeLabels[capability.runtime]}
        </span>
      </div>

      {positions.map(([id, type, position]) => (
        <Handle
          key={id}
          id={id}
          type={type}
          position={position}
          className="atlas-node__handle"
        />
      ))}
    </button>
  );
}

export function ZoneNode({ data }: NodeProps<ZoneFlowNode>) {
  return (
    <div
      className={`atlas-zone ${data.dimmed ? "atlas-zone--dimmed" : ""}`}
      aria-label={`${data.zone.label}: ${data.zone.description}`}
    >
      <div className="atlas-zone__head">
        <span>{data.zone.eyebrow}</span>
        <strong>{data.zone.label}</strong>
        <small>{data.zone.description}</small>
      </div>
      <div className="atlas-zone__index">
        {data.zone.id.split(".").at(-1)?.slice(0, 2).toUpperCase()}
      </div>
    </div>
  );
}

export const atlasNodeTypes = {
  capability: CapabilityNode,
  zone: ZoneNode
};
