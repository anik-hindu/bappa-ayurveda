"use client";

import useScrolled from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop() {
  const visible = useScrolled(400);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "fixed right-8 bottom-8 z-(--z-toast)",
        "flex size-12 items-center justify-center",
        "rounded-full",
        "bg-btn-primary-bg text-btn-primary-text",
        "shadow-card",
        "transition-all duration-(--duration-normal)",
        "hover:bg-btn-primary-bg-hover",
        "hover:-translate-y-1 hover:shadow-hover",
        "focus-visible:ring-2 focus-visible:ring-gold",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
