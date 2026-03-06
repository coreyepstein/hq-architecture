import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScanLines } from "@/app/components/scan-lines";
import Header from "@/app/components/header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = "https://hq-cli.getindigo.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HQ — Your Personal OS for AI",
  description:
    "Orchestrate work across companies, workers, and AI from a single terminal. Built for Claude Code.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "HQ — Your Personal OS for AI",
    description:
      "Orchestrate work across companies, workers, and AI from a single terminal. Built for Claude Code.",
    type: "website",
    url: siteUrl,
    siteName: "HQ",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HQ — Your Personal OS for AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HQ — Your Personal OS for AI",
    description:
      "Orchestrate work across companies, workers, and AI from a single terminal. Built for Claude Code.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "HQ",
              applicationCategory: "DeveloperApplication",
              description:
                "A personal OS for orchestrating work across companies, workers, and AI. Built for Claude Code.",
              url: siteUrl,
              operatingSystem: "Cross-platform",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-bg antialiased">
        <ScanLines opacity={2} spacing={3} />
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
