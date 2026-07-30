import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = "https://hq.getindigo.ai";
const title = "HQ System Atlas — Core, Cloud & Pro";
const description =
  "A navigable systems map of HQ Core, HQ Cloud, HQ Pro, and the product surfaces that connect them.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: "HQ System Atlas",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HQ System Atlas — Core, Cloud, and Pro"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"]
  },
  alternates: {
    canonical: siteUrl
  }
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080909",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "HQ System Atlas",
              applicationCategory: "DeveloperApplication",
              description,
              url: siteUrl,
              operatingSystem: "Cross-platform"
            })
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
