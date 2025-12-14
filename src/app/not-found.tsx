// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-bold text-[#00f0ff] mb-4 font-display">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-white/60 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="
            inline-block px-6 py-3 
            bg-[#00f0ff] text-black 
            font-semibold rounded-lg
            hover:bg-[#00f0ff]/90 
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:ring-offset-2 focus:ring-offset-black
          "
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}