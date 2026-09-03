import { PortableTextBlock } from "@portabletext/types";
import { ImageCrop, ImageHotspot } from "@sanity/types";
import type { StaticImageData } from "next/image";

// Sanity Base

export type SanityImage = {
  _type: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  caption?: string;
  crop?: ImageCrop;
  hotspot?: ImageHotspot;
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
  image?: SanityImage;
  role?: string;
  shortBio?: string;
  bio?: PortableTextBlock[];
  expertise?: string[];
  linkedIn?: string;
  isActive: boolean;
  displayOrder: number;
};

export type Category = {
  _id: string;
  name: string;
  slug: SanitySlug;
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
  body: PortableTextBlock[];
};

export type PostDetail = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  body: PortableTextBlock[];
  mainImage: SanityImage;
  publishedAt: string;
  updatedAt?: string;

  author: {
    _id: string;
    name: string;
    slug: SanitySlug;
    image?: SanityImage;
    shortBio?: string;
    role?: string;
  };

  category: {
    _id: string;
    name: string;
    slug: SanitySlug;
  };

  tags: {
    _id: string;
    name: string;
    slug: SanitySlug;
  }[];
};

// NavLink

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

// Credibility Bar types

export type CredibilityItem = {
  label: string;
  description: string;
  img: StaticImageData;
};

// Hero Types
export type TrustItem = {
  label: string;
  img: StaticImageData;
};

// Author Listing

export type AuthorListItem = {
  _id: string;
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  role?: string;
  shortBio?: string;
  expertise?: string[];
  articleCount: number;
};

// Author Detail Page

export type AuthorDetail = {
  _id: string;
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  role?: string;
  shortBio?: string;
  bio?: PortableTextBlock[];
  expertise?: string[];
  linkedIn?: string;
  posts: Post[];
  articleCount: number;
};

// Tag

export type Tag = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  isActive: boolean;
  postCount: number;
};

// Faq

export type FAQItem = {
  _key: string;
  _type: "faq";
  question: string;
  answer: PortableTextBlock[];
};

export type AuthorWithPosts = {
  _id: string;
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: PortableTextBlock[];
  role?: string;
  shortBio?: string;
  expertise?: string[];
  linkedIn?: string;
  posts: Post[];
  articleCount: number;
};

export type GetAuthorWithPostsResult = AuthorWithPosts | null;
