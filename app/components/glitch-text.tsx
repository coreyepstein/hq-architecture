"use client";

import { useState, useEffect, useCallback } from "react";

const GLITCH_CHARS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function GlitchText({
  text,
  className = "",
  duration = 800,
  delay = 200,
  glow = true,
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  glow?: boolean;
}) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  const scrambleReveal = useCallback(
    (target: string, onUpdate: (t: string) => void, onComplete: () => void) => {
      const startTime = Date.now();
      const chars = target.split("");

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const resolvedCount = Math.floor(progress * chars.length);

        const result = chars
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolvedCount) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("");

        onUpdate(result);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          onUpdate(target);
          onComplete();
        }
      };

      requestAnimationFrame(animate);
    },
    [duration]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      scrambleReveal(text, setDisplay, () => setDone(true));
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, scrambleReveal]);

  return (
    <span
      className={className}
      style={
        glow && !done
          ? {
              textShadow:
                "0 0 30px rgba(129, 140, 248, 0.6), 0 0 60px rgba(129, 140, 248, 0.3)",
            }
          : glow
            ? {
                textShadow:
                  "0 0 20px rgba(129, 140, 248, 0.3), 0 0 40px rgba(129, 140, 248, 0.1)",
              }
            : undefined
      }
    >
      {display}
    </span>
  );
}
