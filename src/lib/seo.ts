import type { Metadata } from "next";

/**
 * ---------------------------------------------------------------------------
 * Environment & Site Configuration
 * ---------------------------------------------------------------------------
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL environment variable is missing. " +
      "Please define it in your environment config (e.g. .env.local or deployment settings).",
  );
}

/**
 * The primary base URL of the website.
 * Guaranteed to be non-null at runtime.
 */
export const SITE_URL: string = siteUrl;

/** Primary application and official brand name. */
export const SITE_NAME: string = "Bappa Ayurveda";

/** Shortened brand identity used for compact UI placements or micro-badges. */
export const SITE_SHORT_NAME: string = "Bappa";

/** Default fallback page title used when a route does not supply an explicit title. */
export const DEFAULT_TITLE: string =
  "Bappa Ayurveda: Rooted in Science, Backed by Tradition";

/** Default meta description used for general web crawling and social preview fallbacks. */
export const DEFAULT_DESCRIPTION: string =
  "Explore Ayurveda through educational and editorial content rooted in traditional knowledge.";

/** Default ISO language-territory locale tag applied to Open Graph configurations. */
export const DEFAULT_LOCALE: string = "en_IN";

/**
 * Default Open Graph preview image metadata applied when a page does not supply a custom image.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/og/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Bappa Ayurveda",
  type: "image/jpeg",
} as const;

/**
 * ---------------------------------------------------------------------------
 * Types & Interfaces
 * ---------------------------------------------------------------------------
 */

/**
 * Image descriptor object for social media preview cards (Open Graph & Twitter).
 */
export type OgImageDescriptor = {
  /** Relative path (e.g., `"/og/blog.jpg"`) or fully qualified external URL. */
  url: string;
  /** Alt text description for screen readers and accessibility tools. */
  alt: string;
  /** Image width in pixels. */
  width?: number;
  /** Image height in pixels. */
  height?: number;
  /** Image MIME type (e.g., `"image/jpeg"`, `"image/png"`). */
  type?: string;
};

/**
 * Article-specific metadata attributes applied when building metadata for editorial or blog content.
 */
export type ArticleMetadata = {
  /** ISO 8601 formatted publication timestamp string (e.g., `"2026-02-15T08:00:00Z"`). */
  publishedTime?: string;
  /** ISO 8601 formatted modification timestamp string. */
  modifiedTime?: string;
  /** Array of author names or URLs associated with the article. */
  authors?: string[];
  /** Primary category or section classification (e.g., `"Herbology"`). */
  section?: string;
};

/**
 * Options configuration passed into {@link buildPageMetadata} for generating Next.js metadata objects.
 */
export type BuildMetadataOptions = {
  /**
   * Page title string.
   *
   * @remarks
   * By default, this title will be formatted by the layout template:
   * `"<title> | Bappa Ayurveda"`.
   */
  title: string;

  /**
   * Bypasses the root layout's title template string (`%s | Bappa Ayurveda`).
   *
   * @defaultValue `false`
   *
   * @remarks
   * Set to `true` on the home page or landing pages to prevent doubled brand titles.
   */
  absoluteTitle?: boolean;

  /**
   * Page-specific meta description string.
   *
   * @defaultValue {@link DEFAULT_DESCRIPTION}
   */
  description?: string;

  /**
   * Relative path segment or route path for canonical URL generation.
   *
   * @example `"/blog/what-is-ayurveda"`
   */
  path: string;

  /**
   * Optional keyword metadata.
   *
   * @remarks
   * Major search engines (such as Google) do not use the meta keywords tag for ranking.
   * Only include this when another consumer or internal utility explicitly benefits from it.
   */
  keywords?: string[];

  /**
   * Custom Open Graph preview image descriptor.
   *
   * @defaultValue {@link DEFAULT_OG_IMAGE}
   */
  image?: OgImageDescriptor;

  /**
   * Instructs search crawlers to exclude the route from search index results while continuing to follow links.
   *
   * @defaultValue `false`
   */
  noIndex?: boolean;

  /**
   * Open Graph content classification type.
   * Set to `"article"` for blog posts, tutorials, or long-form editorial content.
   *
   * @defaultValue `"website"`
   */
  type?: "website" | "article";

  /**
   * Supplementary Open Graph article metadata properties applied when {@link BuildMetadataOptions.type} is set to `"article"`.
   */
  article?: ArticleMetadata;
};

