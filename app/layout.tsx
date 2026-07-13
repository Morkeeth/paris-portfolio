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

export const metadata: Metadata = {
  metadataBase: new URL("https://oscarmorke.com"),
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
