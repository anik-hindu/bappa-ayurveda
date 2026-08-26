import type { TableOfContentsItem } from "@/lib/tableOfContents";

import ArticleShare from "./ArticleShare";
import TableOfContents from "./TableOfContents";

interface ArticleSidebarProps {
  title: string;
  toc: TableOfContentsItem[];
}

export default function ArticleSidebar({ title, toc }: ArticleSidebarProps) {
  if (!toc.length) {
    return null;
  }

  return (
    <nav aria-label="Article navigation">
      <div className="space-y-6">
        <TableOfContents items={toc} />

        <div className="border-t border-border-subtle pt-5">
          <ArticleShare title={title} variant="sidebar" />
        </div>
      </div>
    </nav>
  );
}
