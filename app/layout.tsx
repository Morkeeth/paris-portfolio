import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import ModelSwitcher from "../components/ModelSwitcher";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Whatever domain this lands on, OG URLs have to be absolute or nothing unfurls.
// Order: an explicit domain you set -> the Vercel production URL (always defined on
// Vercel) -> localhost for dev. Set NEXT_PUBLIC_SITE_URL once you pick a domain;
// nothing here hardcodes a name.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "oscar morke",
  description: "pm at ledger. i make things on nights and weekends, some of them win prizes.",
  keywords: ["Oscar Morke", "Product Manager", "Ledger", "AI Agents", "Hackathons"],
  authors: [{ name: "Oscar Morke" }],
  openGraph: {
    title: "oscar morke",
    description: "pm at ledger. i make things on nights and weekends, some of them win prizes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@morkeeth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${jetbrainsMono.variable} ${dmSans.variable} ${dmSerif.variable} antialiased`}>
        <ModelSwitcher />
        <main className="min-h-screen pt-[52px] md:pt-0 md:pl-[196px]">{children}</main>
      </body>
    </html>
  );
}
