import { absoluteUrl } from "@/lib/seo";
import type { DefinedTerm } from "schema-dts";

export type DefinedTermData = {
  id: string;
  name: string;
  description?: string;
  url: string;
};

/**
 * Represents a topical entity / tag in the entity graph.
 */
export function buildDefinedTermData({
  id,
  name,
  description,
  url,
}: DefinedTermData): DefinedTerm {
  return {
    "@type": "DefinedTerm",
    "@id": id,
    name,
    url: absoluteUrl(url),
    ...(description ? { description } : {}),
  };
}
