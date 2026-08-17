import Image from "next/image";
import Link from "next/link";

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
    ? urlFor(post.mainImage).width(800).height(500).url()
    : null;

  const authorImage = post.author?.image?.asset?._ref
    ? urlFor(post.author.image).width(80).height(80).url()
    : null;

  const readTime = estimateReadTime(post.body);
  const formattedDate = formatDate(post.publishedAt);
  const authorName = post.author?.name ?? "Bappa Ayurveda";

  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/blog/${post.slug.current}`}
        aria-label={`Read "${post.title}"`}
        className={cn(
          "flex h-full flex-col overflow-hidden",
          "rounded-card",
          "border border-border-default",
          "bg-bg-page",
          "shadow-card",

          "transition-all duration-(--duration-normal)",
          "hover:-translate-y-1",
          "hover:border-border-accent",
          "hover:shadow-hover",

          "active:-translate-y-1",
          "active:border-border-accent",
          "active:shadow-hover",

          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-border-accent",
          "focus-visible:ring-offset-4",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-bg-surface">
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
              className="flex size-full items-center justify-center"
              aria-hidden="true"
            >
              <span className="font-display text-sub text-text-muted italic">
                Bappa Ayurveda
              </span>
            </div>
          )}

          {/* Read time */}
          <span
            className={cn(
              "absolute top-4 right-4",
              "rounded-md",
              "bg-bg-page/95",
              "px-3 py-1.5",
              "font-body text-[0.625rem] font-semibold",
              "tracking-[0.08em] uppercase",
              "text-text-primary",
              "shadow-sm",
            )}
          >
            {readTime} min read
          </span>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col px-6 pt-5">
            {/* Category + PublishedDate */}
            <div className="flex min-h-4 items-center gap-2">
              {post.category?.name && (
                <span
                  className={cn(
                    "font-body text-[0.625rem] font-semibold",
                    "tracking-[0.14em] uppercase",
                    "text-text-accent",
                  )}
                >
                  {post.category.name}
                </span>
              )}

              {post.category?.name && (
                <span
                  className="size-1 rounded-full bg-border-default"
                  aria-hidden="true"
                />
              )}

              <time
                dateTime={post.publishedAt}
                className="font-body text-label text-text-muted"
              >
                {formattedDate}
              </time>
            </div>

            {/* Title */}
            <h3
              className={cn(
                "mt-4",
                "line-clamp-2",
                "min-h-[3.5rem]",
                "font-display",
                "text-[1.45rem]",
                "leading-[1.2]",
                "font-medium",
                "tracking-[-0.015em]",
                "text-text-primary",
                "transition-colors duration-(--duration-fast)",
                "group-hover:text-text-accent",
              )}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <div className="mt-4 min-h-[4.5rem]">
              {post.excerpt && (
                <p
                  className={cn(
                    "line-clamp-3",
                    "font-body text-[0.8125rem]",
                    "leading-[1.7]",
                    "text-text-muted",
                  )}
                >
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>

          {/* Author footer */}
          <div
            className={cn(
              "mt-5 flex items-center",
              "border-t border-border-subtle",
              "px-6 py-4",
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "relative size-9 shrink-0",
                "overflow-hidden rounded-full",
                "bg-bg-surface",
              )}
            >
              {authorImage ? (
                <Image
                  src={authorImage}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <span
                  className={cn(
                    "flex size-full items-center justify-center",
                    "font-display text-sm",
                    "text-text-accent",
                  )}
                  aria-hidden="true"
                >
                  {authorName.charAt(0)}
                </span>
              )}
            </div>

            {/* Author */}
            <div className="ml-3 min-w-0">
              <p className="truncate font-body text-[0.75rem] font-semibold text-text-primary">
                {authorName}
              </p>

              {/* Role */}
            </div>

            {/* Arrow */}
            <span
              aria-hidden="true"
              className={cn(
                "ml-auto",
                "text-2xl leading-none font-light",
                "text-text-primary",
                "transition-transform duration-(--duration-fast)",
                "group-hover:translate-x-1",
              )}
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
