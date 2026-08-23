import { AuthorArticles, AuthorBio, AuthorHero } from "@/components/authors/";
import { getAuthorWithPosts } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

type AuthorPageProps = {
  params: {
    slug: string;
  };
};
export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorWithPosts(slug);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <AuthorHero author={author} />

      <AuthorBio author={author} />

      <AuthorArticles posts={author.posts} articleCount={author.posts.length} />
    </main>
  );
}
