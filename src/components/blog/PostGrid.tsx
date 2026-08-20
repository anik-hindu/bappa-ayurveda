import { Section } from "@/components/ui";
import { getAllPosts, getPostsByCategory } from "@/sanity/lib/queries";
import BlogCard from "./BlogCard";

type BlogPostsProps = {
  category: string;
};

async function BlogPosts({ category }: BlogPostsProps) {
  let posts = await getPostsByCategory(category);

  if (category === "all") {
    posts = await getAllPosts();
  }

  if (posts.length === 0) {
    return <div>No blog posts found</div>;
  }

  return (
    <Section padding="sm" background="surface">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </Section>
  );
}

export default BlogPosts;
