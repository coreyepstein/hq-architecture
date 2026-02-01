"use client";

import { ReactNode } from "react";
import { t } from "./theme";

interface DiagramCanvasProps {
  viewBox: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function DiagramCanvas({
  viewBox,
  children,
  className = "",
  ariaLabel = "Architecture diagram",
}: DiagramCanvasProps) {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-border bg-bg-card p-6 ${className}`}
    >
      <svg
        viewBox={viewBox}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={t.arrowFill} />
          </marker>
          <marker
            id="arrowhead-muted"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={t.textMuted} />
          </marker>
        </defs>
        {children}
      </svg>
    </div>
  );
}