/**
 * ---------------------------------------------------------------------------
 * Utility Helpers
 * ---------------------------------------------------------------------------
 */

/**
 * Converts a relative path segment or absolute URL into a fully qualified URL using {@link SITE_URL}.
 *
 * @param pathOrUrl - A relative path (e.g., `"/blog"`) or an absolute URL string.
 * @returns Fully qualified absolute URL string.
 *
 * @example
 * ```ts
 * absoluteUrl("/blog");
 * // => "[https://bappaayurveda.com/blog](https://bappaayurveda.com/blog)"
 *
 * absoluteUrl("[https://cdn.example.com/hero.jpg](https://cdn.example.com/hero.jpg)");
 * // => "[https://cdn.example.com/hero.jpg](https://cdn.example.com/hero.jpg)"
 * ```
 */
export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

/**
 * Normalizes an Open Graph image descriptor by resolving its `url` property to an absolute URL.
 *
 * @param image - The input {@link OgImageDescriptor} object to process.
 * @returns Normalized image descriptor containing a fully qualified absolute URL string.
 *
 * @defaultValue {@link DEFAULT_OG_IMAGE}
 */
export function normalizeImage(
  image: OgImageDescriptor = DEFAULT_OG_IMAGE,
): OgImageDescriptor {
  return {
    ...image,
    url: absoluteUrl(image.url),
  };
}

/**
 * ---------------------------------------------------------------------------
 * Metadata Builder
 * ---------------------------------------------------------------------------
 */

/**
 * Generates a standard, strongly typed Next.js {@link Metadata} object for page routes.
 * Handles meta descriptions, canonical paths, Open Graph parameters, Twitter cards, and crawl instructions.
 *
 * @param options - Configuration settings defined in {@link BuildMetadataOptions}.
 * @returns Formatted {@link Metadata} object ready to be exported by page routes or `generateMetadata` functions.
 *
 * @example
 * ```ts
 * // app/about/page.tsx
 * import { buildPageMetadata } from "@/lib/seo";
 *
 * export const metadata = buildPageMetadata({
 *   title: "About Us",
 *   description: "Learn about Bappa Ayurveda's mission and history.",
 *   path: "/about",
 * });
 * ```
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  noIndex = false,
  type = "website",
  article,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const ogImage = normalizeImage(image);
  const canonicalUrl = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,

    description: metaDescription,

    ...(keywords?.length ? { keywords } : {}),

    alternates: {
      canonical: path,
    },

    openGraph: {
      type,
      locale: DEFAULT_LOCALE,
      siteName: SITE_NAME,
      title,
      description: metaDescription,
      url: canonicalUrl,

      images: [
        {
          url: ogImage.url,
          alt: ogImage.alt,
          ...(ogImage.width !== undefined ? { width: ogImage.width } : {}),
          ...(ogImage.height !== undefined ? { height: ogImage.height } : {}),
          ...(ogImage.type ? { type: ogImage.type } : {}),
        },
      ],

      ...(type === "article" && article
        ? {
            ...(article.publishedTime
              ? { publishedTime: article.publishedTime }
              : {}),
            ...(article.modifiedTime
              ? { modifiedTime: article.modifiedTime }
              : {}),
            ...(article.authors?.length ? { authors: article.authors } : {}),
            ...(article.section ? { section: article.section } : {}),
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [ogImage.url],
    },

    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
  };
}
