"use client";

import { motion } from "motion/react";
import type { NodeDef } from "./types";
import { t } from "./theme";

const DEFAULT_W = 160;
const DEFAULT_H = 48;

interface DiagramNodeProps extends NodeDef {
  delay?: number;
}

export default function DiagramNode({
  x,
  y,
  width = DEFAULT_W,
  height = DEFAULT_H,
  label,
  sublabel,
  variant = "rounded",
  emphasis = false,
  delay = 0,
}: DiagramNodeProps) {
  const fill = emphasis ? t.nodeEmphasis : t.nodeFill;
  const stroke = emphasis ? t.nodeEmphasisStroke : t.nodeStroke;
  const textY = sublabel ? y + height / 2 - 6 : y + height / 2;
  const fontSize = label.length > 20 ? 11 : 12;

  return (
    <motion.g
      initial={{ opacity: 0, y: y + 6 }}
      animate={{ opacity: 1, y }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {variant === "circle" && (
        <circle
          cx={x + width / 2}
          cy={y + height / 2}
          r={6}
          fill={t.textMuted}
          stroke={stroke}
          strokeWidth={1}
        />
      )}

      {variant === "diamond" && (
        <>
          <polygon
            points={`${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height} ${x},${y + height / 2}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
          />
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill={t.textPrimary}
            fontFamily={t.fontMono}
            fontSize={fontSize}
          >
            {label}
          </text>
        </>
      )}

      {(variant === "rect" ||
        variant === "rounded" ||
        variant === "pill") && (
        <>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={variant === "pill" ? height / 2 : variant === "rounded" ? 8 : 2}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
          />
          <text
            x={x + width / 2}
            y={textY}
            textAnchor="middle"
            dominantBaseline="central"
            fill={t.textPrimary}
            fontFamily={t.fontMono}
            fontSize={fontSize}
            fontWeight={emphasis ? 600 : 400}
          >
            {label}
          </text>
          {sublabel && (
            <text
              x={x + width / 2}
              y={textY + 16}
              textAnchor="middle"
              dominantBaseline="central"
              fill={t.textMuted}
              fontFamily={t.fontMono}
              fontSize={10}
            >
              {sublabel}
            </text>
          )}
        </>
      )}
    </motion.g>
  );
}
