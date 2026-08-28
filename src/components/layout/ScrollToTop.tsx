"use client";

import useScrolled from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop() {
  const visible = useScrolled(400);

  const handleScrollToTop = () => {
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
      onClick={handleScrollToTop}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-4 bottom-4 z-(--z-toast)",
        "flex size-11 items-center justify-center",
        "rounded-full",
        "bg-btn-primary-bg text-btn-primary-text",
        "shadow-card",
        "transition-[opacity,transform,background-color,box-shadow]",
        "duration-(--duration-normal)",
        "ease-default",
        "hover:bg-btn-primary-bg-hover",
        "hover:-translate-y-1 hover:shadow-hover",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-gold",
        "motion-reduce:transition-none",
        "motion-reduce:hover:transform-none",
        "sm:right-6 sm:bottom-6",
        "md:right-8 md:bottom-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUpIcon aria-hidden="true" className="size-5" />
    </button>
  );
}
