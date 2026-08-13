import { getLatestPosts } from "@/sanity/lib/queries";
import type { Post } from "@/types";
import { Section } from "../ui";
import BlogCard from "./BlogCard";

async function BlogList() {
  const posts: Post[] = await getLatestPosts();

  return (
    <Section>
      <div className="flex w-80">
        <BlogCard post={posts[0]} />
      </div>
    </Section>
  );
}

export default BlogList;
