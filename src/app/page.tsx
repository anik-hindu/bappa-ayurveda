import BlogCardShowcase from "@/components/blog/BlogCardShowcase";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Bappa Ayurveda",
};

export default function HomePage() {
  return (
    <main className="container-page min-h-screen items-center justify-center">
      <BlogCardShowcase />
    </main>
  );
}
