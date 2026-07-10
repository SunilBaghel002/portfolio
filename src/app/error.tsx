"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-background)" }}
    >
      <div className="text-center max-w-md mx-auto px-6">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          Something went wrong
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={() => reset()} className="btn-primary">
          Try Again →
        </button>
      </div>
    </div>
  );
}