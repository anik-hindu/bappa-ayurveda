import { Section } from "@/components/ui";
import { extractTableOfContents } from "@/lib/tableOfContents";
import type { PortableTextBlock } from "@portabletext/types";

import ArticleBody from "./ArticleBody";
import TableOfContents from "./TableOfContents";

interface ArticleContentProps {
  body: PortableTextBlock[];
}

export default function ArticleContent({ body }: ArticleContentProps) {
  if (!body?.length) {
    return null;
  }

  const toc = extractTableOfContents(body);
  const hasToc = toc.length >= 2;

  return (
    <Section padding="md">
      <div
        className={
          hasToc
            ? "mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-20"
            : "mx-auto max-w-article"
        }
      >
        {hasToc && <TableOfContents items={toc} />}

        <ArticleBody body={body} />
      </div>
    </Section>
  );
}
