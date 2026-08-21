import { PortableTextBlock } from "@portabletext/types";

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function estimateReadTime(body?: PortableTextBlock[]): number {
  if (!body?.length) return 1;

  const words = body.reduce((count, block) => {
    if (block._type !== "block") return count;

    const text =
      block.children?.map((child) => child.text ?? "").join(" ") ?? "";

    return count + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);

  return Math.max(1, Math.ceil(words / 200));
}

export function getPageUrl(page: number, category: string) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (category !== "all") {
    params.set("category", category);
  }

  return `/blog?${params.toString()}`;
}

export function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}
