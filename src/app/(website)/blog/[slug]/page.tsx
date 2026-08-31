import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArticleAuthor,
  ArticleBody,
  ArticleContent,
  ArticleHeader,
  ArticleShare,
  ArticleSidebar,
  ArticleTags,
  MobileTableOfContents,
  RelatedArticles,
} from "@/components/blog";

import { urlFor } from "@/sanity/lib/image";
import {
  getAllPostSlugs,
  getPost,
  getRelatedPosts,
} from "@/sanity/lib/queries";

import { buildPageMetadata } from "@/lib/seo";
import { extractTableOfContents } from "@/lib/tableOfContents";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const publishedTime = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : undefined;

  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : publishedTime;

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt.trim(),
    path: `/blog/${post.slug.current}`,
    type: "article",

    ...(imageUrl
      ? {
          image: {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.mainImage?.alt || `${post.title} — Bappa Ayurveda`,
            type: "image/jpeg",
          },
        }
      : {}),

    article: {
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(post.author?.name ? { authors: [post.author.name] } : {}),
      ...(post.category?.name ? { section: post.category.name } : {}),
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const tagIds = post.tags?.map((tag) => tag._id) ?? [];

  const relatedPosts = await getRelatedPosts(
    post._id,
    post.category._id,
    tagIds,
  );

  const toc = extractTableOfContents(post.body);

  return (
    <>
      <ArticleHeader post={post} />

      <ArticleContent
        sidebar={
          toc.length > 0 ? (
            <ArticleSidebar title={post.title} toc={toc} />
          ) : undefined
        }
        mobileBefore={<MobileTableOfContents items={toc} />}
      >
        <ArticleBody body={post.body} toc={toc} />
      </ArticleContent>

      <footer aria-label="Article information">
        <ArticleShare title={post.title} />
        <ArticleTags tags={post.tags} />
        <ArticleAuthor author={post.author} />
      </footer>
      <RelatedArticles posts={relatedPosts} />
    </>
  );
}
