import { BlogHeader, BlogPostSection, CategoryFilter } from "@/components/blog";
import { getAllCategories } from "@/sanity/lib/queries";
import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

interface BlogListingSearchParams {
  category?: string;
  page?: string;
}

interface BlogListingPageProps {
  searchParams: Promise<BlogListingSearchParams>;
}

export async function generateMetadata({
  searchParams,
}: BlogListingPageProps): Promise<Metadata> {
  const { category = "", page } = (await searchParams) ?? {};

  const pageNumber = Number(page);
  const isPaginated = Number.isInteger(pageNumber) && pageNumber > 1;

  const isFiltered = Boolean(category && category !== "all");

  const categoryName = isFiltered
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;

  const title = categoryName
    ? `${categoryName} Articles | Ayurveda Blog`
    : "Ayurveda Blog & Editorial Insights";

  return buildPageMetadata({
    title,
    description:
      "Explore practical Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda, rooted in classical knowledge and modern standards.",
    path: "/blog",
    image: {
      url: "/og/blog.jpg",
      width: 1200,
      height: 630,
      alt: "Bappa Ayurveda Blog — Ayurveda insights and wellness guidance",
      type: "image/jpeg",
    },
    noIndex: isPaginated,
  });
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
    <>
      <BlogHeader />
      <CategoryFilter categories={categories} />
      <BlogPostSection category={category} page={page} />
    </>
  );
}
