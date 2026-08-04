"use client";

import { cn } from "@/lib/cn";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={cn(
        "z-toast fixed right-6 bottom-6",
        "flex h-12 w-12 items-center justify-center",
        "rounded-full",
        "bg-btn-primary-bg text-btn-primary-text",
        "shadow-card",
        "duration-normal transition-all",
        "hover:bg-btn-primary-bg-hover",
        "hover:shadow-hover",
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
