import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "HQ — Your Personal OS for AI",
  description:
    "Orchestrate work across companies, workers, and AI from a single terminal. Built for Claude Code.",
  openGraph: {
    title: "HQ — Your Personal OS for AI",
    description:
      "Orchestrate work across companies, workers, and AI from a single terminal. Built for Claude Code.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HQ — Your Personal OS for AI",
    description:
      "Orchestrate work across companies, workers, and AI from a single terminal. Built for Claude Code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-bg antialiased">
        <ScanLines opacity={2} spacing={3} />
        <Header />
        {children}
      </body>
    </html>
  );
}
