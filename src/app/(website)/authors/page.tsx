import { AuthorsGrid, AuthorsHero } from "@/components/authors/";
import { getAllAuthors } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors",
};

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <main>
      <AuthorsHero />

      <AuthorsGrid authors={authors} />
    </main>
  );
}
