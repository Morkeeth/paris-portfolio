import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
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
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
