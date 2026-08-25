import { ArrowRightIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import {BlogCard} from "@/components/blog/";
import { Section } from "@/components/ui";
import type { Post } from "@/types";

interface RelatedArticlesProps {
  posts: Post[];
}

function RelatedArticles({
  posts,
}: RelatedArticlesProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Section
      padding="lg"
      aria-labelledby="related-articles-heading"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-text-accent">
            <DocumentTextIcon
              aria-hidden="true"
              className="size-4"
            />

            <p className="text-label font-medium tracking-[0.14em] uppercase">
              Continue reading
            </p>
          </div>

          <h2
            id="related-articles-heading"
            className="mt-2 text-section"
          >
            You may also like
          </h2>

          <p className="mt-3 max-w-xl text-body text-text-muted">
            Explore more articles from the Bappa Ayurveda journal.
          </p>
        </div>

        <Link
          href="/blog"
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-btn text-caption font-medium text-text-primary transition-colors duration-(--duration-fast) ease-default hover:text-text-accent focus-visible:outline-none"
        >
          <span>View all articles</span>

          <ArrowRightIcon
            aria-hidden="true"
            className="size-4 transition-transform duration-(--duration-fast) ease-default group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-y-12">
        {posts.map((post) => (
          <li key={post._id}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default RelatedArticles;