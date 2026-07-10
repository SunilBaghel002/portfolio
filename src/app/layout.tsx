import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/providers/ClientProviders";

const siteConfig = {
  name: "Sunil Baghel",
  title: "Sunil Baghel — The Builder's Journal",
  description:
    "Full-stack developer building fintech platforms, SaaS products, and desktop applications. 2× National Hackathon Winner. Co-Founder of Forgeweb. From a factory floor to shipping code in 24 months.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sunilbaghel.vercel.app",
  ogImage: "/og-image.jpg",
  twitterHandle: "@sunilbaghel",
  email: "sunil@forgeweb.in",
  links: {
    github: "https://github.com/SunilBaghel002",
    linkedin: "https://linkedin.com/in/sunil-baghel-140a60348",
    twitter: "https://twitter.com/sunilbaghel",
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sunil Baghel",
    "Full Stack Developer",
    "The Builder's Journal",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "JavaScript",
    "Hackathon Winner",
    "Forgeweb",
    "Fintech Developer",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "The Builder's Journal",
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
  applicationName: "The Builder's Journal",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#F5F1EA" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
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
      "Fintech",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Forgeweb",
      url: "https://forgeweb.in",
    },
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
    <a href="#main-content" className="skip-to-content">
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body
        className="font-sans antialiased min-h-screen"
        style={{
          background: "#F5F1EA",
          color: "#1A1A1A",
        }}
        suppressHydrationWarning
      >
        <SkipToContent />
        <div className="paper-texture" aria-hidden="true" />
        <ClientProviders>
          <Header />
          <main id="main-content" className="relative" role="main">
            {children}
          </main>
          <Footer />
        </ClientProviders>
        <noscript>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#E8C547",
              color: "#1A1A1A",
              padding: "1rem",
              textAlign: "center",
              zIndex: 50,
              fontFamily: "Inter, sans-serif",
            }}
          >
            This website works best with JavaScript enabled.
          </div>
        </noscript>
      </body>
    </html>
  );
}