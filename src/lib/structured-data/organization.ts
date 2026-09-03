import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Organization } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export const buildOrganizationData = (): Organization => ({
  "@type": "Organization",
  "@id": SCHEMA_IDS.organization,

  name: SITE_NAME,
  url: SITE_URL,
  slogan: "Rooted in Science. Backed by Tradition.",
  description:
    "Classical Ayurvedic formulations thoughtfully crafted for modern life and held to modern standards.",

  logo: {
    "@type": "ImageObject",
    "@id": SCHEMA_IDS.logo,
    url: `${SITE_URL}/images/logo.jpeg`,
    caption: SITE_NAME,
  },

  image: `${SITE_URL}/images/logo.jpeg`,
  founder: {
    "@id": SCHEMA_IDS.founder,
  },

  sameAs: ["https://www.linkedin.com/company/bappa-ayurveda/"],

  knowsAbout: [
    "Ayurveda",
    "Ayurvedic formulations",
    "Herbal medicine",
    "Wellness",
  ],
});
