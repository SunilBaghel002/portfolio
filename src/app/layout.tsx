// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/providers/ClientProviders";

// ============================================
// Font Configuration - Optimized Loading
// ============================================
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font load
  variable: "--font-sans",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: false, // Less critical, can load later
  fallback: ["Consolas", "Monaco", "monospace"],
});

// ============================================
// Site Configuration
// ============================================
const siteConfig = {
  name: "Sunil Baghel",
  title: "Sunil Baghel | Full Stack Developer",
  description:
    "Full-stack developer passionate about building impactful, scalable systems. 8× hackathon winner with expertise in React, Next.js, Node.js, and cloud technologies.",
  url: "https://sunilbaghel.dev", // Replace with your actual domain
  ogImage: "/og-image.jpg", // Add your OG image
  twitterHandle: "@sunilbaghel", // Replace with your handle
  email: "contact@sunilbaghel.dev",
  links: {
    github: "https://github.com/SunilBaghel002",
    linkedin: "https://linkedin.com/in/sunilbaghel",
    twitter: "https://twitter.com/sunilbaghel",
  },
};

// ============================================
// Metadata Configuration
// ============================================
export const metadata: Metadata = {
  // Basic
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sunil Baghel",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Web Developer",
    "Portfolio",
    "Hackathon Winner",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Favicon & Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Full Stack Developer Portfolio`,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Canonical URL
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },

  // App-specific
  applicationName: siteConfig.name,
  category: "technology",
};

// ============================================
// Viewport Configuration
// ============================================
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

// ============================================
// Structured Data (JSON-LD)
// ============================================
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full Stack Developer",
    description: siteConfig.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "Web Development",
      "Full Stack Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// ============================================
// Skip Navigation Link (Accessibility)
// ============================================
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        fixed top-0 left-0 z-[9999] 
        -translate-y-full focus:translate-y-0
        bg-[#00f0ff] text-black 
        px-4 py-2 font-medium
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:ring-offset-2 focus:ring-offset-black
      "
    >
      Skip to main content
    </a>
  );
}

// ============================================
// Main Layout Component
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning // Prevents hydration warnings from browser extensions
    >
      <head>
        {/* Structured Data */}
        <JsonLd />

        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>

      <body
        className={`
          ${inter.variable} 
          ${spaceGrotesk.variable} 
          ${jetbrainsMono.variable} 
          font-sans antialiased
          bg-black text-white
          min-h-screen
          selection:bg-[#00f0ff]/30 selection:text-white
        `}
        suppressHydrationWarning
      >
        {/* Accessibility: Skip Navigation */}
        <SkipToContent />

        {/* Noise Overlay - CSS only, no JS */}
        <div
          className="noise pointer-events-none"
          aria-hidden="true"
        />

        {/* Client-side providers (cursor, particles, etc.) */}
        <ClientProviders>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main
            id="main-content"
            className="relative z-10"
            role="main"
          >
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </ClientProviders>

        {/* Noscript fallback */}
        <noscript>
          <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-black p-4 text-center z-50">
            This website works best with JavaScript enabled.
          </div>
        </noscript>
      </body>
    </html>
  );
}