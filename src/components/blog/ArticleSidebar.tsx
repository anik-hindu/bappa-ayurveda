import type { TableOfContentsItem } from "@/lib/tableOfContents";

import PopularPosts from "./PopularPosts";
import TableOfContents from "./TableOfContents";

interface ArticleSidebarProps {
  slug: string;
  toc: TableOfContentsItem[];
}

export default function ArticleSidebar({ slug, toc }: ArticleSidebarProps) {
  const safeToc = toc ?? [];

  if (!safeToc.length) {
    return null;
  }

  return (
    <nav aria-label="Article navigation">
      <div className="space-y-6">
        <TableOfContents items={toc} />

        <div className="border-t border-border-subtle pt-5">
          <PopularPosts currentSlug={slug}/>
        </div>
      </div>
    </nav>
  );
}
