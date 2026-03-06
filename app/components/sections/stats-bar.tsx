"use client";

import StatCard from "@/app/components/stat-card";
import { stats } from "@/app/data/hq-data";

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-bg-card/30 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-5 md:px-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            description={stat.description}
          />
        ))}
      </div>
    </section>
  );
}
