import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";

import { BlogHeader, BlogPostSection, CategoryFilter } from "@/components/blog";
import JsonLd from "@/components/seo/JsonLd";

import { buildPageMetadata } from "@/lib/seo";
import {
  buildArticleStubData,
  buildBreadcrumbData,
  buildCollectionPageData,
  buildGraph,
  buildItemListData,
  buildOrganizationData,
  buildWebsiteData,
  SCHEMA_IDS,
} from "@/lib/structured-data";
import { getAllCategories, getPaginatedPosts } from "@/sanity/lib/queries";

interface BlogListingSearchParams {
  category?: string;
  page?: string;
}

interface BlogListingPageProps {
  searchParams: Promise<BlogListingSearchParams>;
}

const PAGE_SIZE = 6;

export async function generateMetadata({
  searchParams,
}: BlogListingPageProps): Promise<Metadata> {
  const { category = "", page } = (await searchParams) ?? {};

  const pageNumber = Number(page);
  const isPaginated = Number.isInteger(pageNumber) && pageNumber > 1;
  const isFiltered = Boolean(category && category !== "all");

  const categoryTitle = isFiltered
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;

  const title = categoryTitle
    ? `${categoryTitle} Articles | Ayurveda Blog`
    : "Ayurveda Blog & Editorial Insights";

  const searchParamsString = new URLSearchParams();
  if (isFiltered) searchParamsString.set("category", category);
  if (isPaginated) searchParamsString.set("page", String(pageNumber));

  const path = searchParamsString.toString()
    ? `/blog?${searchParamsString.toString()}`
    : "/blog";

  return buildPageMetadata({
    title,
    description:
      "Explore practical Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda, rooted in classical knowledge and modern standards.",
    path,
    keywords: [
      "Ayurveda",
      "Ayurveda blog",
      "Ayurvedic wellness",
      "Ayurvedic health guidance",
      "classical Ayurveda",
      "Ayurvedic education",
      "evidence-informed Ayurveda",
    ],
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
  const isFiltered = category !== "all";

  const { posts, total } = await getPaginatedPosts({
    category,
    page,
    pageSize: PAGE_SIZE,
  });

  const activeCategory = isFiltered
    ? categories.find((c) => c.slug.current === category)
    : undefined;

  const categoryDisplayName = activeCategory?.name ?? category;

  const queryParams = new URLSearchParams();
  if (isFiltered) queryParams.set("category", category);
  if (page > 1) queryParams.set("page", String(page));

  const currentPath = queryParams.toString()
    ? `/blog?${queryParams.toString()}`
    : "/blog";

  const itemListId = SCHEMA_IDS.itemList(currentPath);
  const breadcrumbId = SCHEMA_IDS.breadcrumb(currentPath);

  const collectionPageNode = buildCollectionPageData({
    name: isFiltered
      ? `${categoryDisplayName} Articles | Bappa Ayurveda Blog`
      : "Ayurveda Blog & Editorial Insights",
    description:
      "Explore practical Ayurveda insights, wellness guidance, and evidence-informed articles from Bappa Ayurveda, rooted in classical knowledge and modern standards.",
    path: currentPath,
    breadcrumbId,
    mainEntityId: itemListId,
  });

  const itemListName = isFiltered
    ? `${categoryDisplayName} Articles`
    : "Bappa Ayurveda Articles";

  const itemListNode = buildItemListData({
    path: currentPath,
    name: itemListName,
    items: posts.map((post) => {
      const postPath = `/blog/${post.slug.current}`;
      const imageUrl = post.mainImage?.asset?._ref
        ? urlFor(post.mainImage).url()
        : null;
      const authorSlug = post.author?.slug?.current;

      return {
        name: post.title,
        id: SCHEMA_IDS.blogPosting(postPath),
        path: postPath,
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(authorSlug && post.author?.name
          ? {
              author: {
                id: SCHEMA_IDS.person(`/authors/${authorSlug}`),
                name: post.author.name,
              },
            }
          : {}),
      };
    }),
    currentPage: page,
    pageSize: PAGE_SIZE,
    totalItems: total,
  });

  const articleNodes = posts.map((post) => {
    const postPath = `/blog/${post.slug.current}`;
    return buildArticleStubData({
      id: SCHEMA_IDS.blogPosting(postPath),
      headline: post.title,
      path: postPath,
    });
  });

  const breadcrumbNode = buildBreadcrumbData([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  const blogGraph = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    collectionPageNode,
    itemListNode,
    breadcrumbNode,
    ...articleNodes,
  ]);

  return (
    <>
      <JsonLd data={blogGraph} />

      <BlogHeader />
      <CategoryFilter categories={categories} />
      <BlogPostSection
        posts={posts}
        total={total}
        category={category}
        page={page}
      />
    </>
  );
}
