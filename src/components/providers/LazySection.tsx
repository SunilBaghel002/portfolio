// components/providers/LazySection.tsx
"use client";

import { useEffect, useRef, useState, ReactNode, memo } from "react";

interface LazySectionProps {
    children: ReactNode;
    className?: string;
    placeholder?: ReactNode;
    threshold?: number;
    rootMargin?: string;
}

function LazySection({
    children,
    className = "",
    placeholder,
    threshold = 0.1,
    rootMargin = "200px", // Increased for earlier loading
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Use passive intersection observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Use requestIdleCallback for non-blocking load
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(() => setIsVisible(true), { timeout: 300 });
                    } else {
                        setTimeout(() => setIsVisible(true), 0);
                    }
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return (
        <div ref={ref} className={className}>
            {isVisible ? children : (placeholder || <SectionPlaceholder />)}
        </div>
    );
}

// Memoize to prevent unnecessary re-renders
export default memo(LazySection);

function SectionPlaceholder() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#00f0ff]/50 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}