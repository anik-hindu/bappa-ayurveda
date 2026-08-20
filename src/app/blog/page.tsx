import BlogHeader from "@/components/blog/BlogHeader";
import CategoryFilter from "@/components/blog/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogListingPage() {
  return (
    <main>
      <BlogHeader />
      <CategoryFilter />
    </main>
  );
}
