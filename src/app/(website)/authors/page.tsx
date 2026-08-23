import AuthorsGrid from "@/components/authors/AuthorsGrid";
import AuthorsHero from "@/components/authors/AuthorsHero";
import { getAllAuthors } from "@/sanity/lib/queries";

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <main>
      <AuthorsHero />

      <AuthorsGrid authors={authors} />
    </main>
  );
}
