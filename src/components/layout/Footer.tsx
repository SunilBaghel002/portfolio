import Monogram from "@/components/ui/Monogram";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <footer
      className="relative"
      style={{ background: "var(--color-background)" }}
    >
      {/* Double line divider */}
      <div className="container-editorial">
        <div className="divider-double" />
      </div>

      {/* Main footer content */}
      <div className="container-editorial py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left */}
          <div className="text-center md:text-left">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-primary)",
              }}
            >
              The Builder&apos;s Journal
            </p>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
                letterSpacing: "0.05em",
              }}
            >
              © {currentYear} Sunil Baghel
            </p>
          </div>

          {/* Center - Monogram */}
          <div className="flex justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                border: "1.5px solid var(--color-border)",
              }}
            >
              <Monogram size={30} className="text-[#1A1A1A]" bgCutoutColor="#F5F1EA" />
            </div>
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <p
              className="text-xs mb-1"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-text-secondary)",
              }}
            >
              Made with ❤️ in India
            </p>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-text-muted)",
              }}
            >
              Built with Next.js + coffee
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-4"
        style={{
          borderTop: "1px solid var(--color-border-light)",
        }}
      >
        <div className="container-editorial">
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
            }}
          >
            volume 03 · issue 01 · july 2026 · last updated: {lastUpdated} ·
            built for humans, not algorithms
          </p>
        </div>
      </div>
    </footer>
  );
}