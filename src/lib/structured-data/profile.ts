import type { ProfilePage } from "schema-dts";
import { absoluteUrl } from "@/lib/seo";
import { SCHEMA_IDS } from "./ids";

export type ProfilePageData = {
  name: string;
  description: string;
  path: string;
  personId: string;
  breadcrumbId?: string;
  mainEntityId?: string;
  image?: string;
};

/**
 * Builds a schema-dts compliant ProfilePage node representing an author's profile.
 */
export function buildProfilePageData({
  name,
  description,
  path,
  personId,
  breadcrumbId,
  mainEntityId,
  image,
}: ProfilePageData): ProfilePage {
  return {
    "@type": "ProfilePage",
    "@id": SCHEMA_IDS.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    mainEntity: {
      "@id": personId,
    },
    isPartOf: {
      "@id": SCHEMA_IDS.website,
    },
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
    ...(image ? { image: [image] } : {}),
    ...(mainEntityId ? { hasPart: [{ "@id": mainEntityId }] } : {}),
  };
}