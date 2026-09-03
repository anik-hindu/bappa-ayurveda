import type { WebSite } from "schema-dts";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { SCHEMA_IDS } from "./ids";

export const buildWebsiteData = (): WebSite => ({
  "@type": "WebSite",
  "@id": SCHEMA_IDS.website,

  url: SITE_URL,
  name: SITE_NAME,

  description:
    "Bappa Ayurveda explores classical Ayurvedic knowledge and formulations through modern standards of quality, research, and responsible education.",

  publisher: {
    "@id": SCHEMA_IDS.organization,
  },

  inLanguage: "en-IN",
});