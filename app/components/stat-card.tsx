"use client";

import { useInView } from "react-intersection-observer";

interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

export default function StatCard({ value, label, description }: StatCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-border bg-bg-card p-5 transition-all duration-500 hover:border-accent/20 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <span className="block font-mono text-2xl font-bold text-accent">
        {value}
      </span>
      <span className="mt-1 block font-mono text-sm font-semibold text-text-primary">
        {label}
      </span>
      <span className="mt-1 block text-xs text-text-muted">{description}</span>
    </div>
  );
}
