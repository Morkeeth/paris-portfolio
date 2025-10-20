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
  title: "Oscar // Staff PM @ Ledger",
  description: "Bald, bold, and building products. Staff Product Manager at Ledger. Tennis player. Weekend DJ. Claude-aesthetic portfolio.",
  keywords: ["Product Manager", "Ledger", "Portfolio", "Oscar", "Tennis", "DJ", "Web Development"],
  authors: [{ name: "Oscar" }],
  openGraph: {
    title: "Oscar // Staff PM @ Ledger",
    description: "Bald, bold, and building products. Staff Product Manager at Ledger. Tennis player. Weekend DJ.",
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
