// Sanity Base
export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

// Content Types

export type Author = {
  _id: string;
  name: string;
  slug: SanitySlug;
  image: SanityImage;
  role: string;
  bio: string;
  linkedIn?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: SanitySlug;
  author: Author;
  category: Category;
  mainImage: SanityImage;
  excerpt: string;
  publishedAt: string;
  body: unknown[];
  likes?: number;
};
