import { Button } from "@/components/ui/";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  category: string;
};

function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center gap-4">
      {currentPage === 1 ? null : (
        <Button
          href={`/blog?page=${currentPage - 1}&category=${category}`}
          size="sm"
        >
          Prev
        </Button>
      )}
      {pages.map((page) => (
        <Button
          key={page}
          href={`/blog?page=${page}&category=${category}`}
          size="sm"
          variant={currentPage === page ? "primary" : "secondary"}
        >
          {page}
        </Button>
      ))}
      {currentPage >= totalPages ? null : (
        <Button
          href={`/blog?page=${currentPage + 1}&category=${category}`}
          size="sm"
        >
          Next
        </Button>
      )}
    </div>
  );
}

export default Pagination;
