import { ListBulletIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import type { TableOfContentsItem } from "@/lib/tableOfContents";
import { cn } from "@/lib/cn";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

function TableOfContents({
  items,
}: TableOfContentsProps) {
  if (items.length < 2) {
    return null;
  }

  return (
    <nav
      aria-labelledby="table-of-contents-heading"
      className="mb-10 lg:mb-0"
    >
      <div className="rounded-card border border-border-subtle bg-bg-surface p-5 sm:p-6 lg:sticky lg:top-24">
        {/* Header */}
        <div className="flex items-center gap-2">
          <ListBulletIcon
            aria-hidden="true"
            className="size-4 shrink-0 text-text-accent"
          />

          <h2
            id="table-of-contents-heading"
            className="text-label font-medium tracking-[0.14em] text-text-primary uppercase"
          >
            On this page
          </h2>
        </div>

        {/* Navigation */}
        <ol className="mt-4 space-y-1">
          {items.map((item) => (
            <li
              key={item.key}
              className={cn(
                item.level === 3 && "ml-4",
              )}
            >
              <Link
                href={`#${item.id}`}
                className={cn(
                  "group flex min-h-10 items-center rounded-sm py-2",
                  "text-caption leading-snug",
                  "transition-colors duration-(--duration-fast)",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-border-accent",
                  item.level === 2
                    ? "font-medium text-text-primary hover:text-text-accent"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mr-2 size-1 shrink-0 rounded-full bg-border-default",
                    "transition-colors duration-(--duration-fast)",
                    "group-hover:bg-text-accent",
                    item.level === 3 && "size-0.75",
                  )}
                />

                <span className="line-clamp-2">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default TableOfContents