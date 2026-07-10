"use client";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#C1440E]/30 border-t-[#C1440E] rounded-full animate-spin" />
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}