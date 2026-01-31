"use client";

import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs tracking-widest text-text-secondary">
          FRAMEWORK OVERVIEW
        </span>

        <h1 className="font-mono text-7xl font-bold tracking-tighter text-text-primary md:text-9xl">
          HQ
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-xl leading-relaxed text-text-secondary md:text-2xl">
          A personal OS for orchestrating work across companies, workers, and
          AI.
        </p>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-muted">
          Built for Claude Code. Structure your context, define specialized
          workers, and let the Ralph loop execute your projects.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs tracking-wider">SCROLL</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
