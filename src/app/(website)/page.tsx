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
    absolute: "Bappa Ayurveda | Rooted in Science, Backed by Tradition",
  },
  description:
    "Explore Ayurveda through traditional knowledge, modern science, and responsible wellness education with Bappa Ayurveda.",
  openGraph: {
    title: "Bappa Ayurveda | Rooted in Science, Backed by Tradition",
    description:
      "Explore Ayurveda through traditional knowledge, modern science, and responsible wellness education with Bappa Ayurveda.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bappa Ayurveda | Rooted in Science, Backed by Tradition",
    description:
      "Explore Ayurveda through traditional knowledge, modern science, and responsible wellness education with Bappa Ayurveda.",
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
