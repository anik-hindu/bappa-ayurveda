"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has been scrolled past a specific vertical pixel threshold.
 *
 * @remarks
 * This hook dynamically injects a hidden sentinel element into the DOM body and monitors
 * it using an `IntersectionObserver` to efficiently detect scroll positioning without
 * triggering heavy scroll event listeners.
 *
 * @param threshold - The vertical scroll distance in pixels before triggering the scrolled state. Defaults to `4`.
 * @returns A boolean value indicating `true` if the page is scrolled past the threshold, otherwise `false`.
 *
 * @example
 * ```tsx
 * const isScrolled = useScrolled(20);
 * return <Navbar className={isScrolled ? "bg-black" : "bg-transparent"} />;
 * ```
 */

export default function useScrolled(threshold = 4): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");

    sentinel.setAttribute("aria-hidden", "true");

    Object.assign(sentinel.style, {
      position: "absolute",
      top: `${threshold}px`,
      left: "0",
      width: "1px",
      height: "1px",
      pointerEvents: "none",
    });

    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry!.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [threshold]);

  return scrolled;
}
