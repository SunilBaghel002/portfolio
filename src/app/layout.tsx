// app/layout.tsx
import type { Metadata, Viewport } from "next";
// Google Fonts removed for performance and to fix build errors
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/providers/ClientProviders";

const inter = { variable: "font-sans" };
const spaceGrotesk = { variable: "font-display" };
const jetbrainsMono = { variable: "font-mono" };

const siteConfig = {
  name: "Sunil Baghel",
  title: "Sunil Baghel | Full Stack Developer",
  description:
    "Full-stack developer passionate about building impactful, scalable systems. 8× hackathon winner with expertise in React, Next.js, Node.js, and cloud technologies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sunilbaghel.dev",
  ogImage: "/og-image.jpg",
  twitterHandle: "@sunilbaghel",
  email: "contact@sunilbaghel.dev",
  links: {
    github: "https://github.com/SunilBaghel002",
    linkedin: "https://linkedin.com/in/sunilbaghel",
    twitter: "https://twitter.com/sunilbaghel",
  },
};

export const metadata: Metadata = {
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
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
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  applicationName: siteConfig.name,
  category: "technology",
};

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

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: "Full Stack Developer",
    description: siteConfig.description,
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

function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[9999] -translate-y-full focus:translate-y-0 bg-[#00f0ff] text-black px-4 py-2 font-medium transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:ring-offset-2 focus:ring-offset-black"
    >
      Skip to main content
    </a>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white min-h-screen selection:bg-[#00f0ff]/30 selection:text-white`}
        suppressHydrationWarning
      >
        <SkipToContent />
        <div className="noise pointer-events-none" aria-hidden="true" />
        <ClientProviders>
          <Header />
          <main id="main-content" className="relative z-10" role="main">
            {children}
          </main>
          <Footer />
        </ClientProviders>
        <noscript>
          <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-black p-4 text-center z-50">
            This website works best with JavaScript enabled.
          </div>
        </noscript>
      </body>
    </html>
  );
}