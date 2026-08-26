/**
 * Generates a clean URL path for the blog page with optional category and pagination query parameters.
 * Automatically omits default parameters (page 1 and category 'all') to prevent redundant query strings.
 *
 * @param page - The target page number (1-indexed).
 * @param category - The selected filter category slug (e.g., 'ayurvedic-nutrition').
 * @returns A clean relative URL string (e.g., '/blog', '/blog?category=ayurvedic-nutrition', or '/blog?page=2').
 *
 * @example
 * getPageUrl(1, 'all');                 // Returns: '/blog'
 * getPageUrl(1, 'ayurvedic-nutrition'); // Returns: '/blog?category=ayurvedic-nutrition'
 * getPageUrl(2, 'all');                 // Returns: '/blog?page=2'
 * getPageUrl(3, 'daily-wellness');      // Returns: '/blog?category=daily-wellness&page=3'
 */
export function getPageUrl(page: number, category: string): string {
  const params = new URLSearchParams();

  if (category !== "all") {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/blog?${queryString}` : "/blog";
}

/**
 * Calculates which page numbers and ellipsis placeholders to render in the pagination UI.
 * Keeps the total number of visible elements manageable for responsive UI controls.
 *
 * @param currentPage - The currently active page index (1-based).
 * @param totalPages - The total count of available pages.
 * @returns An array containing numeric page numbers and string `'ellipsis'` placeholders.
 *
 * @example
 * getVisiblePages(1, 4);  // Returns: [1, 2, 3, 4]
 * getVisiblePages(2, 8);  // Returns: [1, 2, 3, 'ellipsis', 8]
 * getVisiblePages(5, 10); // Returns: [1, 'ellipsis', 5, 'ellipsis', 10]
 * getVisiblePages(7, 8);  // Returns: [1, 'ellipsis', 6, 7, 8]
 */
export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
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
