"use client";

import { useState, useCallback } from "react";

interface TerminalCardProps {
  title: string;
  language?: string;
  children: string;
}

export function TerminalCard({ title, language = "yaml", children }: TerminalCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg-card">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-green/40" />
          </div>
          <span className="font-mono text-xs text-text-muted">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-text-muted">{language}</span>
          <button
            onClick={handleCopy}
            className="rounded-md px-2 py-0.5 font-mono text-[10px] text-text-muted transition-colors hover:bg-white/5 hover:text-text-secondary"
          >
            {copied ? "copied!" : "copy"}
          </button>
        </div>
      </div>
      {/* Code area */}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-text-secondary">
        <code>{children}</code>
      </pre>
    </div>
  );
}
