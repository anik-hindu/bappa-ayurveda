import {
  BlogPreview,
  BrandStory,
  Hero,
  PieTeaser,
  ProductPreview,
} from "@/components/home/";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <Hero />
      <BrandStory />
      <ProductPreview />
      <PieTeaser />
      <BlogPreview />
    </main>
  );
}
