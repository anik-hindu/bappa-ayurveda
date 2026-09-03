import type { Metadata } from "next";

import JsonLd from "@/components/seo/JsonLd";
import { TagsList, TagsHero } from "@/components/tags";

import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbData,
  buildCollectionPageData,
  buildDefinedTermData,
  buildDefinedTermSetData,
  buildGraph,
  buildOrganizationData,
  buildWebsiteData,
  SCHEMA_IDS,
} from "@/lib/structured-data";
import { getAllTags } from "@/sanity/lib/queries";

export const metadata: Metadata = buildPageMetadata({
  title: "All Tags",
  description:
    "Explore Ayurvedic topics, terminology, and classical health concepts organized by tag on Bappa Ayurveda.",
  path: "/tags",
  keywords: [
    "Ayurveda tags",
    "Ayurvedic topics",
    "Ayurvedic terms",
    "classical Ayurveda index",
  ],
});

export default async function TagsIndexPage() {
  const tags = await getAllTags();
  const tagsPath = "/tags";

  const termSetId = SCHEMA_IDS.definedTermSet(tagsPath);
  const breadcrumbId = SCHEMA_IDS.breadcrumb(tagsPath);

  // 1. CollectionPage host node
  const collectionPageNode = buildCollectionPageData({
    name: "All Tags | Bappa Ayurveda",
    description:
      "Explore Ayurvedic topics, terminology, and classical health concepts organized by tag on Bappa Ayurveda.",
    path: tagsPath,
    breadcrumbId,
    mainEntityId: termSetId,
  });

  // 2. DefinedTermSet node containing canonical term references
  const termSetNode = buildDefinedTermSetData({
    path: tagsPath,
    name: "Bappa Ayurveda Topic Taxonomy",
    description: "Complete list of Ayurvedic topics and terminology tags.",
    terms: tags.map((tag) => {
      const tagPath = `/tags/${tag.slug.current}`;
      return {
        id: SCHEMA_IDS.definedTerm(tagPath),
        name: tag.name,
        path: tagPath,
      };
    }),
  });

  // 3. Independent DefinedTerm nodes matching the exact @ids in the term set above
  const termNodes = tags.map((tag) => {
    const tagPath = `/tags/${tag.slug.current}`;
    return buildDefinedTermData({
      id: SCHEMA_IDS.definedTerm(tagPath),
      name: tag.name,
      url: absoluteUrl(tagPath),
      ...(tag.description ? { description: tag.description.trim() } : {}),
    });
  });

  // 4. Breadcrumb trail
  const breadcrumbNode = buildBreadcrumbData([
    { name: "Home", path: "/" },
    { name: "Tags", path: tagsPath },
  ]);

  // Unified Graph Construction
  const tagsGraph = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    collectionPageNode,
    termSetNode,
    breadcrumbNode,
    ...termNodes,
  ]);

  return (
    <>
      <JsonLd data={tagsGraph} />
      <TagsHero />
      <TagsList tags={tags} />
    </>
  );
}
