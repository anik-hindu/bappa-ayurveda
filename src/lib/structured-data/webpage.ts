import { absoluteUrl } from "@/lib/seo";
import type { WebPage } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export type WebPageData = {
  name: string;
  description: string;
  path: string;
  breadcrumbId?: string;
  mainEntityId?: string;
};

export function buildWebPageData({
  name,
  description,
  path,
  breadcrumbId,
  mainEntityId,
}: WebPageData): WebPage {
  return {
    "@type": "WebPage",
    "@id": SCHEMA_IDS.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}
