import type { Organization, WithContext } from "schema-dts";
import { SITE_NAME, SITE_URL } from "../seo";

export const buildOrganizationData = (): WithContext<Organization> => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
  };
};
