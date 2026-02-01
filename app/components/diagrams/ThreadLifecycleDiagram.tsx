"use client";

import DiagramCanvas from "./primitives/DiagramCanvas";
import DiagramNode from "./primitives/DiagramNode";
import SequenceLane from "./primitives/SequenceLane";
import type { SequenceParticipant, SequenceMessage, SequenceNote } from "./primitives/types";
import { t } from "./primitives/theme";
import { motion } from "motion/react";

const participants: SequenceParticipant[] = [
  { id: "user", label: "User", x: 100 },
  { id: "orch", label: "Orchestrator", x: 280 },
  { id: "worker", label: "Worker", x: 460 },
  { id: "git", label: "Git", x: 620 },
  { id: "threads", label: "Threads", x: 780 },
];

const messages: SequenceMessage[] = [
  { from: "user", to: "orch", label: "/run worker skill", y: 90 },
  { from: "orch", to: "worker", label: "Load context + execute", y: 125 },
  { from: "worker", to: "worker", label: "Execute skill", y: 160 },
  { from: "worker", to: "git", label: "Commit changes", y: 195 },
  { from: "git", to: "worker", label: "commit hash", dashed: true, y: 225 },
  { from: "worker", to: "threads", label: "Save thread JSON", y: 260 },
  { from: "threads", to: "orch", label: "Checkpoint available", dashed: true, y: 295 },
  { from: "orch", to: "user", label: "Result + thread ID", dashed: true, y: 330 },
  // Session resume
  { from: "user", to: "orch", label: "/reanchor or /handoff", y: 400 },
  { from: "orch", to: "threads", label: "Load latest thread", y: 435 },
  { from: "threads", to: "orch", label: "Git state + worker state", dashed: true, y: 465 },
  { from: "orch", to: "user", label: "Context restored", dashed: true, y: 500 },
];

const note: SequenceNote = {
  over: ["user", "threads"],
  text: "Session Resume",
  y: 365,
  height: 24,
};

const partMap = new Map(participants.map((p) => [p.id, p]));

function SequenceArrow({ msg, delay }: { msg: SequenceMessage; delay: number }) {
  const fromP = partMap.get(msg.from)!;
  const toP = partMap.get(msg.to)!;
  const isSelf = msg.from === msg.to;

  if (isSelf) {
    // Self-call: small loop on right side
    const x = fromP.x;
    const loopW = 30;
    const d = `M ${x} ${msg.y} L ${x + loopW} ${msg.y} L ${x + loopW} ${msg.y + 20} L ${x} ${msg.y + 20}`;
    return (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay }}
      >
        <path
          d={d}
          fill="none"
          stroke={t.edgeStroke}
          strokeWidth={1.5}
          strokeDasharray={msg.dashed ? "6 4" : undefined}
          markerEnd="url(#arrowhead)"
        />
        <text
          x={x + loopW + 6}
          y={msg.y + 12}
          fill={t.edgeLabel}
          fontFamily={t.fontMono}
          fontSize={9}
          dominantBaseline="central"
        >
          {msg.label}
        </text>
      </motion.g>
    );
  }

  const x1 = fromP.x;
  const x2 = toP.x;
  const midX = (x1 + x2) / 2;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <line
        x1={x1}
        y1={msg.y}
        x2={x2}
        y2={msg.y}
        stroke={t.edgeStroke}
        strokeWidth={1.5}
        strokeDasharray={msg.dashed ? "6 4" : undefined}
        markerEnd="url(#arrowhead)"
      />
      <text
        x={midX}
        y={msg.y - 6}
        textAnchor="middle"
        fill={t.edgeLabel}
        fontFamily={t.fontMono}
        fontSize={9}
      >
        {msg.label}
      </text>
    </motion.g>
  );
}

function NoteBlock({ note, delay }: { note: SequenceNote; delay: number }) {
  const fromP = partMap.get(note.over[0])!;
  const toP = partMap.get(note.over[note.over.length - 1])!;
  const x = fromP.x - 40;
  const width = toP.x - fromP.x + 80;
  const h = note.height ?? 24;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <rect
        x={x}
        y={note.y}
        width={width}
        height={h}
        rx={4}
        fill={t.bgElevated}
        stroke={t.nodeStroke}
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text
        x={x + width / 2}
        y={note.y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={t.textSecondary}
        fontFamily={t.fontMono}
        fontSize={10}
        fontWeight={600}
      >
        {note.text}
      </text>
    </motion.g>
  );
}

export default function ThreadLifecycleDiagram() {
  const topY = 10;
  const bottomY = 530;

  return (
    <DiagramCanvas viewBox="0 0 880 550" ariaLabel="Thread lifecycle sequence diagram showing user, orchestrator, worker, git, and threads interaction">
      {participants.map((p, i) => (
        <SequenceLane
          key={p.id}
          {...p}
          topY={topY}
          bottomY={bottomY}
          delay={i * 0.08}
        />
      ))}
      <NoteBlock note={note} delay={0.5} />
      {messages.map((msg, i) => (
        <SequenceArrow key={i} msg={msg} delay={0.3 + i * 0.04} />
      ))}
    </DiagramCanvas>
  );
}
