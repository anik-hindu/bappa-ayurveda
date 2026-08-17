import BlogPreview from "@/components/home/BlogPreview";
import BrandStory from "@/components/home/BrandStory";
import { Hero } from "@/components/home/Hero";
import PieTeaser from "@/components/home/PieTeaser";
import Product from "@/components/home/Product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Bappa Ayurveda",
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
      <Product />
      <PieTeaser />
      <BlogPreview />
    </main>
  );
}
