import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/seo/JsonLd";
import { TagArticles, TagHero } from "@/components/tags";

import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbData,
  buildCollectionPageData,
  buildGraph,
  buildItemListData,
  buildOrganizationData,
  buildWebsiteData,
  SCHEMA_IDS,
} from "@/lib/structured-data";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllTagSlugs,
  getPaginatedPostsByTagId,
  getTagBySlug,
} from "@/sanity/lib/queries";

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 9;

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateStaticParams() {
  return getAllTagSlugs();
}

export async function generateMetadata({
  params,
  searchParams,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {};
  }

  const parsedPage = Number(pageParam ?? DEFAULT_PAGE);

  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_PAGE;

  const isPaginated = currentPage > DEFAULT_PAGE;

  return buildPageMetadata({
    title: `${tag.name} Articles`,
    description:
      tag.description?.trim() ||
      `Explore Ayurvedic articles, insights, and educational content about ${tag.name} from Bappa Ayurveda.`,
    path: `/tags/${tag.slug.current}`,
    keywords: [tag.name, `${tag.name} Ayurveda`, "Ayurveda", "Bappa Ayurveda"],
    noIndex: isPaginated,
  });
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const parsedPage = Number(pageParam ?? DEFAULT_PAGE);

  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : DEFAULT_PAGE;

  const { posts, total } = await getPaginatedPostsByTagId({
    tagId: tag._id,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (
    (total === 0 && currentPage > DEFAULT_PAGE) ||
    (totalPages > 0 && currentPage > totalPages)
  ) {
    notFound();
  }

  const tagPath = `/tags/${tag.slug.current}`;
  const breadcrumbId = SCHEMA_IDS.breadcrumb(tagPath);
  const itemListId = SCHEMA_IDS.itemList(tagPath);

  const collectionPageNode = buildCollectionPageData({
    name: `${tag.name} Articles | Bappa Ayurveda`,
    description:
      tag.description?.trim() ||
      `Explore Ayurvedic articles, insights, and educational content about ${tag.name} from Bappa Ayurveda.`,
    path: tagPath,
    breadcrumbId,
    mainEntityId: itemListId,
  });

  const breadcrumbNode = buildBreadcrumbData([
    { name: "Home", path: "/" },
    { name: "Tags", path: "/tags" },
    { name: tag.name, path: tagPath },
  ]);

  const itemListNode = posts?.length
    ? buildItemListData({
        path: tagPath,
        name: `${tag.name} Articles`,
        items: posts.map((post) => {
          const postPath = `/blog/${post.slug.current}`;
          return {
            id: SCHEMA_IDS.blogPosting(postPath),
            name: post.title,
            path: postPath,
            ...(post.mainImage
              ? { image: urlFor(post.mainImage).width(1200).url() }
              : {}),
            ...(post.author
              ? {
                  author: {
                    id: SCHEMA_IDS.person(
                      `/authors/${post.author.slug.current}`,
                    ),
                    name: post.author.name,
                  },
                }
              : {}),
          };
        }),
        totalItems: total,
      })
    : null;

  const tagGraph = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    collectionPageNode,
    breadcrumbNode,
    ...(itemListNode ? [itemListNode] : []),
  ]);

  return (
    <>
      <JsonLd data={tagGraph} />
      <TagHero tag={tag} />

      <TagArticles
        tagName={tag.name}
        tagSlug={tag.slug.current}
        posts={posts}
        total={total}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
      />
    </>
  );
}
