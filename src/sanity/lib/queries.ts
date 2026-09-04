import { client } from "@/sanity/lib/client";
import {
  AuthorListItem,
  Category,
  GetAuthorWithPostsResult,
  Post,
  PostDetail,
  Tag,
  PopularPost
} from "@/types/index";
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

export async function getPost(slug: string): Promise<PostDetail | null> {
  return client.fetch(
    `
    *[
      _type == "post" &&
      slug.current == $slug &&
      defined(publishedAt) &&
      publishedAt <= now()
    ][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      mainImage,
      publishedAt,
      updatedAt,

      author-> {
        _id,
        name,
        slug,
        image,
        shortBio,
        role
      },

      category-> {
        _id,
        name,
        slug
      },

      tags[]-> {
        _id,
        name,
        slug
      },
    }
    `,
    { slug },
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
  );
}

export async function getPopularPosts(
  currentSlug: string,
  limit: number = 4,
): Promise<PopularPost[]> {
  return client.fetch(
    `
    *[
      _type == "post" &&
      slug.current != $currentSlug &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      popularityScore > 0
    ]
    | order(popularityScore desc, publishedAt desc)
    [0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      popularityScore,

      category-> {
        _id,
        name,
        slug
      }
    }
  `,
    {
      currentSlug,
      limit,
    },
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
  postId: string,
  categoryId: string,
  tagIds: string[],
): Promise<Post[]> {
  return client.fetch(
    `
    *[
      _type == "post" &&
      _id != $postId &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      (
        category._ref == $categoryId ||
        references($tagIds)
      )
    ]
    {
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
      },

      "sharedTagCount": count(
        tags[@._ref in $tagIds]
      ),

      "sameCategory": category._ref == $categoryId
    }
    | order(sharedTagCount desc, sameCategory desc, publishedAt desc)
    [0...3]
    `,
    {
      postId,
      categoryId,
      tagIds,
    },
    {
      next: {
        tags: [CACHE_TAGS.posts],
      },
    },
  );
}

// Authors

export async function getFeaturedAuthors(): Promise<AuthorListItem[]> {
  return client.fetch(
    `
    *[
      _type == "author" &&
      isActive == true &&
      featuredOnHomepage == true
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
          defined(publishedAt) &&
          publishedAt <= now()
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

export async function getAuthorWithPosts(
  slug: string,
): Promise<GetAuthorWithPostsResult> {
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
        body,
      },
      "articleCount": count(
        *[
          _type == "post" &&
          author._ref == ^._id &&
          defined(publishedAt)
        ]
      )
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
  return client.fetch<
    {
      slug: string;
      updatedAt?: string;
      publishedAt: string;
    }[]
  >(
    `
      *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt)
      ] {
        "slug": slug.current,
        updatedAt,
        publishedAt
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

export async function getAllAuthorSlugs() {
  const authors = await client.fetch<{ slug: { current: string } }[]>(
    `
      *[
        _type == "author" &&
        isActive == true &&
        defined(slug.current)
      ] {
        slug
      }
    `,
    {},
    {
      next: {
        tags: [CACHE_TAGS.authors],
      },
    },
  );

  return authors.map((author) => ({
    slug: author.slug.current,
  }));
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

export async function getPopularTags(limit = 8): Promise<Tag[]> {
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
    ] {
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
    | order(postCount desc)
    [0...$limit]
  `,
    { limit },
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
