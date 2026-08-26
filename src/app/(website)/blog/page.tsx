import { BlogHeader, BlogPostSection, CategoryFilter } from "@/components/blog";
import { getAllCategories } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda.",
};

interface BlogListingSearchParams {
  category?: string;
  page?: string;
}

interface BlogListingPageProps {
  searchParams: Promise<BlogListingSearchParams>;
}

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const [{ category = "all", page: pageParam }, categories] = await Promise.all(
    [searchParams, getAllCategories()],
  );
  const parsedPage = Number(pageParam);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <main id="main-content" tabIndex={-1}>
      <BlogHeader />
      <CategoryFilter categories={categories} />
      <BlogPostSection category={category} page={page} />
    </main>
  );
}
