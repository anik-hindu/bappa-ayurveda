import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
}

export default function Breadcrumbs({
  items,
  className,
  ariaLabel = "Breadcrumb",
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label={ariaLabel} className={cn("w-full min-w-0", className)}>
      <ol className="flex w-full min-w-0 touch-pan-x scrollbar-none items-center gap-1.5 overflow-x-auto overscroll-x-contain pb-1 text-caption leading-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Home */}
        <li className="flex shrink-0 items-center">
          <Link
            href="/"
            aria-label="Home"
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center",
              "rounded-btn text-text-muted",
              "transition-colors duration-(--duration-fast) ease-default",
              "hover:text-text-primary",
              "focus-visible:outline-none",
            )}
          >
            <HomeIcon aria-hidden="true" className="size-4" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current ?? isLast;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex shrink-0 items-center"
            >
              <ChevronRightIcon
                aria-hidden="true"
                className="mx-1 size-3.5 shrink-0 text-text-muted/60"
              />

              {isCurrent || !item.href ? (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  title={item.label}
                  className={cn(
                    "block px-1",
                    "whitespace-nowrap",
                    isCurrent
                      ? "font-medium text-text-primary"
                      : "text-text-muted",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "block px-1",
                    "rounded-sm whitespace-nowrap",
                    "text-text-muted",
                    "transition-colors duration-(--duration-fast) ease-default",
                    "hover:text-text-primary",
                    "focus-visible:outline-none",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
