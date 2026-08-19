"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";
import { announcements } from "@/data/home"


const SLIDE_DURATION = 4500;
const TRANSITION_DURATION = 300;

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const slideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearTimers = () => {
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current);
      slideTimeoutRef.current = null;
    }

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    clearTimers();

    if (isPaused || prefersReducedMotion) {
      return;
    }

    slideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);

      transitionTimeoutRef.current = setTimeout(() => {
        setActiveIndex((current) => (current + 1) % announcements.length);

        setIsVisible(true);
        transitionTimeoutRef.current = null;
      }, TRANSITION_DURATION);
    }, SLIDE_DURATION);

    return clearTimers;
  }, [activeIndex, isPaused, prefersReducedMotion]);

  useEffect(() => {
    return clearTimers;
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      className={cn(
        "border-b border-white/10",
        "bg-bg-inverse text-text-inverse",
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
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
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "w-full text-center",
              "text-[0.8125rem] sm:text-caption md:text-body",
              "font-medium",
              "leading-snug sm:leading-relaxed",
              "tracking-[0.005em]",
              "text-white",
              !prefersReducedMotion &&
                "transition-opacity duration-(--duration-normal)",
              isVisible ? "opacity-100" : "opacity-0",
            )}
          >
            {announcements[activeIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
