import BlogCard from "@/components/blog/BlogCard";
import { Button, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { getLatestPosts } from "@/sanity/lib/queries";

export default async function BlogPreview() {
  let posts = [];

  try {
    posts = await getLatestPosts();
  } catch (error) {
    console.error("BlogPreview fetch failed:", error);
    return null;
  }

  if (!posts.length) return null;

  return (
    <Section background="page" padding="lg" aria-labelledby="journal-heading">
      {/* Header */}
      <div
        className={cn(
          "flex flex-col gap-5",
          "sm:flex-row sm:items-end sm:justify-between",
        )}
      >
        <div className="max-w-2xl">
          <p
            className={cn(
              "font-body text-label font-semibold",
              "tracking-wider uppercase",
              "text-text-accent",
            )}
          >
            From the Journal
          </p>

          <h2 id="journal-heading" className="mt-3 text-text-primary">
            Knowledge for real life.
          </h2>

          <p
            className={cn(
              "mt-4 max-w-[55ch]",
              "font-body text-body-lg leading-relaxed",
              "text-text-muted",
            )}
          >
            Practical perspectives on Ayurveda, ingredients, tradition, and
            evidence.
          </p>
        </div>

        {/* Desktop CTA */}
        <Button
          href="/blog"
          variant="secondary"
          size="sm"
          className="hidden shrink-0 sm:inline-flex"
        >
          Explore all articles
        </Button>
      </div>

      {/* Posts */}
      <div
        className={cn(
          "mt-10 grid gap-6 md:gap-6 lg:gap-8",
          "md:grid-cols-2",
          "lg:grid-cols-3",
        )}
      >
        {posts.map((post, index) => (
          <BlogCard key={post._id} post={post} priority={index === 0} />
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 flex justify-center sm:hidden">
        <Button href="/blog" variant="secondary" size="sm">
          Explore all articles
        </Button>
      </div>
    </Section>
  );
}
