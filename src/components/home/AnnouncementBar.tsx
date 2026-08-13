"use client";

import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const announcements = [
  "Your body has always known. Now, science can read it.",
  "Prakriti Intelligence Engine — AI that speaks the language of classical Ayurveda.",
  "5 dimensions. One profile. Personalisation the way Charaka intended.",
] as const;

const SLIDE_DURATION = 4500;
const TRANSITION_DURATION = 300;

export default function AnnouncementBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % announcements.length);
        setIsVisible(true);
      }, TRANSITION_DURATION);
    }, SLIDE_DURATION);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, isPaused]);

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsVisible(false);

    setTimeout(() => {
      setActiveIndex(index);
      setIsVisible(true);
    }, TRANSITION_DURATION);
  };

  return (
    <div
      role="region"
      aria-label="PIE announcement"
      className="bg-bg-inverse text-text-inverse"
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
            "flex min-h-12 items-center",
            "gap-4 py-2.5",
            "md:min-h-11 md:py-2",
          )}
        >
          {/* Label */}
          <div
            className={cn(
              "flex shrink-0 items-center gap-2",
              "font-body text-label font-semibold",
              "tracking-wider uppercase",
              "text-text-accent",
            )}
          >
            <SparklesIcon className="size-4 shrink-0" aria-hidden="true" />

            <span className="hidden sm:inline">PIE · Coming Soon</span>

            <span className="sm:hidden">PIE</span>
          </div>

          {/* Divider */}
          <span
            className="h-5 w-px shrink-0 bg-text-inverse/30"
            aria-hidden="true"
          />

          {/* Announcement */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <p
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                "font-body text-caption sm:text-body",
                "leading-relaxed text-text-inverse",
                "transition-opacity duration-(--duration-normal)",
                isVisible ? "opacity-100" : "opacity-0",
              )}
            >
              {announcements[activeIndex]}
            </p>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Pause / play */}
            <button
              type="button"
              onClick={() => setIsPaused((current) => !current)}
              aria-label={
                isPaused ? "Resume announcements" : "Pause announcements"
              }
              className={cn(
                "hidden size-8 items-center justify-center sm:flex",
                "rounded-full",
                "text-text-inverse/70",
                "transition-colors duration-(--duration-fast)",
                "hover:bg-text-inverse/10 hover:text-text-inverse",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-text-accent",
              )}
            >
              {isPaused ? (
                <PlayIcon className="size-3.5" aria-hidden="true" />
              ) : (
                <PauseIcon className="size-3.5" aria-hidden="true" />
              )}
            </button>

            {/* Slide indicators */}
            <div
              className="flex items-center gap-2"
              aria-label="Announcement slides"
            >
              {announcements.map((announcement, index) => (
                <button
                  key={announcement}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Show announcement ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={cn(
                    "size-2 rounded-full border",
                    "transition-all duration-(--duration-fast)",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-text-accent",
                    index === activeIndex
                      ? "border-text-accent bg-text-accent"
                      : "border-text-inverse/60 bg-transparent hover:border-text-inverse",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
