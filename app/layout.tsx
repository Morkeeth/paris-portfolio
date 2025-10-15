import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import CursorTrail from "@/components/effects/CursorTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paris // Staff PM @ Ledger",
  description: "Poetic mover. Staff Product Manager at Ledger charging the tier one roadmap. A portfolio of visions, code, and creativity.",
  keywords: ["Product Manager", "Ledger", "Portfolio", "Paris", "Web Development"],
  authors: [{ name: "Paris" }],
  openGraph: {
    title: "Paris // Staff PM @ Ledger",
    description: "Poetic mover. Staff Product Manager at Ledger charging the tier one roadmap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} ${spaceMono.variable} antialiased`}
      >
        <CursorTrail />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
