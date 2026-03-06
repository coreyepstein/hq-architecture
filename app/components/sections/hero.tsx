"use client";

import { motion } from "motion/react";
import { GlitchText } from "@/app/components/glitch-text";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-indigo/[0.03] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent-glow px-4 py-1.5 font-mono text-xs tracking-widest text-accent">
          PERSONAL OS FOR AI
        </span>

        <h1 className="font-mono text-6xl font-bold tracking-tighter text-text-primary md:text-8xl lg:text-9xl">
          <GlitchText text="HQ" duration={600} delay={300} />
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-text-secondary md:text-2xl">
          Orchestrate work across companies, workers, and AI — from a single
          terminal.
        </p>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-muted">
          Built for{" "}
          <span className="text-accent">Claude Code</span>. Structure your
          context, define specialized workers, and let the Ralph loop execute
          your projects.
        </p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#install"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-2.5 font-mono text-sm text-text-primary transition-all hover:bg-accent/20 hover:border-accent/50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            npx create-hq
          </a>
          <a
            href="#what-is-hq"
            className="inline-flex items-center gap-2 rounded-full border border-border-accent px-6 py-2.5 font-mono text-sm text-text-secondary transition-all hover:border-accent/30 hover:text-text-primary"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs tracking-wider">SCROLL</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </motion.div>
      </motion.div>

      {/* HUD corner brackets on hero */}
      <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-accent/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-accent/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-accent/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-accent/20 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
