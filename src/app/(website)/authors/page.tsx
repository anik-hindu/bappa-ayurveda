import { AuthorsGrid, AuthorsHero } from "@/components/authors";
import { getAllAuthors } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Authors",
  description:
    "Meet the people behind Bappa Ayurveda's editorial content, Ayurvedic education, and classical knowledge.",
  alternates: {
    canonical: "/authors",
  },
};

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <>
      <AuthorsHero />
      <AuthorsGrid authors={authors} />
    </>
  );
}
