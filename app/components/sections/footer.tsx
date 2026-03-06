"use client";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/indigoai-us/hq" },
  { label: "npx create-hq", href: "https://www.npmjs.com/package/create-hq" },
  { label: "Ralph Method", href: "https://github.com/coreyepstein/ralph-methodology" },
  { label: "Indigo", href: "https://getindigo.ai" },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="font-mono text-lg font-bold text-text-primary tracking-tighter">
              HQ
            </span>
            <p className="mt-1 text-xs text-text-muted">
              Your Personal OS for AI
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted transition-colors hover:text-text-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-text-muted">
            Built by{" "}
            <a
              href="https://getindigo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              Indigo AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
