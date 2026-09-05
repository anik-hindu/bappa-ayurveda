import type { TableOfContentsItem } from "@/lib/tableOfContents";

import TableOfContents from "./TableOfContents";

interface ArticleSidebarProps {
  toc: TableOfContentsItem[];
}

export default function ArticleSidebar({ toc }: ArticleSidebarProps) {
  const safeToc = toc ?? [];

  return (
    <nav
      aria-label="Article navigation"
      className="mb-4 w-full pb-4"
    >
      {safeToc.length > 0 && <TableOfContents items={toc} />}
    </nav>
  );
}
