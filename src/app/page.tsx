import BlogList from "@/components/blog/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Bappa Ayurveda",
};

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center"
      tabIndex={-1}
    >
      <div className="space-y-4 text-center">
        <BlogList />
      </div>
    </main>
  );
}
