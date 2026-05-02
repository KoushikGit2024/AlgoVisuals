import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoVisuals",
  description: "See algorithms think",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body 
        className="min-h-screen flex flex-col antialiased transition-colors duration-300" 
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        
        <Navbar />
        {/* Main layout container */}
        <div className="flex flex-row w-full h-screen">
          <Sidebar />
          <main className="flex-1 w-full overflow-y-auto h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}