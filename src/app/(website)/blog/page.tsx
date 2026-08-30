import { BlogHeader, BlogPostSection, CategoryFilter } from "@/components/blog";
import { getAllCategories } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Ayurveda Blog | Insights, Wellness & Evidence-Informed Guidance",
  },
  description:
    "Explore practical Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda, rooted in classical knowledge and modern standards.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Ayurveda Blog | Bappa Ayurveda",
    description:
      "Explore practical Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda.",
    url: "/blog",
    type: "website",
    siteName: "Bappa Ayurveda",
    images: [
      {
        url: "/og/blog.jpg",
        width: 1200,
        height: 630,
        alt: "Bappa Ayurveda Blog — Ayurveda insights and wellness guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayurveda Blog | Bappa Ayurveda",
    description:
      "Explore practical Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda.",
    images: ["/og/blog.jpg"],
  },
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
    <>
      <BlogHeader />
      <CategoryFilter categories={categories} />
      <BlogPostSection category={category} page={page} />
    </>
  );
}
