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

import { extractTableOfContents } from "@/lib/tableOfContents";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs();
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
