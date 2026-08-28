"use client";

import { announcements } from "@/data/home";
import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

const SLIDE_DURATION = 4500;

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      if (
        document.visibilityState === "visible" &&
        !prefersReducedMotionRef.current
      ) {
        setActiveIndex((current) => (current + 1) % announcements.length);
      }
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused]);

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return (
    <div
      role="region"
      aria-label="Announcements"
      className={cn(
        "border-b border-white/10",
        "bg-bg-inverse text-text-inverse",
      )}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          resume();
        }
      }}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex min-h-10 items-center justify-center",
            "px-4 py-2.5",
            "sm:min-h-11 sm:px-6 sm:py-2",
          )}
        >
          <p
            className={cn(
              "w-full max-w-full text-center wrap-break-word",
              "text-[0.8125rem] sm:text-caption md:text-body",
              "font-medium",
              "leading-snug sm:leading-relaxed",
              "tracking-[0.005em]",
              "text-white",
            )}
          >
            {announcements[activeIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
