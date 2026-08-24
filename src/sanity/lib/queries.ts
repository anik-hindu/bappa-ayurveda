import { client } from "@/sanity/lib/client";
import { AuthorListItem, Category, Post, Tag } from "@/types/index";
import { CACHE_TAGS } from "./cache-tags";

// Posts
type PaginatedPostsResult = {
  posts: Post[];
  total: number;
};

type GetPaginatedPostsParams = {
  category: string;
  page: number;
  pageSize: number;
};

export async function getPaginatedPosts({
  category,
  page,
  pageSize,
}: GetPaginatedPostsParams): Promise<PaginatedPostsResult> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const categoryFilter =
    category === "all"
      ? `_type == "post"`
      : `_type == "post" && category->slug.current == $category`;

  return client.fetch(
    `{
      "posts": *[${categoryFilter}]
        | order(publishedAt desc)
        [${start}...${end}] {
          _id,
          title,
          slug,
          excerpt,
          body,
          mainImage,
          publishedAt,
          author-> {
            _id,
            name,
            slug,
            image,
            role
          },
          category-> {
            _id,
            name,
            slug
          }
        },

      "total": count(*[${categoryFilter}])
    }`,
    category === "all" ? {} : { category },
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `
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
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
  );
}

export async function getLatestPosts(count: number = 3): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...$count] {
      _id,
      title,
      slug,
      body,
      excerpt,
      mainImage,
      publishedAt,
      author-> { name, slug, image, role },
      category-> { name, slug }
    }`,
    { count: count },
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
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
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
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
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
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
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
  );
}

// Authors

export async function getAllAuthors(): Promise<AuthorListItem[]> {
  return client.fetch(
    `
    *[
      _type == "author" &&
      isActive == true
    ]
    | order(displayOrder asc) {
      _id,
      name,
      slug,
      image,
      role,
      shortBio,
      expertise,
      "articleCount": count(
        *[
          _type == "post" &&
          author._ref == ^._id &&
          defined(publishedAt)
        ]
      )
    }
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.authors, CACHE_TAGS.posts],
      },
    },
  );
}

export async function getAuthorWithPosts(slug: string) {
  return client.fetch(
    `
    *[
      _type == "author" &&
      slug.current == $slug &&
      isActive == true
    ][0] {
      _id,
      name,
      slug,
      image,
      bio,
      role,
      shortBio,
      expertise,
      linkedIn,

      "posts": *[
        _type == "post" &&
        author._ref == ^._id &&
        defined(publishedAt)
      ]
      | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        category-> {
          name,
          slug
        },
        author-> { name, slug, image, role },
      }
    }
    `,
    { slug },
    {
      next: {
        tags: [CACHE_TAGS.authors, CACHE_TAGS.posts],
      },
    },
  );
}

// Categories

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    `
    *[_type == "category"] | order(title asc) {
      _id,
      name,
      slug
    }
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.categories],
      },
    },
  );
}

// Static Params Helpers

export async function getAllPostSlugs() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `
    *[_type == "post"] { slug }
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
  );
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function getAllAuthorSlugs() {
  const authors = await client.fetch<{ slug: { current: string } }[]>(
    `
    *[_type == "author"] { slug }
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.authors],
      },
    },
  );
  return authors.map((a) => ({ slug: a.slug.current }));
}

export async function getAllCategorySlugs() {
  const categories = await client.fetch<{ slug: { current: string } }[]>(
    `
    *[_type == "category"] { slug }
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.categories],
      },
    },
  );
  return categories.map((c) => ({ slug: c.slug.current }));
}

// Tags

export async function getAllTags(): Promise<Tag[]> {
  return client.fetch(
    `
    *[
      _type == "tag" &&
      isActive == true &&
      count(
        *[
          _type == "post" &&
          defined(publishedAt) &&
          references(^._id)
        ]
      ) > 0
    ]
    | order(name asc) {
      _id,
      name,
      slug,
      description,
      isActive,

      "postCount": count(
        *[
          _type == "post" &&
          defined(publishedAt) &&
          references(^._id)
        ]
      )
    }
  `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.tags, CACHE_TAGS.posts],
      },
    },
  );
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  return client.fetch(
    `
    *[
      _type == "tag" &&
      slug.current == $slug &&
      isActive == true
    ][0] {
      _id,
      name,
      slug,
      description,
      isActive,

      "postCount": count(
        *[
          _type == "post" &&
          defined(publishedAt) &&
          references(^._id)
        ]
      )
    }
  `,
    { slug },
    {
      next: {
        tags: [CACHE_TAGS.tags, CACHE_TAGS.posts],
      },
    },
  );
}

type GetPaginatedTagPostsByIdParams = {
  tagId: string;
  page: number;
  pageSize: number;
};

export async function getPaginatedPostsByTagId({
  tagId,
  page,
  pageSize,
}: GetPaginatedTagPostsByIdParams): Promise<PaginatedPostsResult> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const postFilter = `
    _type == "post" &&
    defined(publishedAt) &&
    references($tagId)
  `;

  return client.fetch(
    `{
      "posts": *[
        ${postFilter}
      ]
      | order(publishedAt desc)
      [${start}...${end}] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        author-> {
          _id,
          name,
          slug,
          image,
          role
        },
        category-> {
          _id,
          name,
          slug
        }
      },

      "total": count(*[
        ${postFilter}
      ])
    }`,
    { tagId },
    {
      next: {
        tags: [CACHE_TAGS.tags, CACHE_TAGS.posts],
      },
    },
  );
}

export async function getAllTagSlugs() {
  const tags = await client.fetch<{ slug: { current: string } }[]>(
    `
      *[
        _type == "tag" &&
        isActive == true &&
        defined(slug.current)
      ] {
        slug
      }
    `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.tags],
      },
    },
  );

  return tags.map((tag) => ({
    slug: tag.slug.current,
  }));
}
