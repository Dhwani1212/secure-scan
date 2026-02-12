import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SurgicalGrid } from "@/components/ui/surgical-grid";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SecureScan | The Operating System for AI Agents",
  description: "Deploy, orchestrate, and govern intelligent agents securely alongside your team and tools.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased text-slate-900`}
      >
        <SurgicalGrid />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
