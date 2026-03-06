"use client";

import { useState, useEffect } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { id: "what-is-hq", label: "What is HQ?" },
      { id: "use-cases", label: "Use Cases" },
    ],
  },
  {
    label: "Architecture",
    items: [
      { id: "structure", label: "Structure" },
      { id: "companies", label: "Companies" },
      { id: "workers", label: "Workers" },
      { id: "commands", label: "Commands" },
      { id: "knowledge", label: "Knowledge" },
    ],
  },
  {
    label: "Execution",
    items: [
      { id: "ralph", label: "Ralph Loop" },
      { id: "state-machine", label: "State" },
      { id: "skills", label: "Skills" },
      { id: "threads", label: "Threads" },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        {/* Logo */}
        <a href="#" className="font-mono text-lg font-bold text-text-primary tracking-tighter">
          HQ
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <button className="font-mono text-xs tracking-wider text-text-muted transition-colors hover:text-text-secondary">
                {group.label}
              </button>
              <div className="absolute top-full right-0 mt-2 hidden min-w-[160px] rounded-lg border border-border bg-bg-card/95 backdrop-blur-xl p-2 shadow-xl group-hover:block">
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:bg-accent-glow hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <a
            href="https://github.com/coreyepstein/hq-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-xs text-text-primary transition-all hover:bg-accent/20"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-5 bg-text-secondary transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-text-secondary transition-all ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-text-secondary transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-6xl px-5 py-4">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <span className="mb-2 block font-mono text-[10px] tracking-widest text-text-muted">
                  {group.label.toUpperCase()}
                </span>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
            <a
              href="https://github.com/coreyepstein/hq-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-xs text-text-primary"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
