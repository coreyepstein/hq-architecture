"use client";

import { useEffect, useRef, useState, useId } from "react";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({
  chart,
  className = "",
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const uniqueId = useId().replace(/:/g, "-");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            darkMode: true,
            background: "#111113",
            primaryColor: "#27272a",
            primaryTextColor: "#fafafa",
            primaryBorderColor: "rgba(255, 255, 255, 0.12)",
            secondaryColor: "#18181b",
            secondaryTextColor: "#a1a1aa",
            tertiaryColor: "#09090b",
            lineColor: "#52525b",
            textColor: "#fafafa",
            mainBkg: "#18181b",
            nodeBorder: "rgba(255, 255, 255, 0.12)",
            clusterBkg: "#111113",
            clusterBorder: "rgba(255, 255, 255, 0.08)",
            titleColor: "#fafafa",
            edgeLabelBackground: "#111113",
            nodeTextColor: "#fafafa",
            actorBkg: "#18181b",
            actorBorder: "rgba(255, 255, 255, 0.12)",
            actorTextColor: "#fafafa",
            actorLineColor: "#52525b",
            signalColor: "#fafafa",
            signalTextColor: "#fafafa",
            labelBoxBkgColor: "#111113",
            labelBoxBorderColor: "rgba(255, 255, 255, 0.12)",
            labelTextColor: "#fafafa",
            loopTextColor: "#a1a1aa",
            noteBkgColor: "#18181b",
            noteTextColor: "#fafafa",
            noteBorderColor: "rgba(255, 255, 255, 0.12)",
            activationBkgColor: "#18181b",
            activationBorderColor: "#52525b",
            sequenceNumberColor: "#09090b",
          },
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 16,
          },
          sequence: {
            diagramMarginX: 16,
            diagramMarginY: 16,
            actorMargin: 60,
            messageMargin: 40,
          },
        });

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${uniqueId}`,
          chart
        );
        if (!cancelled) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
      }
    }

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [chart, mounted, uniqueId]);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-border bg-bg-card p-12 ${className}`}
      >
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-text-muted border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-wrapper overflow-x-auto rounded-xl border border-border bg-bg-card p-6 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
