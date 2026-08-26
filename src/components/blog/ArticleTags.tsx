import { TagIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { Section } from "@/components/ui";
import type { PostDetail } from "@/types";

interface ArticleTagsProps {
  tags: PostDetail["tags"];
}

function ArticleTags({ tags }: ArticleTagsProps) {
  const safeTags = tags ?? [];
  if (safeTags.length === 0) {
    return null;
  }

  return (
    <Section
      padding="sm"
      aria-labelledby="article-tags-heading"
      className="border-t border-border-subtle"
    >
      <div className="mx-auto max-w-article">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          {/* Label */}
          <div className="flex shrink-0 items-center gap-2 text-text-accent">
            <TagIcon aria-hidden="true" className="size-4" />

            <h2
              id="article-tags-heading"
              className="font-body text-label font-medium tracking-[0.14em] text-text-primary uppercase"
            >
              Topics
            </h2>
          </div>

          {/* Tags */}
          <ul aria-label="Article topics" className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag._id}>
                <Link
                  href={`/tags/${tag.slug.current}`}
                  className="inline-flex min-h-10 items-center rounded-badge border border-border-default px-3.5 py-2 text-caption font-medium text-text-primary transition-all duration-(--duration-fast) ease-default hover:border-border-accent hover:bg-bg-hover hover:text-text-accent focus-visible:outline-none"
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default ArticleTags;
