import BlogHeader from "@/components/blog/BlogHeader";
import CategoryFilter from "@/components/blog/CategoryFilter";
import PostGrid from "@/components/blog/PostGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

type BlogListingPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const params = await searchParams;

  const category = params.category || "all";
  const page = Number(params.page) || 1;

  return (
    <main>
      <BlogHeader />
      <CategoryFilter />
      <PostGrid category={category} page={page} />
    </main>
  );
}
