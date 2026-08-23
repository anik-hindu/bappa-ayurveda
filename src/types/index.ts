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
  alt?: string;
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
