import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorArticles, AuthorBio, AuthorHero } from "@/components/authors";

import { buildPageMetadata } from "@/lib/seo";
import { getAllAuthorSlugs, getAuthorWithPosts } from "@/sanity/lib/queries";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllAuthorSlugs();
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;

  const author = await getAuthorWithPosts(slug);

  if (!author) {
    return {};
  }

  const description =
    author.shortBio?.trim() ||
    author.bio?.trim() ||
    `Read articles and Ayurvedic insights by ${author.name} on Bappa Ayurveda.`;

  return buildPageMetadata({
    title: author.name,
    description,
    path: `/authors/${author.slug.current}`,
    keywords: [
      author.name,
      "Ayurveda",
      "Ayurvedic education",
      "Ayurvedic knowledge",
      "Bappa Ayurveda",
    ],
  });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  const author = await getAuthorWithPosts(slug);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <AuthorHero author={author} />
      <AuthorBio author={author} />
      <AuthorArticles posts={author.posts} />
    </main>
  );
}
