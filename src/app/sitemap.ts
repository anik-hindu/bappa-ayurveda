import type { MetadataRoute } from "next";

import {
  getAllAuthorSlugs,
  getAllPostSlugs,
  getAllTagSlugs,
} from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
}

const BASE_URL = siteUrl.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsResult, authorsResult, tagsResult] = await Promise.allSettled([
    getAllPostSlugs(),
    getAllAuthorSlugs(),
    getAllTagSlugs(),
  ]);

  const posts = postsResult.status === "fulfilled" ? postsResult.value : [];
  const authors =
    authorsResult.status === "fulfilled" ? authorsResult.value : [];
  const tags = tagsResult.status === "fulfilled" ? tagsResult.value : [];

  if (postsResult.status === "rejected") {
    console.error("[sitemap] Failed to fetch post slugs:", postsResult.reason);
  }
  if (authorsResult.status === "rejected") {
    console.error(
      "[sitemap] Failed to fetch author slugs:",
      authorsResult.reason,
    );
  }
  if (tagsResult.status === "rejected") {
    console.error("[sitemap] Failed to fetch tag slugs:", tagsResult.reason);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map(
    ({ slug, updatedAt, publishedAt }) => {
      const rawDate = updatedAt ?? publishedAt;
      return {
        url: `${BASE_URL}/blog/${encodeURIComponent(slug)}`,
        lastModified: rawDate ? new Date(rawDate) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      };
    },
  );

  const authorRoutes: MetadataRoute.Sitemap = authors.map(({ slug }) => ({
    url: `${BASE_URL}/authors/${encodeURIComponent(slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map(({ slug }) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(slug)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...authorRoutes, ...tagRoutes];
}
