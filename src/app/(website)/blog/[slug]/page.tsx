import { notFound } from "next/navigation";

import {
  ArticleAuthor,
  ArticleContent,
  ArticleHeader,
  ArticleTags,
  RelatedArticles,
} from "@/components/blog";
import {
  getAllPostSlugs,
  getPost,
  getRelatedPosts,
} from "@/sanity/lib/queries";

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
  return (
    <main>
      <ArticleHeader post={post} />
      <ArticleContent body={post.body} />
      <ArticleTags tags={post.tags ?? []} />
      <ArticleAuthor author={post.author} />
      <RelatedArticles posts={relatedPosts} />
    </main>
  );
}
