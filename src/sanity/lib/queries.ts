import { client } from "@/sanity/lib/client";
import { Author, Category, Post } from "@/types/index";

// Posts

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author-> { _id, name, slug, image, role },
      category-> { _id, name, slug }
    }
  `);
}

export async function getLatestPosts(count: number = 3): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$count] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author-> { name, slug },
      category-> { name, slug }
    }`,
    { count: count },
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      mainImage,
      publishedAt,
      excerpt,
      author-> { _id, name, slug, image, bio, role },
      category-> { _id, name, slug }
    }`,
    { slug },
  );
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && category->slug.current == $slug]
     | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author-> { name, slug },
      category-> { name, slug }
    }`,
    { slug },
  );
}

export async function getRelatedPosts(
  categoryId: string,
  currentSlug: string,
): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"
       && category._ref == $categoryId
       && slug.current != $currentSlug
     ] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      category-> { name, slug }
    }`,
    { categoryId, currentSlug },
  );
}

// Authors

export async function getAllAuthors(): Promise<Author[]> {
  return client.fetch(`
    *[_type == "author"] {
      _id,
      name,
      slug,
      image,
      bio,
      role,
      linkedIn
    }
  `);
}

export async function getAuthorWithPosts(slug: string) {
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      bio,
      role,
      linkedIn,
      "posts": *[_type == "post" && author->slug.current == $slug]
               | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        category-> { name, slug }
      }
    }`,
    { slug },
  );
}

// Categories

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      name,
      slug
    }
  `);
}

// Static Params Helpers

export async function getAllPostSlugs() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(`
    *[_type == "post"] { slug }
  `);
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function getAllAuthorSlugs() {
  const authors = await client.fetch<{ slug: { current: string } }[]>(`
    *[_type == "author"] { slug }
  `);
  return authors.map((a) => ({ slug: a.slug.current }));
}

export async function getAllCategorySlugs() {
  const categories = await client.fetch<{ slug: { current: string } }[]>(`
    *[_type == "category"] { slug }
  `);
  return categories.map((c) => ({ slug: c.slug.current }));
}
