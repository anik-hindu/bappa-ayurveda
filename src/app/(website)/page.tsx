import {
  BlogPreview,
  BrandStory,
  Hero,
  PieTeaser,
  ProductPreview,
} from "@/components/home/";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    absolute: "Bappa Ayurveda | Rooted in Science, Backed by Tradition",
  },
  description:
    "Explore Ayurveda through traditional knowledge, modern science, and responsible wellness education with Bappa Ayurveda.",
  alternates: {
    canonical: BASE_URL,
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
