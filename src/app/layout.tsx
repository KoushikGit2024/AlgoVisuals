import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AlgoVisuals",
    template: "%s — AlgoVisuals",
  },
  description: "See algorithms evolve. Interactive DSA visualization platform.",
  keywords: ["algorithms", "data structures", "visualization", "DSA", "learning"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        <Navbar />

        {/* Below navbar: sidebar + main scroll area */}
        <div className="flex flex-1 w-full overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
          <Sidebar />
          <main className="flex-1 overflow-y-auto h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}