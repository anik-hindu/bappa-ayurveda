import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/";
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
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null;

  const readTime = estimateReadTime(post.body);
  const formattedDate = formatDate(post.publishedAt);

  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/blog/${post.slug.current}`}
        aria-label={`Read "${post.title}"`}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-card",
          "border border-border-default",
          "bg-bg-page",
          "shadow-card",
          "transition-all duration-(--duration-normal)",
          "hover:-translate-y-1 hover:border-border-accent hover:shadow-hover",
          "focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-2 focus-visible:outline-none",
        )}
      >
        {imageUrl ? (
          <div className="relative aspect-3/2 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              priority={priority}
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw"
              className="duration-(--duration-slow) object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-3/2 bg-bg-surface" />
        )}

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-3">
            {post.category?.name && (
              <Badge variant="accent">{post.category.name}</Badge>
            )}

            <span className="text-caption whitespace-nowrap text-text-muted">
              {readTime} min read
            </span>
          </div>

          <h3 className="transition-colors group-hover:text-text-accent">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="line-clamp-3 text-text-muted">{post.excerpt}</p>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-4">
            <span className="text-caption font-medium text-text-primary">
              {post.author?.name ?? "Bappa Ayurveda"}
            </span>

            <time
              dateTime={post.publishedAt}
              className="text-caption text-text-muted"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
