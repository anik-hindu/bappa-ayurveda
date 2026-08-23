import { BlogHeader, CategoryFilter, PostGrid } from "@/components/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

type BlogListingSearchParams = {
  category?: string;
  page?: string;
};

type BlogListingPageProps = {
  searchParams: Promise<BlogListingSearchParams>;
};

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const { category = "all", page: pageParam } = await searchParams;

  const parsedPage = Number(pageParam);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <main>
      <BlogHeader />
      <CategoryFilter />
      <PostGrid category={category} page={page} />
    </main>
  );
}
