import { absoluteUrl } from "@/lib/seo";
import type { AboutPage, BreadcrumbList } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export type AboutPageData = {
  name: string;
  description: string;
  path: string;
};

export function buildAboutPageData({
  name,
  description,
  path,
}: AboutPageData): [AboutPage, BreadcrumbList] {
  const url = absoluteUrl(path);

  const aboutPageNode: AboutPage = {
    "@type": "AboutPage",
    "@id": SCHEMA_IDS.webpage(path),
    url,
    name,
    description,
    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },
    publisher: {
      "@id": SCHEMA_IDS.organization,
    },
    mainEntity: {
      "@id": SCHEMA_IDS.organization,
    },
    breadcrumb: {
      "@id": SCHEMA_IDS.breadcrumb(path),
    },
    inLanguage: "en-IN",
  };

  const breadcrumbNode: BreadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_IDS.breadcrumb(path),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: url,
      },
    ],
  };

  return [aboutPageNode, breadcrumbNode];
}
