import {
  BlogPreview,
  BrandStory,
  Hero,
  PieTeaser,
  ProductPreview,
} from "@/components/home/";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Bappa Ayurveda | Rooted in Science. Backed by Tradition.",
  },
  description:
    "Discover Bappa Ayurveda's approach to classical Ayurvedic formulations—thoughtfully crafted for modern life and held to modern standards.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Bappa Ayurveda | Rooted in Science. Backed by Tradition.",
    description:
      "Classical Ayurvedic formulations, thoughtfully crafted for modern life and held to modern standards.",
    url: "/",
    siteName: "Bappa Ayurveda",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Bappa Ayurveda — Rooted in Science. Backed by Tradition.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bappa Ayurveda | Rooted in Science. Backed by Tradition.",
    description:
      "Classical Ayurvedic formulations, thoughtfully crafted for modern life and held to modern standards.",
    images: ["/og/home.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <ProductPreview />
      <PieTeaser />
      <BlogPreview />
    </>
  );
}
