import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import ClientWrapper from "@/Components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DGovernor’sPlace",
  description: "Your go-to spot for events, dining, and relaxation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap everything in a client component */}
        <ClientWrapper>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
