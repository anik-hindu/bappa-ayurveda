import type { Metadata } from "next";

/**
 * ---------------------------------------------------------------------------
 * Site configuration
 * ---------------------------------------------------------------------------
 */

/**
 * The base URL of the website.
 * Pulls from the `NEXT_PUBLIC_SITE_URL` environment variable, falling back to production domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bappaayurveda.com";

/** Primary application and brand name. */
export const SITE_NAME = "Bappa Ayurveda";

/** Shortened brand identity used for compact UI placements or site tags. */
export const SITE_SHORT_NAME = "Bappa";

/** Fallback page title used when no specific route title is supplied. */
export const DEFAULT_TITLE =
  "Bappa Ayurveda: Rooted in Science, Backed by Tradition";

/** Default fallback meta description for general web crawling and social previews. */
export const DEFAULT_DESCRIPTION =
  "Explore Ayurveda through educational and editorial content rooted in traditional knowledge.";

/** Default ISO language-territory locale tag for Open Graph configurations. */
export const DEFAULT_LOCALE = "en_IN";

/**
 * Default Open Graph preview image metadata applied when a page does not supply a custom image.
 * Uses `as const` to ensure type immutability.
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
 * Types
 * ---------------------------------------------------------------------------
 */

/**
 * Represents a root-relative URI string starting with a slash (`/`).
 * Preferred for canonical routing and relative asset definitions.
 */
export type SitePath = `/${string}`;

/**
 * Image descriptor object for social media preview cards (Open Graph & Twitter).
 */
export type OgImageDescriptor = {
  /** Relative path (e.g. `"/og/blog.jpg"`) or fully qualified external URL. */
  url: string;
  /** Alt text description for screen readers and accessibility. */
  alt: string;
  /** Image width in pixels. */
  width?: number;
  /** Image height in pixels. */
  height?: number;
  /** Image MIME type (e.g. `"image/jpeg"`, `"image/png"`). */
  type?: string;
};

/**
 * Options configuration for building page-level Next.js metadata.
 */
export type BuildMetadataOptions = {
  /**
   * Page title.
   *
   * @remarks
   * The root layout's title template will automatically append:
   * `"| Bappa Ayurveda"`
   */
  title: string;

  /**
   * Page-specific meta description.
   *
   * @defaultValue {@link DEFAULT_DESCRIPTION}
   */
  description?: string;

  /**
   * Canonical page path segment.
   *
   * @example `"/blog/what-is-ayurveda"`
   */
  path: SitePath;

  /**
   * Optional array of page-specific keywords for meta search hints.
   *
   * @remarks
   * Do not add keywords unless they genuinely describe the page content.
   */
  keywords?: string[];

  /**
   * Optional Open Graph preview image object.
   *
   * @defaultValue {@link DEFAULT_OG_IMAGE}
   */
  image?: OgImageDescriptor;

  /**
   * Flag to prevent search engine indexing while allowing link crawling.
   *
   * @defaultValue `false`
   */
  noIndex?: boolean;

  /**
   * Open Graph content classification type.
   * Use `"article"` for blog or editorial routes.
   *
   * @defaultValue `"website"`
   */
  type?: "website" | "article";
};

/**
 * ---------------------------------------------------------------------------
 * URL helpers
 * ---------------------------------------------------------------------------
 */

/**
 * Converts a root-relative path or fully qualified URL string into a complete absolute URL using {@link SITE_URL}.
 *
 * @param pathOrUrl - A relative path (e.g. `"/blog"`) or an absolute URL (e.g. `"https://cdn.example.com/image.jpg"`).
 * @returns Fully qualified absolute URL string.
 *
 * @example
 * ```ts
 * absoluteUrl("/blog")
 * // Output: "[https://bappaayurveda.com/blog](https://bappaayurveda.com/blog)"
 *
 * absoluteUrl("[https://cdn.example.com/image.jpg](https://cdn.example.com/image.jpg)")
 * // Output: "[https://cdn.example.com/image.jpg](https://cdn.example.com/image.jpg)"
 * ```
 */
export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

/**
 * ---------------------------------------------------------------------------
 * Image helpers
 * ---------------------------------------------------------------------------
 */

/**
 * Normalizes an Open Graph image descriptor object by resolving its `url` field into an absolute URL.
 *
 * @remarks
 * Caller-supplied images retain their explicit custom dimensions and MIME types rather than falling
 * back on {@link DEFAULT_OG_IMAGE} dimension properties.
 *
 * @param image - The image descriptor object to process.
 * @returns A normalized {@link OgImageDescriptor} with an absolute URL string.
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
 * Metadata builder
 * ---------------------------------------------------------------------------
 */

/**
 * Builds a structured, reusable Next.js {@link Metadata} object tailored for page routes.
 * Handles titles, descriptions, canonical references, Open Graph tags, Twitter card specifications, and robot instructions.
 *
 * @param options - Configuration options defined in {@link BuildMetadataOptions}.
 * @returns Formatted Next.js `Metadata` object ready for export in page routes.
 *
 * @remarks
 * This helper exclusively generates standard page-level HTML metadata. It intentionally does **not** handle:
 * - Sanity CMS client queries
 * - Dynamic `sitemap.xml` generation
 * - Dynamic `robots.txt` generation
 * - JSON-LD Structured Data insertion
 * - Web App Manifest file generation
 *
 * @example
 * ```ts
 * // app/blog/[slug]/page.tsx
 * import { buildPageMetadata } from "@/lib/seo";

 * export function generateMetadata(): Metadata {
 *   return buildPageMetadata({
 *     title: "Understanding Ashwagandha Benefits",
 *     description: "A deep dive into classical Ayurvedic formulations.",
 *     path: "/blog/understanding-ashwagandha-benefits",
 *     type: "article",
 *   });
 * }
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
}: BuildMetadataOptions): Metadata {
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const ogImage = normalizeImage(image);
  const canonicalUrl = absoluteUrl(path);

  return {
    title,

    description: metaDescription,

    ...(keywords?.length
      ? {
          keywords,
        }
      : {}),

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
