"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  badge,
  children,
  className = "",
}: SectionWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id={id} ref={ref} className={`py-20 md:py-28 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-5 md:px-8"
      >
        {(badge || title || subtitle) && (
          <div className="mb-12">
            {badge && (
              <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs tracking-wider text-text-muted">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl text-lg text-text-secondary">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
