"use client";

import { motion } from "motion/react";
import type { SequenceParticipant } from "./types";
import { t } from "./theme";

interface SequenceLaneProps extends SequenceParticipant {
  topY: number;
  bottomY: number;
  width?: number;
  delay?: number;
}

export default function SequenceLane({
  x,
  label,
  topY,
  bottomY,
  width = 100,
  delay = 0,
}: SequenceLaneProps) {
  const headerH = 36;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Header box */}
      <rect
        x={x - width / 2}
        y={topY}
        width={width}
        height={headerH}
        rx={6}
        fill={t.nodeFill}
        stroke={t.nodeStroke}
        strokeWidth={1}
      />
      <text
        x={x}
        y={topY + headerH / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={t.textPrimary}
        fontFamily={t.fontMono}
        fontSize={11}
        fontWeight={500}
      >
        {label}
      </text>
      {/* Lifeline */}
      <line
        x1={x}
        y1={topY + headerH}
        x2={x}
        y2={bottomY}
        stroke={t.nodeStroke}
        strokeWidth={1}
        strokeDasharray="4 3"
      />
    </motion.g>
  );
}
