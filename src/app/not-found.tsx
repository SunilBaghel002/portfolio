"use client";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="text-center">
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: 900,
            color: "var(--color-text-primary)",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
            marginBottom: "2rem",
          }}
        >
          This page doesn&apos;t exist in the journal.
        </p>
        <a href="/" className="btn-primary">
          Back to Chapter One →
        </a>
      </div>
    </div>
  );
}