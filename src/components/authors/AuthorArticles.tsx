import type { Post } from "@/types";

import BlogCard from "@/components/blog/BlogCard";
import { Section } from "@/components/ui";

interface AuthorArticlesProps {
  posts: Post[];
  articleCount: number;
}

export default function AuthorArticles({
  posts,
  articleCount,
}: AuthorArticlesProps) {
  return (
    <Section
      id="main-content"
      tabIndex={-1}
      background="surface"
      aria-labelledby="author-articles-heading"
      className="border-t border-border-subtle"
    >
      {/* Section header */}
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
        <div>
          <p className="font-body text-label font-semibold tracking-[0.16em] text-text-accent uppercase">
            Published work
          </p>

          <h2
            id="author-articles-heading"
            className="mt-2 text-section leading-heading text-text-primary"
          >
            Articles by this author
          </h2>
        </div>

        {articleCount > 0 && (
          <p
            aria-label={`${articleCount} published ${
              articleCount === 1 ? "article" : "articles"
            }`}
            className="font-body text-body text-text-muted"
          >
            {articleCount} {articleCount === 1 ? "Article" : "Articles"}
          </p>
        )}
      </div>

      {/* Articles */}
      {posts.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {posts.map((post) => (
            <li key={post._id}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="status"
          className="border-y border-border-subtle py-12 text-center lg:py-16"
        >
          <h3 className="text-sub leading-sub text-text-primary">
            No published articles yet
          </h3>

          <p className="mx-auto mt-3 max-w-[48ch] text-body text-text-muted">
            This author’s published work will appear here when it becomes
            available.
          </p>
        </div>
      )}
    </Section>
  );
}
