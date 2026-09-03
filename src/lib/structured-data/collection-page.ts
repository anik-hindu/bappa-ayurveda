import { absoluteUrl } from "@/lib/seo";
import type { CollectionPage } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export type CollectionPageData = {
  name: string;
  description: string;
  path: string;
  breadcrumbId?: string;
  aboutId?: string;
  mainEntityId?: string;
};

/**
 * Builds a schema-dts compliant CollectionPage node.
 */
export function buildCollectionPageData({
  name,
  description,
  path,
  breadcrumbId,
  aboutId,
  mainEntityId,
}: CollectionPageData): CollectionPage {
  return {
    "@type": "CollectionPage",
    "@id": SCHEMA_IDS.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(aboutId ? { about: { "@id": aboutId } } : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}
