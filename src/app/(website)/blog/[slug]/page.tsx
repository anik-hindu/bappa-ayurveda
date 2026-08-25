import { notFound } from "next/navigation";

import {
  ArticleAuthor,
  ArticleBody,
  ArticleHeader,
  ArticleTags,
} from "@/components/blog";
import { getAllPostSlugs, getPost } from "@/sanity/lib/queries";

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
  return (
    <main>
      <ArticleHeader post={post} />
      <ArticleBody body={post.body} />
      <ArticleTags tags={post.tags} />
      <ArticleAuthor author={post.author} />
    </main>
  );
}
