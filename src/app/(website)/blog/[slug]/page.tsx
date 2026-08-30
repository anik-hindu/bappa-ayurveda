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

import {
  getAllPostSlugs,
  getPost,
  getRelatedPosts,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

  const canonicalUrl = `/blog/${post.slug.current}`;
  const title = `${post.title}`;
  const description = post.excerpt.trim();
  const publishedTime = post.publishedAt
    ? new Date(post.publishedAt)
    : undefined;
  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt)
    : publishedTime;

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      publishedTime: publishedTime?.toISOString(),
      modifiedTime: modifiedTime?.toISOString(),
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.category?.name,
      siteName: "Bappa Ayurveda",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.mainImage.alt || `${post.title} — Bappa Ayurveda`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl
        ? [imageUrl]
        : undefined,
    },
  };
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
