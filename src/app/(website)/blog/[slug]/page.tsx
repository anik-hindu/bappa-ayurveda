import { notFound } from "next/navigation";

import { ArticleHeader } from "@/components/blog";
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
    post.category._id,
    post.slug.current,
    tagIds,
  );

  return (
    <main>
      <article tabIndex={-1} id="main-content">
        <ArticleHeader post={post} />

        {/* <ArticleBody post={post} />

        <RelatedArticles posts={relatedPosts} /> */}
      </article>
    </main>
  );
}
