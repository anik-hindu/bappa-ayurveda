import {
  BlogPreview,
  BrandStory,
  Hero,
  PieTeaser,
  ProductPreview,
} from "@/components/home/";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Bappa Ayurveda",
};

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center"
      tabIndex={-1}
    >
      <Hero />
      <BrandStory />
      <ProductPreview />
      <PieTeaser />
      <BlogPreview />
    </main>
  );
}
