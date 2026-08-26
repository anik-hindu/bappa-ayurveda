import { ChevronDownIcon, ListBulletIcon } from "@heroicons/react/20/solid";

import type { TableOfContentsItem } from "@/lib/tableOfContents";

interface MobileTableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function MobileTableOfContents({
  items,
}: MobileTableOfContentsProps) {
  if (items.length < 2) {
    return null;
  }

  return (
    <details className="group border-y border-border-subtle lg:hidden">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-caption font-medium text-text-primary transition-colors duration-(--duration-fast) hover:text-text-accent focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 items-center gap-2">
          <ListBulletIcon
            aria-hidden="true"
            className="size-4 shrink-0 text-text-accent"
          />

          <span>In this article</span>

          <span aria-hidden="true" className="text-text-muted">
            {items.length}
          </span>
        </span>

        <ChevronDownIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-text-muted transition-transform duration-(--duration-fast) group-open:rotate-180"
        />
      </summary>

      <nav
        aria-label="Article sections"
        className="border-t border-border-subtle"
      >
        <ol className="py-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-sm py-2.5 text-caption leading-snug text-text-muted transition-colors duration-(--duration-fast) hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:outline-none focus-visible:ring-inset ${
                  item.level === 3
                    ? "pr-3 pl-8"
                    : "px-3 font-medium text-text-primary"
                } `}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
