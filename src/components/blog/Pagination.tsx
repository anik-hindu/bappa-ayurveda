import { Button } from "@/components/ui";
import { getPageUrl, getVisiblePages } from "@/lib/blog";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  category: string;
};

function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="border-t border-border-subtle pt-8"
    >
      {/* Desktop / tablet */}
      <div className="hidden items-center justify-center gap-2 sm:flex">
        {currentPage > 1 && (
          <Button
            href={getPageUrl(currentPage - 1, category)}
            variant="secondary"
            size="sm"
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
            Previous
          </Button>
        )}

        <div className="flex items-center gap-1" aria-label="Pages">
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="flex min-h-11 min-w-8 items-center justify-center px-1 text-text-muted"
              >
                …
              </span>
            ) : (
              <Button
                key={page}
                href={getPageUrl(Number(page), category)}
                variant={currentPage === page ? "primary" : "secondary"}
                size="sm"
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className="min-w-11"
              >
                {page}
              </Button>
            ),
          )}
        </div>

        {currentPage < totalPages && (
          <Button
            href={getPageUrl(currentPage + 1, category)}
            variant="secondary"
            size="sm"
            aria-label="Go to next page"
          >
            Next
            <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-center gap-3 sm:hidden">
        {currentPage > 1 ? (
          <Button
            href={getPageUrl(currentPage - 1, category)}
            variant="secondary"
            size="sm"
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon aria-hidden="true" className="h-4 w-4" />
            <span>Prev</span>
          </Button>
        ) : (
          <span className="min-w-21" aria-hidden="true" />
        )}

        <span
          aria-current="page"
          className="min-w-18 text-center text-sm font-semibold text-text-primary"
        >
          {currentPage} / {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Button
            href={getPageUrl(currentPage + 1, category)}
            variant="secondary"
            size="sm"
            aria-label="Go to next page"
          >
            <span>Next</span>
            <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : (
          <span className="min-w-21" aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}

export default Pagination;
