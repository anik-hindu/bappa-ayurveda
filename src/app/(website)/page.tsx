import {
  BlogPreview,
  BrandStory,
  Hero,
  PieTeaser,
  ProductPreview,
} from "@/components/home/";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { buildOrganizationData } from "@/lib/structured-data/organization";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Bappa Ayurveda | Rooted in Science. Backed by Tradition.",
  description:
    "Discover Bappa Ayurveda's approach to classical Ayurvedic formulations—thoughtfully crafted for modern life and held to modern standards.",
  path: "/",
  absoluteTitle: true,
  image: {
    url: "/og/home.jpg",
    width: 1200,
    height: 630,
    alt: "Bappa Ayurveda — Rooted in Science. Backed by Tradition.",
    type: "image/jpeg",
  },
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <ProductPreview />
      <PieTeaser />
      <BlogPreview />
      <JsonLd data={buildOrganizationData()} />
    </>
  );
}
