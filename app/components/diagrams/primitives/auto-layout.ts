import dagre from "dagre";
import type { Node, Edge } from "@xyflow/react";
import type { LayoutDirection } from "./types";

interface LayoutOptions {
  direction?: LayoutDirection;
  nodeWidth?: number;
  nodeHeight?: number;
  rankSep?: number;
  nodeSep?: number;
}

export function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {},
): Node[] {
  const {
    direction = "TB",
    nodeWidth = 180,
    nodeHeight = 56,
    rankSep = 60,
    nodeSep = 40,
  } = options;

  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, ranksep: rankSep, nodesep: nodeSep });

  const nonGroupNodes = nodes.filter((n) => n.type !== "hqGroup");
  for (const node of nonGroupNodes) {
    const w = (node.style?.width as number) ?? nodeWidth;
    const h = (node.style?.height as number) ?? nodeHeight;
    g.setNode(node.id, { width: w, height: h });
  }
  for (const edge of edges) {
    if (
      nonGroupNodes.some((n) => n.id === edge.source) &&
      nonGroupNodes.some((n) => n.id === edge.target)
    ) {
      g.setEdge(edge.source, edge.target);
    }
  }

  dagre.layout(g);

  return nodes.map((node) => {
    if (node.type === "hqGroup") return node;
    const pos = g.node(node.id);
    if (!pos) return node;
    const w = (node.style?.width as number) ?? nodeWidth;
    const h = (node.style?.height as number) ?? nodeHeight;
    return {
      ...node,
      position: { x: pos.x - w / 2, y: pos.y - h / 2 },
    };
  });
}
