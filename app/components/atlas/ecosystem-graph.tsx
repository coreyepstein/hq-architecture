"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node
} from "@xyflow/react";
import { useEffect, useMemo } from "react";
import {
  capabilityById,
  ecosystem,
  zoneById,
  type Domain,
  type Product,
  type Relation
} from "@/app/data/ecosystem";
import {
  atlasNodeTypes,
  type CapabilityNodeData,
  type ZoneNodeData
} from "./atlas-nodes";

interface EcosystemGraphProps {
  selectedId: string;
  onSelect: (id: string) => void;
  activeProducts: Set<Product>;
  activeDomain: Domain | "all";
  query: string;
  focusIds?: string[];
}

function absoluteCenter(id: string) {
  const capability = capabilityById.get(id);
  if (!capability) return { x: 0, y: 0 };
  const zone = zoneById.get(capability.parentId);
  return {
    x:
      (zone?.position.x ?? 0) +
      capability.position.x +
      capability.size.width / 2,
    y:
      (zone?.position.y ?? 0) +
      capability.position.y +
      capability.size.height / 2
  };
}

function relationHandles(relation: Relation) {
  const source = absoluteCenter(relation.source);
  const target = absoluteCenter(relation.target);
  const dx = target.x - source.x;
  const dy = target.y - source.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { sourceHandle: "source-right", targetHandle: "target-left" }
      : { sourceHandle: "source-left", targetHandle: "target-right" };
  }

  return dy >= 0
    ? { sourceHandle: "source-bottom", targetHandle: "target-top" }
    : { sourceHandle: "source-top", targetHandle: "target-bottom" };
}

