// app/loading.tsx
export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
                {/* Animated Logo or Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-2 border-[#00f0ff]/20 rounded-full" />
                    <div className="absolute inset-0 border-2 border-transparent border-t-[#00f0ff] rounded-full animate-spin" />
                </div>
                <p className="text-white/50 text-sm font-mono">Loading...</p>
            </div>
        </div>
    );
}