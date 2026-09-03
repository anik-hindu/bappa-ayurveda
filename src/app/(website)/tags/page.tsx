import JsonLd from "@/components/seo/JsonLd";
import TagsHero from "@/components/tags/TagsHero";
import TagsList from "@/components/tags/TagsList";

import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbData,
  buildCollectionPageData,
  buildGraph,
  buildOrganizationData,
  buildWebsiteData,
} from "@/lib/structured-data/";

import { getAllTags } from "@/sanity/lib/queries";

import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Ayurveda Topics & Tags",
  description:
    "Browse Ayurveda topics and editorial tags from Bappa Ayurveda, covering classical knowledge, wellness, herbs, formulations, and related subjects.",
  path: "/tags",
});

export default async function TagsPage() {
  const tags = await getAllTags();

  const collectionPageNode = buildCollectionPageData({
    name: "Ayurveda Topics & Tags",
    description:
      "Browse Ayurveda topics and editorial tags from Bappa Ayurveda, covering classical knowledge, wellness, herbs, formulations, and related subjects.",
    path: "/tags",
  });

  const breadcrumbNode = buildBreadcrumbData([
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Tags",
      path: "/tags",
    },
  ]);

  const jsonLd = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    collectionPageNode,
    breadcrumbNode,
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <TagsHero />
      <TagsList tags={tags} />
    </>
  );
}
