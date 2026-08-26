import Pagination from "@/components/blog/Pagination";
import { Section } from "@/components/ui";
import { getPaginatedPosts } from "@/sanity/lib/queries";
import BlogCard from "./BlogCard";

type BlogPostsProps = {
  category: string;
  page: number;
};

const PAGE_SIZE = 6;

async function BlogPosts({ category, page }: BlogPostsProps) {
  const { posts, total } = await getPaginatedPosts({
    category,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (posts.length === 0) {
    return (
      <Section
        id="main-content"
        tabIndex={-1}
        padding="md"
        background="surface"
      >
        <div className="mx-auto flex max-w-narrow flex-col items-center py-12 text-center sm:py-16">
          <span className="mb-3 font-body text-xs font-semibold tracking-[0.16em] text-text-muted uppercase">
            Journal
          </span>

          <h2 className="text-2xl sm:text-3xl">No articles found</h2>

          <p className="mt-3 max-w-md text-text-muted">
            There are no articles in this category yet. Try exploring another
            category.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="main-content" tabIndex={-1} padding="md" background="surface">
      <div className="mb-8 border-b border-border-subtle pb-4">
        <div className="flex items-center justify-between gap-4">
          <span className="font-body text-xs font-semibold tracking-[0.16em] text-text-muted uppercase">
            Journal
          </span>

          <span className="font-body text-sm text-text-muted">
            {total} {total === 1 ? "article" : "articles"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            category={category}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </Section>
  );
}

export default BlogPosts;
