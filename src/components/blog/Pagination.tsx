import { Button } from "@/components/ui/";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center gap-4">
      {currentPage === 1 ? null : (
        <Button href={`/blog?page=${currentPage - 1}`} size="sm">
          Prev
        </Button>
      )}
      {pages.map((page) => (
        <Button
          key={page}
          href={`/blog?page=${page}`}
          size="sm"
          variant={currentPage === page ? "primary" : "secondary"}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages ? (
        <Button href={`/blog?page=${currentPage + 1}`} size="sm">
          Next
        </Button>
      ) : null}
    </div>
  );
}

export default Pagination;
