import type { Person } from "schema-dts";

export type PersonData = {
  id: string;
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
  knowsAbout?: string[];
};

/**
 * Builds a Person node with explicit identity and canonical URLs.
 */
export function buildPersonData({
  id,
  name,
  url,
  image,
  jobTitle,
  sameAs,
  knowsAbout,
}: PersonData): Person {
  return {
    "@type": "Person",
    "@id": id,
    name,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    ...(jobTitle ? { jobTitle } : {}),
    ...(sameAs?.length ? { sameAs } : {}),
    ...(knowsAbout?.length ? { knowsAbout } : {}),
  };
}