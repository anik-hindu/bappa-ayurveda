import Pagination from "@/components/blog/Pagination";
import { Section } from "@/components/ui";
import { getAllPosts, getPostsByCategory } from "@/sanity/lib/queries";
import BlogCard from "./BlogCard";

type BlogPostsProps = {
  category: string;
  page: number;
};

const pageSize = 2;

async function BlogPosts({ category, page }: BlogPostsProps) {
  let posts = await getPostsByCategory(category);

  if (category === "all") {
    posts = await getAllPosts();
  }
  if (posts.length === 0) {
    return <div>No blog posts found</div>;
  }

  const totalPages = Math.ceil(posts.length / pageSize);
  const skip = (page - 1) * pageSize;

  posts = posts.slice(skip, skip + pageSize);

  return (
    <Section padding="sm" background="surface">
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
      <Pagination
        category={category}
        currentPage={page}
        totalPages={totalPages}
      />
    </Section>
  );
}

export default BlogPosts;
