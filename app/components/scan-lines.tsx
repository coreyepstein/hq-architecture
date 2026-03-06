"use client";

import { useState, useEffect } from "react";

export function ScanLines({
  opacity = 3,
  spacing = 3,
}: {
  opacity?: number;
  spacing?: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent ${spacing - 1}px,
          rgba(0, 0, 0, ${opacity / 100}) ${spacing - 1}px,
          rgba(0, 0, 0, ${opacity / 100}) ${spacing}px
        )`,
      }}
    />
  );
}
