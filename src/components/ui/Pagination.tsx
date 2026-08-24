import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  createHref: (page: number) => string;
}

export default function Pagination({
  currentPage,
  totalPages,
  createHref,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 border-t border-border-subtle pt-6 lg:mt-16"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Previous */}
        <div>
          {currentPage > 1 ? (
            <Link
              href={createHref(previousPage)}
              rel="prev"
              className="group inline-flex min-h-11 items-center gap-2 rounded-btn px-3 text-caption font-medium text-text-primary transition-colors duration-(--duration-fast) ease-default hover:bg-bg-hover hover:text-text-accent focus-visible:outline-none"
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 transition-transform duration-(--duration-fast) ease-default group-hover:-translate-x-0.5"
              />

              <span>Previous</span>
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex min-h-11 items-center gap-2 px-3 text-caption text-text-muted/50"
            >
              <ArrowLeftIcon aria-hidden="true" className="size-4" />

              <span>Previous</span>
            </span>
          )}
        </div>

        {/* Current page */}
        <p aria-live="polite" className="text-caption text-text-muted">
          Page{" "}
          <span className="font-medium text-text-primary">{currentPage}</span>{" "}
          of {totalPages}
        </p>

        {/* Next */}
        <div>
          {currentPage < totalPages ? (
            <Link
              href={createHref(nextPage)}
              rel="next"
              className="group inline-flex min-h-11 items-center gap-2 rounded-btn px-3 text-caption font-medium text-text-primary transition-colors duration-(--duration-fast) ease-default hover:bg-bg-hover hover:text-text-accent focus-visible:outline-none"
            >
              <span>Next</span>

              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 transition-transform duration-(--duration-fast) ease-default group-hover:translate-x-0.5"
              />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex min-h-11 items-center gap-2 px-3 text-caption text-text-muted/50"
            >
              <span>Next</span>

              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
