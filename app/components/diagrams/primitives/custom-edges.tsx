"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
  type Edge,
  MarkerType,
} from "@xyflow/react";
import { t } from "./theme";

/* ─── Shared marker config ─── */
export const defaultMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 16,
  height: 16,
  color: t.arrowFill,
};

/* ─── Edge data type ─── */
type HqEdgeData = { label?: string; [key: string]: unknown };
type HqEdge = Edge<HqEdgeData>;

/* ─── Default solid edge ─── */
function HqDefaultEdge(props: EdgeProps<HqEdge>) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  return (
    <BaseEdge
      path={edgePath}
      style={{ stroke: t.edgeStroke, strokeWidth: 1.5 }}
      markerEnd={`url(#${MarkerType.ArrowClosed})`}
    />
  );
}

/* ─── Dashed edge ─── */
function HqDashedEdge(props: EdgeProps<HqEdge>) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  return (
    <BaseEdge
      path={edgePath}
      style={{ stroke: t.edgeStroke, strokeWidth: 1.5, strokeDasharray: "6 4" }}
      markerEnd={`url(#${MarkerType.ArrowClosed})`}
    />
  );
}

/* ─── Labeled solid edge ─── */
function HqLabeledEdge(props: EdgeProps<HqEdge>) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data } = props;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{ stroke: t.edgeStroke, strokeWidth: 1.5 }}
        markerEnd={`url(#${MarkerType.ArrowClosed})`}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-none absolute"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontFamily: t.fontMono,
              fontSize: 9,
              color: t.edgeLabel,
              background: t.bgCard,
              padding: "1px 6px",
              borderRadius: 4,
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

/* ─── Dashed labeled edge ─── */
function HqDashedLabeledEdge(props: EdgeProps<HqEdge>) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data } = props;
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{ stroke: t.edgeStroke, strokeWidth: 1.5, strokeDasharray: "6 4" }}
        markerEnd={`url(#${MarkerType.ArrowClosed})`}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan pointer-events-none absolute"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontFamily: t.fontMono,
              fontSize: 9,
              color: t.edgeLabel,
              background: t.bgCard,
              padding: "1px 6px",
              borderRadius: 4,
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

/* ─── Export stable edgeTypes ─── */
export const hqEdgeTypes = {
  hqDefault: HqDefaultEdge,
  hqDashed: HqDashedEdge,
  hqLabeled: HqLabeledEdge,
  hqDashedLabeled: HqDashedLabeledEdge,
} as const;
