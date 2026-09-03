import type { Metadata } from "next";

import { AuthorsGrid, AuthorsHero } from "@/components/authors";
import JsonLd from "@/components/seo/JsonLd";

import { absoluteUrl, buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbData,
  buildCollectionPageData,
  buildGraph,
  buildItemListData,
  buildOrganizationData,
  buildPersonData,
  buildWebsiteData,
  SCHEMA_IDS,
} from "@/lib/structured-data";
import { urlFor } from "@/sanity/lib/image";
import { getAllAuthors } from "@/sanity/lib/queries";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Authors",
  description:
    "Meet the authors and Ayurvedic contributors behind Bappa Ayurveda's educational content, editorial insights, and exploration of classical Ayurvedic knowledge.",
  path: "/authors",
  keywords: [
    "Bappa Ayurveda authors",
    "Ayurveda authors",
    "Ayurvedic education",
    "Ayurvedic knowledge",
    "classical Ayurveda",
  ],
  image: {
    url: "/og/authors.jpg",
    width: 1200,
    height: 630,
    alt: "Bappa Ayurveda Authors — Editorial and Ayurvedic contributors",
    type: "image/jpeg",
  },
});

export default async function AuthorsPage() {
  const authors = await getAllAuthors();
  const authorsPath = "/authors";

  const itemListId = SCHEMA_IDS.itemList(authorsPath);
  const breadcrumbId = SCHEMA_IDS.breadcrumb(authorsPath);

  // 1. CollectionPage host node
  const collectionPageNode = buildCollectionPageData({
    name: "Our Authors | Bappa Ayurveda",
    description:
      "Meet the authors and Ayurvedic contributors behind Bappa Ayurveda's educational content, editorial insights, and exploration of classical Ayurvedic knowledge.",
    path: authorsPath,
    breadcrumbId,
    mainEntityId: itemListId,
  });

  // 2. ItemList node referencing Person @ids
  const itemListNode = buildItemListData({
    path: authorsPath,
    name: "Bappa Ayurveda Authors",
    items: authors.map((author) => {
      const authorPath = `/authors/${author.slug.current}`;
      return {
        name: author.name,
        id: SCHEMA_IDS.person(authorPath),
        path: authorPath,
      };
    }),
    totalItems: authors.length,
  });

  // 3. Entity Person nodes matching the exact IDs referenced by the ItemList above
  const personNodes = authors.map((author) => {
    const authorPath = `/authors/${author.slug.current}`;
    const imageUrl = author.image?.asset?._ref
      ? urlFor(author.image).width(400).height(400).url()
      : undefined;

    return buildPersonData({
      id: SCHEMA_IDS.person(authorPath),
      name: author.name,
      url: absoluteUrl(authorPath),
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(author.role ? { jobTitle: author.role } : {}),
    });
  });

  // 4. Breadcrumb trail
  const breadcrumbNode = buildBreadcrumbData([
    { name: "Home", path: "/" },
    { name: "Authors", path: authorsPath },
  ]);

  // Construct unified graph
  const authorsGraph = buildGraph([
    buildOrganizationData(),
    buildWebsiteData(),
    collectionPageNode,
    itemListNode,
    breadcrumbNode,
    ...personNodes,
  ]);

  return (
    <>
      <JsonLd data={authorsGraph} />
      <AuthorsHero />
      <AuthorsGrid authors={authors} />
    </>
  );
}