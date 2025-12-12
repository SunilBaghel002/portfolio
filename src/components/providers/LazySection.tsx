"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    className?: string;
    placeholder?: ReactNode;
    threshold?: number;
    rootMargin?: string;
}

export default function LazySection({
    children,
    className = "",
    placeholder = <SectionPlaceholder />,
    threshold = 0.1,
    rootMargin = "100px",
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setHasLoaded(true);
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
            {hasLoaded ? children : placeholder}
        </div>
    );
}

function SectionPlaceholder() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}