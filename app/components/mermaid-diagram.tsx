"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface MermaidDiagramProps {
  chart: string;
  ariaLabel?: string;
}

export default function MermaidDiagram({ chart, ariaLabel }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        darkMode: true,
        fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, monospace',
        sequence: {
          actorMargin: 60,
          messageFontSize: 11,
          noteFontSize: 10,
          actorFontSize: 12,
          messageAlign: "center",
          mirrorActors: false,
          bottomMarginAdj: 2,
          useMaxWidth: true,
        },
        themeVariables: {
          // Backgrounds
          mainBkg: "#18181b",
          actorBkg: "#18181b",
          actorBorder: "#3f3f46",
          noteBkgColor: "#27272a",
          noteBorderColor: "#3f3f46",
          activationBkgColor: "#27272a",
          activationBorderColor: "#3f3f46",

          // Text
          actorTextColor: "#fafafa",
          noteTextColor: "#a1a1aa",
          signalTextColor: "#a1a1aa",

          // Lines
          signalColor: "#52525b",
          sequenceNumberColor: "#a1a1aa",
          actorLineColor: "#3f3f46",

          // General
          lineColor: "#3f3f46",
          textColor: "#a1a1aa",
          primaryColor: "#18181b",
          primaryBorderColor: "#3f3f46",
          primaryTextColor: "#fafafa",
          secondaryColor: "#27272a",
          tertiaryColor: "#111113",

          // Font
          fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, monospace',
          fontSize: "12px",
        },
      });

      if (cancelled || !containerRef.current) return;

      const id = `mermaid-${Date.now()}`;
      const { svg } = await mermaid.render(id, chart);

      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = svg;
      setRendered(true);
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: rendered ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mermaid-wrapper overflow-hidden rounded-xl border border-border bg-bg-card p-4"
      role="img"
      aria-label={ariaLabel}
    >
      <div ref={containerRef} className="flex justify-center" />
    </motion.div>
  );
}
