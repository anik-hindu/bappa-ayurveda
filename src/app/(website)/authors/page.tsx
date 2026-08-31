import { AuthorsGrid, AuthorsHero } from "@/components/authors";
import { getAllAuthors } from "@/sanity/lib/queries";
import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

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

  return (
    <>
      <AuthorsHero />
      <AuthorsGrid authors={authors} />
    </>
  );
}
