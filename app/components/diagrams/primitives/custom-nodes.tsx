"use client";

import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { t } from "./theme";
import type { HqNodeData } from "./types";

type HqNode = Node<HqNodeData>;

/* ─── Shared styles ─── */
const mono = { fontFamily: t.fontMono };
const handles = (
  <>
    <Handle type="target" position={Position.Top} />
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Bottom} />
    <Handle type="source" position={Position.Right} />
  </>
);

/* ─── Default (rounded rect) ─── */
function HqDefaultNode({ data }: NodeProps<HqNode>) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-lg px-3 py-2 text-center"
      style={{
        background: t.nodeFill,
        border: `1px solid ${t.nodeStroke}`,
        ...mono,
      }}
    >
      <span className="text-[11px] font-medium leading-tight" style={{ color: t.textPrimary }}>
        {data.label}
      </span>
      {data.sublabel && (
        <span className="mt-0.5 text-[9px] leading-tight" style={{ color: t.textMuted }}>
          {data.sublabel}
        </span>
      )}
      {handles}
    </div>
  );
}

/* ─── Emphasis (highlighted rect) ─── */
function HqEmphasisNode({ data }: NodeProps<HqNode>) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center rounded-lg px-3 py-2 text-center"
      style={{
        background: t.nodeEmphasis,
        border: `1px solid ${t.nodeEmphasisStroke}`,
        ...mono,
      }}
    >
      <span
        className="text-[12px] font-semibold leading-tight"
        style={{ color: t.textPrimary }}
      >
        {data.label}
      </span>
      {data.sublabel && (
        <span className="mt-0.5 text-[9px] leading-tight" style={{ color: t.textSecondary }}>
          {data.sublabel}
        </span>
      )}
      {handles}
    </div>
  );
}

/* ─── Diamond (decision) ─── */
function HqDiamondNode({ data }: NodeProps<HqNode>) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          background: t.nodeFill,
          border: `1px solid ${t.nodeEmphasisStroke}`,
          transform: "rotate(45deg)",
          borderRadius: 4,
          ...mono,
        }}
      >
        <span
          className="text-[10px] font-medium leading-tight text-center"
          style={{ color: t.textPrimary, transform: "rotate(-45deg)", maxWidth: "80%" }}
        >
          {data.label}
        </span>
      </div>
      {handles}
    </div>
  );
}

/* ─── Circle (start/end) ─── */
function HqCircleNode(_props: NodeProps<HqNode>) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background: t.edgeStroke,
        borderRadius: "50%",
        border: `1px solid ${t.nodeStroke}`,
      }}
    >
      {handles}
    </div>
  );
}

/* ─── Group (dashed container) ─── */
function HqGroupNode({ data }: NodeProps<HqNode>) {
  return (
    <div
      className="h-full w-full rounded-lg"
      style={{
        background: t.groupFill,
        border: `1px dashed ${t.groupStroke}`,
      }}
    >
      <div
        className="px-3 py-2 text-[10px] font-semibold"
        style={{ color: t.textSecondary, ...mono }}
      >
        {data.label}
      </div>
      {handles}
    </div>
  );
}

/* ─── Export stable nodeTypes ─── */
export const hqNodeTypes = {
  hqDefault: HqDefaultNode,
  hqEmphasis: HqEmphasisNode,
  hqDiamond: HqDiamondNode,
  hqCircle: HqCircleNode,
  hqGroup: HqGroupNode,
} as const;
