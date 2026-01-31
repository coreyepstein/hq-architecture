"use client";

import { useInView } from "react-intersection-observer";

interface StatCardProps {
  label: string;
  description: string;
}

export default function StatCard({ label, description }: StatCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-border bg-bg-card p-5 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <span className="block font-mono text-sm font-semibold text-text-primary">
        {label}
      </span>
      <span className="mt-1 block text-xs text-text-muted">{description}</span>
    </div>
  );
}
