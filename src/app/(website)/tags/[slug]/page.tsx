import { notFound } from "next/navigation";

import { TagArticles, TagHero } from "@/components/tags";
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

  return (
    <main>
      <TagHero tag={tag} />

      <TagArticles
        tagName={tag.name}
        tagSlug={tag.slug.current}
        posts={posts}
        total={total}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
      />
    </main>
  );
}
