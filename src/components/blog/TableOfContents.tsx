"use client";

import { ListBulletIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

import type { TableOfContentsItem } from "@/lib/tableOfContents";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const nextActiveId = visible[0]?.target.id;

        if (!nextActiveId) return;

        setActiveId((currentId) => {
          if (currentId === nextActiveId) {
            return currentId;
          }

          return nextActiveId;
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [items]);

  /*
   * Keep the active TOC item visible inside
   * the sidebar's own scroll container.
   */
  useEffect(() => {
    if (!activeId) return;

    const activeLink = linkRefs.current[activeId];

    if (!activeLink) return;

    activeLink.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeId]);

  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="w-full">
      <div className="flex items-center gap-2 text-text-accent">
        <ListBulletIcon aria-hidden="true" className="size-4 shrink-0" />

        <p className="text-label font-medium tracking-[0.14em] uppercase">
          Contents
        </p>
      </div>

      <ol className="mt-4 space-y-1 border-l border-border-subtle">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                ref={(element) => {
                  linkRefs.current[item.id] = element;
                }}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(item.id)}
                className={[
                  "relative block py-2 pr-2",
                  "text-caption leading-snug",
                  "transition-colors duration-(--duration-fast) ease-default",
                  "focus-visible:ring-2 focus-visible:outline-none",
                  "focus-visible:ring-border-accent focus-visible:ring-offset-2",
                  item.level === 3 ? "pl-7" : "pl-4",
                  isActive
                    ? "font-medium text-text-primary"
                    : "text-text-muted hover:text-text-primary",
                ].join(" ")}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 -left-px w-px bg-border-accent"
                  />
                )}

                <span className="line-clamp-3">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
