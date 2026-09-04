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
import JsonLd from "@/components/seo/JsonLd";

import { urlFor } from "@/sanity/lib/image";
import {
  getAllPostSlugs,
  getPost,
  getRelatedPosts,
} from "@/sanity/lib/queries";

import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import {
  buildArticleData,
  buildBreadcrumbData,
  buildGraph,
  buildOrganizationData,
  buildPersonData,
  buildWebPageData,
  buildWebsiteData,
  SCHEMA_IDS,
} from "@/lib/structured-data";
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

  const articlePath = `/blog/${post.slug.current}`;
  const publishedTime = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : undefined;

  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : undefined;

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt.trim(),
    path: articlePath,
    type: "article",

    ...(imageUrl
      ? {
          image: {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.mainImage?.alt || `${post.title} — Bappa Ayurveda`,
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
  const articlePath = `/blog/${post.slug.current}`;
  const articleId = SCHEMA_IDS.article(articlePath);

  const publishedTime = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : undefined;

  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : undefined;

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  const authorPath = post.author?.slug?.current
    ? `/authors/${post.author.slug.current}`
    : undefined;

  const personId = authorPath ? SCHEMA_IDS.person(authorPath) : undefined;
  const authorUrl = authorPath ? absoluteUrl(authorPath) : undefined;

  const articleNode = buildArticleData({
    headline: post.title,
    description: post.excerpt.trim(),
    path: articlePath,
    ...(publishedTime ? { publishedTime } : {}),
    ...(modifiedTime ? { modifiedTime } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(personId ? { authorId: personId } : {}),
    ...(post.author?.name ? { authorName: post.author.name } : {}),
    ...(authorUrl ? { authorUrl } : {}),
    ...(post.category?.name ? { category: post.category.name } : {}),
    ...(post.tags?.length ? { keywords: post.tags.map((t) => t.name) } : {}),
  });

  const webPageNode = buildWebPageData({
    name: post.title,
    description: post.excerpt.trim(),
    path: articlePath,
    breadcrumbId: SCHEMA_IDS.breadcrumb(articlePath),
    mainEntityId: articleId,
  });

  const breadcrumbNode = buildBreadcrumbData([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: articlePath },
  ]);

  const personNode =
    personId && authorUrl && post.author?.name
      ? buildPersonData({
          id: personId,
          name: post.author.name,
          url: authorUrl,
          ...(post.author.role ? { jobTitle: post.author.role } : {}),
        })
      : null;

  const articleGraph = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    webPageNode,
    articleNode,
    breadcrumbNode,
    ...(personNode ? [personNode] : []),
  ]);

  return (
    <>
      <JsonLd data={articleGraph} />
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
