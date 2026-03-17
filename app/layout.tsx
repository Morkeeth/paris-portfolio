import type { Metadata } from "next";
import { JetBrains_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paris-portfolio-sigma.vercel.app"),
  title: "Oscar Alexander Mörke",
  description: "Staff Product Manager at Ledger. Building calm products for wild markets.",
  keywords: ["Product Manager", "Ledger", "Oscar Mörke", "Web3", "Crypto", "Paris"],
  authors: [{ name: "Oscar Alexander Mörke" }],
  openGraph: {
    title: "Oscar Alexander Mörke",
    description: "Staff Product Manager at Ledger. Building calm products for wild markets.",
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
    <html lang="en" className="smooth-scroll bg-[#F0EEE6]">
      <body className={`${jetbrainsMono.variable} ${crimsonText.variable} antialiased bg-[#F0EEE6] text-[#333333]`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