function FocusCamera({ focusIds }: { focusIds: string[] }) {
  const { fitView, getNodes } = useReactFlow();
  const focusKey = focusIds.join("|");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const allNodes = getNodes();
      const focusNodes = focusIds.length
        ? allNodes.filter((node) => focusIds.includes(node.id))
        : allNodes.filter((node) => node.type === "zone");

      if (!focusNodes.length) return;
      void fitView({
        nodes: focusNodes,
        padding: focusIds.length ? 0.28 : 0.08,
        duration: 700,
        maxZoom: focusIds.length <= 3 ? 1.04 : 0.82
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [fitView, focusIds, focusKey, getNodes]);

  return null;
}

function EcosystemGraphInner({
  selectedId,
  onSelect,
  activeProducts,
  activeDomain,
  query,
  focusIds = []
}: EcosystemGraphProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const focusSet = useMemo(() => new Set(focusIds), [focusIds]);

  const relatedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const relation of ecosystem.relations) {
      if (relation.source === selectedId) ids.add(relation.target);
      if (relation.target === selectedId) ids.add(relation.source);
    }
    return ids;
  }, [selectedId]);

  const nodes = useMemo(() => {
    const zoneNodes: Node<ZoneNodeData, "zone">[] = ecosystem.zones.map(
      (zone) => ({
        id: zone.id,
        type: "zone",
        position: zone.position,
        data: {
          zone,
          dimmed: !activeProducts.has(
            zone.id.replace("zone.", "") as Product
          )
        },
        style: {
          width: zone.size.width,
          height: zone.size.height
        },
        selectable: false,
        draggable: false,
        focusable: false,
        zIndex: -1
      })
    );

    const capabilityNodes: Node<CapabilityNodeData, "capability">[] =
      ecosystem.capabilities.map((capability) => {
        const searchable = [
          capability.label,
          capability.summary,
          capability.detail,
          capability.product,
          capability.runtime,
          capability.domain,
          ...capability.commands,
          ...capability.repos,
          ...capability.tags
        ]
          .join(" ")
          .toLowerCase();

        const queryMismatch =
          normalizedQuery.length > 0 && !searchable.includes(normalizedQuery);
        const domainMismatch =
          activeDomain !== "all" && capability.domain !== activeDomain;
        const focusMismatch =
          focusSet.size > 0 && !focusSet.has(capability.id);

        return {
          id: capability.id,
          type: "capability",
          parentId: capability.parentId,
          extent: "parent" as const,
          position: capability.position,
          data: {
            capability,
            selected: capability.id === selectedId,
            related: relatedIds.has(capability.id),
            dimmed: queryMismatch || domainMismatch || focusMismatch,
            onActivate: onSelect
          },
          style: {
            width: capability.size.width,
            height: capability.size.height
          },
          hidden: !activeProducts.has(capability.product),
          selectable: true,
          draggable: false,
          focusable: true,
          ariaLabel: `${capability.label}. ${capability.summary}`,
          zIndex: capability.focal ? 3 : 2
        };
      });

    return [...zoneNodes, ...capabilityNodes];
  }, [
    activeDomain,
    activeProducts,
    focusSet,
    normalizedQuery,
    onSelect,
    relatedIds,
    selectedId
  ]);

  const edges = useMemo(
    () =>
      ecosystem.relations.map((relation): Edge => {
        const source = capabilityById.get(relation.source);
        const target = capabilityById.get(relation.target);
        const hidden =
          !source ||
          !target ||
          !activeProducts.has(source.product) ||
          !activeProducts.has(target.product);
        const selected =
          relation.source === selectedId || relation.target === selectedId;
        const focused =
          focusSet.size === 0 ||
          (focusSet.has(relation.source) && focusSet.has(relation.target));
        const { sourceHandle, targetHandle } = relationHandles(relation);

        return {
          id: relation.id,
          source: relation.source,
          target: relation.target,
          sourceHandle,
          targetHandle,
          type: "smoothstep",
          hidden,
          label: focused || selected ? relation.label : undefined,
          className: [
            "atlas-edge",
            `atlas-edge--${relation.kind}`,
            selected ? "atlas-edge--selected" : "",
            !focused ? "atlas-edge--dimmed" : ""
          ]
            .filter(Boolean)
            .join(" "),
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 12,
            height: 12,
            color: selected
              ? "var(--atlas-line-strong)"
              : "var(--atlas-line)"
          },
          style: {
            stroke: selected
              ? "var(--atlas-line-strong)"
              : "var(--atlas-line)",
            strokeWidth: selected ? 1.8 : 1,
            opacity: !focused ? 0.12 : selected ? 1 : 0.5
          },
          labelStyle: {
            fill: "var(--atlas-text-tertiary)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.04em"
          },
          labelBgStyle: {
            fill: "var(--atlas-surface)",
            fillOpacity: 0.94
          },
          labelBgPadding: [5, 3],
          labelBgBorderRadius: 2,
          pathOptions: {
            borderRadius: 8,
            offset: 24
          }
        };
      }),
    [activeProducts, focusSet, selectedId]
  );

  return (
    <div
      className="atlas-canvas"
      role="region"
      aria-label="Interactive HQ ecosystem architecture graph"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={atlasNodeTypes}
        minZoom={0.24}
        maxZoom={1.5}
        defaultViewport={{ x: 36, y: 36, zoom: 0.42 }}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
        panOnDrag
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        selectionOnDrag={false}
        preventScrolling
        onlyRenderVisibleElements
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="var(--atlas-grid)"
          gap={32}
          lineWidth={0.6}
          variant={BackgroundVariant.Lines}
        />
        <Controls
          className="atlas-flow-controls"
          showInteractive={false}
          position="bottom-left"
        />
        <MiniMap
          className="atlas-minimap"
          position="bottom-right"
          pannable
          zoomable
          nodeBorderRadius={2}
          nodeColor={(node) =>
            node.type === "zone"
              ? "var(--atlas-surface)"
              : node.id === selectedId
                ? "var(--atlas-text-primary)"
                : "var(--atlas-text-muted)"
          }
          maskColor="var(--atlas-minimap-mask)"
        />
        <FocusCamera focusIds={focusIds} />
      </ReactFlow>
      <div className="atlas-canvas__hint" aria-hidden="true">
        DRAG TO PAN · SCROLL TO ZOOM · SELECT A SYSTEM
      </div>
    </div>
  );
}

export function EcosystemGraph(props: EcosystemGraphProps) {
  return (
    <ReactFlowProvider>
      <EcosystemGraphInner {...props} />
    </ReactFlowProvider>
  );
}
