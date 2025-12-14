// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to monitoring service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-bold text-[#00f0ff] mb-4">Oops!</h1>
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Something went wrong
                </h2>
                <p className="text-white/60 mb-8">
                    {error.message || "An unexpected error occurred"}
                </p>
                <button
                    onClick={reset}
                    className="
            px-6 py-3 
            bg-[#00f0ff] text-black 
            font-semibold rounded-lg
            hover:bg-[#00f0ff]/90 
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:ring-offset-2 focus:ring-offset-black
          "
                >
                    Try again
                </button>
            </div>
        </div>
    );
}