import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorArticles, AuthorBio, AuthorHero } from "@/components/authors";
import JsonLd from "@/components/seo/JsonLd";

import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbData,
  buildGraph,
  buildItemListData,
  buildOrganizationData,
  buildPersonData,
  buildProfilePageData,
  buildWebsiteData,
  SCHEMA_IDS,
} from "@/lib/structured-data";
import { urlFor } from "@/sanity/lib/image";
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
    `Read articles by ${author.name} on Ayurveda, traditional knowledge, and wellness from Bappa Ayurveda.`;

  const imageUrl = author.image?.asset?._ref
    ? urlFor(author.image).width(1200).height(630).url()
    : undefined;

  return buildPageMetadata({
    title: author.name,
    description,
    path: `/authors/${author.slug.current}`,
    ...(imageUrl
      ? {
          image: {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${author.name} | Bappa Ayurveda`,
          },
        }
      : {}),
  });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorWithPosts(slug);

  if (!author) {
    notFound();
  }

  const authorPath = `/authors/${author.slug.current}`;
  const personId = SCHEMA_IDS.person(authorPath);
  const breadcrumbId = SCHEMA_IDS.breadcrumb(authorPath);
  const authorUrl = absoluteUrl(authorPath);

  const imageUrl = author.image?.asset?._ref
    ? urlFor(author.image).width(1200).height(1200).url()
    : undefined;

  const personNode = buildPersonData({
    id: personId,
    name: author.name,
    url: authorUrl,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(author.role ? { jobTitle: author.role } : {}),
    ...(author.linkedIn ? { sameAs: [author.linkedIn] } : {}),
    ...(author.expertise?.length ? { knowsAbout: author.expertise } : {}),
  });

  const profilePageNode = buildProfilePageData({
    name: `${author.name} | Bappa Ayurveda`,
    description:
      author.shortBio ??
      `Learn more about ${author.name}, an author contributing to Bappa Ayurveda.`,
    path: authorPath,
    personId,
    breadcrumbId,
    ...(imageUrl ? { image: imageUrl } : {}),
  });

  const breadcrumbNode = buildBreadcrumbData([
    { name: "Home", path: "/" },
    { name: "Authors", path: "/authors" },
    { name: author.name, path: authorPath },
  ]);

  const itemListNode = author.posts?.length
    ? buildItemListData({
        path: authorPath,
        name: `Articles by ${author.name}`,
        items: author.posts.map((post) => {
          const postPath = `/blog/${post.slug.current}`;
          return {
            id: SCHEMA_IDS.blogPosting(postPath),
            name: post.title,
            path: postPath,
          };
        }),
        totalItems: author.posts.length,
      })
    : null;

  const authorGraph = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    profilePageNode,
    personNode,
    breadcrumbNode,
    ...(itemListNode ? [itemListNode] : []),
  ]);

  return (
    <>
      <JsonLd data={authorGraph} />
      <AuthorHero author={author} />
      <AuthorBio author={author} />
      <AuthorArticles posts={author.posts} />
    </>
  );
}
