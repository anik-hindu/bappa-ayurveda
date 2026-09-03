import { absoluteUrl } from "@/lib/seo";
import type { BlogPosting } from "schema-dts";

export type ArticleStubData = {
  id: string;
  headline: string;
  path: string;
};

/**
 * Builds a lightweight BlogPosting entity node for list context references.
 */
export function buildArticleStubData({
  id,
  headline,
  path,
}: ArticleStubData): BlogPosting {
  return {
    "@type": "BlogPosting",
    "@id": id,
    headline,
    url: absoluteUrl(path),
  };
}
