import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import { getPopularPosts } from "@/sanity/lib/queries";

type PopularPostsProps = {
  currentSlug: string;
};

export default async function PopularPosts({ currentSlug }: PopularPostsProps) {
  const posts = await getPopularPosts(currentSlug, 4);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-posts-heading"
      className="pt-6"
    >
      <div className="mb-5">
        <p className="mb-1 font-body text-label font-semibold tracking-[0.14em] text-text-accent uppercase">
          Discover more
        </p>

        <h2
          id="popular-posts-heading"
          className="font-display text-sub leading-sub font-medium text-text-primary"
        >
          Popular Posts
        </h2>
      </div>

      <ul className="space-y-4">
        {posts.map((post, index) => {
          const imageUrl = post.mainImage
            ? urlFor(post.mainImage).width(160).height(100).fit("crop").url()
            : null;

          return (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug.current}`}
                className="group flex gap-3 py-4 first:pt-0 last:pb-0"
                aria-label={`Read ${post.title}`}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 font-body text-label font-semibold text-text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="duration-(--duration-fast) font-display text-body-lg leading-heading font-medium text-text-primary transition-colors ease-default group-hover:text-text-accent">
                    {post.title}
                  </h3>

                  {post.category?.name && (
                    <p className="mt-1.5 font-body text-label tracking-[0.08em] text-text-muted uppercase">
                      {post.category.name}
                    </p>
                  )}
                </div>

                {imageUrl && (
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-card">
                    <Image
                      src={imageUrl}
                      alt={post.mainImage.alt || ""}
                      fill
                      sizes="64px"
                      className="duration-(--duration-normal) object-cover transition-transform ease-default group-hover:scale-105"
                    />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
