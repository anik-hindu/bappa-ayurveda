import { absoluteUrl } from "@/lib/seo";
import type { BlogPosting } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export type ArticleData = {
  headline: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  authorId?: string;
  authorName?: string;
  authorUrl?: string;
  category?: string;
  keywords?: string[];
};

/**
 * Builds a schema-dts compliant BlogPosting node linked into the entity graph.
 */
export function buildArticleData({
  headline,
  description,
  path,
  publishedTime,
  modifiedTime,
  image,
  authorId,
  authorName,
  authorUrl,
  category,
  keywords,
}: ArticleData): BlogPosting {
  return {
    "@type": "BlogPosting",
    "@id": SCHEMA_IDS.article(path),
    url: absoluteUrl(path),
    headline,
    description,

    mainEntityOfPage: {
      "@id": SCHEMA_IDS.webpage(path),
    },

    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },

    publisher: {
      "@id": SCHEMA_IDS.organization,
    },

    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    ...(image ? { image: [image] } : {}),
    ...(category ? { articleSection: [category] } : {}),
    ...(keywords?.length ? { keywords } : {}),

    ...(authorId
      ? {
          author: {
            "@type": "Person",
            "@id": authorId,
            ...(authorName ? { name: authorName } : {}),
            ...(authorUrl ? { url: authorUrl } : {}),
          },
        }
      : authorName
        ? {
            author: {
              "@type": "Person",
              name: authorName,
            },
          }
        : {}),
  };
}
