import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
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
  title: "HQ Architecture",
  description:
    "A personal OS for orchestrating work across companies, workers, and AI.",
  openGraph: {
    title: "HQ Architecture",
    description:
      "A personal OS for orchestrating work across companies, workers, and AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HQ Architecture",
    description:
      "A personal OS for orchestrating work across companies, workers, and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-bg antialiased">{children}</body>
    </html>
  );
}
