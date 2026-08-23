import { AuthorArticles, AuthorBio, AuthorHero } from "@/components/authors";
import { getAuthorWithPosts } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

type AuthorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  const author = await getAuthorWithPosts(slug);

  if (!author) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <AuthorHero author={author} />
      <AuthorBio author={author} />
      <AuthorArticles posts={author.posts} />
    </main>
  );
}
