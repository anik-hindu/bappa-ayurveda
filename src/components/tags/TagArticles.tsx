import { DocumentTextIcon } from "@heroicons/react/24/outline";

import BlogCard from "@/components/blog/BlogCard";
import { Pagination, Section } from "@/components/ui";
import type { Post } from "@/types";

interface TagArticlesProps {
  tagName: string;
  tagSlug: string;
  posts: Post[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export default function TagArticles({
  tagName,
  tagSlug,
  posts,
  total,
  currentPage,
  pageSize,
}: TagArticlesProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <Section
      id="main-content"
      tabIndex={-1}
      padding="md"
      aria-labelledby="tag-articles-heading"
    >
      <div className="flex flex-col gap-4 border-b border-border-default pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-text-accent">
            <DocumentTextIcon aria-hidden="true" className="size-4" />

            <p className="text-label font-medium tracking-[0.14em] uppercase">
              Journal
            </p>
          </div>

          <h2 id="tag-articles-heading" className="mt-2 text-section">
            Articles tagged with {tagName}
          </h2>
        </div>

        <p className="shrink-0 text-caption text-text-muted">
          {total} {total === 1 ? "article" : "articles"}
        </p>
      </div>

      {posts.length > 0 ? (
        <>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-y-12">
            {posts.map((post) => (
              <li key={post._id}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            createHref={(page) =>
              page === 1 ? `/tags/${tagSlug}` : `/tags/${tagSlug}?page=${page}`
            }
          />
        </>
      ) : (
        <div role="status" className="border-y border-border-subtle py-16">
          <p className="text-sub text-text-primary">No articles found</p>

          <p className="mt-2 max-w-md text-body text-text-muted">
            There are currently no published articles associated with this
            topic.
          </p>
        </div>
      )}
    </Section>
  );
}
