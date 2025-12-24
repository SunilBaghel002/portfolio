// app/achievements/page.tsx
import { Suspense } from "react";
import Achievements from "@/components/sections/Achievements";

function LoadingFallback() {
  return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="text-white/50">Loading achievements...</div>
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <div className="min-h-screen pt-32">
      <Suspense fallback={<LoadingFallback />}>
        <Achievements />
      </Suspense>
    </div>
  );
}