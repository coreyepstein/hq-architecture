"use client";

import { motion } from "motion/react";
import type { GroupDef } from "./types";
import { t } from "./theme";

interface DiagramGroupProps extends GroupDef {
  delay?: number;
}

export default function DiagramGroup({
  x,
  y,
  width,
  height,
  label,
  dashed = true,
  delay = 0,
}: DiagramGroupProps) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={t.groupFill}
        stroke={t.groupStroke}
        strokeWidth={1}
        strokeDasharray={dashed ? "6 4" : undefined}
      />
      <text
        x={x + 14}
        y={y + 20}
        fill={t.textSecondary}
        fontFamily={t.fontMono}
        fontSize={12}
        fontWeight={600}
      >
        {label}
      </text>
    </motion.g>
  );
}
