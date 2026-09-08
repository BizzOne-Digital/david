import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rethink Automotive Inc. | Dealership Marketing Solutions",
    template: "%s | Rethink Automotive Inc.",
  },
  description:
    "AI-powered and email-driven marketing systems for automotive dealerships.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen bg-obsidian text-white">{children}</body>
    </html>
  );
}
