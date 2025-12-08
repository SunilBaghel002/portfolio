import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/providers/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Sunil Baghel | Full Stack Developer",
  description: "Full-stack developer passionate about building impactful, scalable systems. 8× hackathon winner.",
  keywords: ["developer", "portfolio", "react", "next.js", "full stack", "hackathon winner"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {/* Noise overlay */}
        <div className="noise" />

        {/* Client-side providers (cursor, particles, etc.) */}
        <ClientProviders>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="relative z-10">{children}</main>

          {/* Footer */}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}