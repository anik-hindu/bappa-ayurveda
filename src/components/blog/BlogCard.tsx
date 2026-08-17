import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui";
import { estimateReadTime, formatDate } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types";

interface BlogCardProps {
  post: Post;
  priority?: boolean;
  className?: string;
}

export default function BlogCard({
  post,
  priority = false,
  className,
}: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(800).height(533).url()
    : null;

  const readTime = estimateReadTime(post.body);
  const formattedDate = formatDate(post.publishedAt);

  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/blog/${post.slug.current}`}
        aria-label={`Read article: ${post.title}`}
        className={cn(
          "flex h-full flex-col overflow-hidden",
          "rounded-card",
          "border border-border-default",
          "bg-bg-page",

          // Interaction
          "transition-[transform,border-color,box-shadow]",
          "duration-(--duration-normal)",
          "hover:-translate-y-0.5",
          "hover:border-border-accent",
          "hover:shadow-card",

          // Keyboard accessibility
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-border-accent",
          "focus-visible:ring-offset-2",
        )}
      >
        {/* Image */}
        <div className="relative aspect-3/2 overflow-hidden bg-bg-surface">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              priority={priority}
              sizes="
                (max-width: 767px) 100vw,
                (max-width: 1023px) 50vw,
                33vw
              "
              className={cn(
                "object-cover",
                "transition-transform duration-(--duration-slow)",
                "group-hover:scale-[1.03]",
              )}
            />
          ) : (
            <div
              className={cn(
                "flex size-full items-center justify-center",
                "bg-bg-surface",
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "font-display text-sub italic",
                  "text-text-muted",
                )}
              >
                Bappa Ayurveda
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Metadata */}
          <div className="flex items-center gap-3">
            {post.category?.name && (
              <>
                <Badge variant="accent">{post.category.name}</Badge>

                <span
                  className="size-1 rounded-full bg-border-default"
                  aria-hidden="true"
                />
              </>
            )}

            <span className="font-body text-caption text-text-muted">
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              "mt-4",
              "text-text-primary",
              "transition-colors duration-(--duration-fast)",
              "group-hover:text-text-accent",
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className={cn(
                "mt-3",
                "line-clamp-3",
                "font-body text-body leading-relaxed",
                "text-text-muted",
              )}
            >
              {post.excerpt}
            </p>
          )}

          {/* Footer metadata */}
          <div
            className={cn(
              "mt-auto pt-5",
              "flex items-center justify-between gap-4",
              "border-t border-border-subtle",
              "mt-6",
            )}
          >
            <span
              className={cn(
                "min-w-0 truncate",
                "font-body text-caption font-medium",
                "text-text-primary",
              )}
            >
              {post.author?.name ?? "Bappa Ayurveda"}
            </span>

            <time
              dateTime={post.publishedAt}
              className="shrink-0 font-body text-caption text-text-muted"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
