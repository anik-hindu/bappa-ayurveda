import type { DefinedTermSet } from "schema-dts";
import { absoluteUrl } from "@/lib/seo";
import { SCHEMA_IDS } from "./ids";

export type DefinedTermSetData = {
  path: string;
  name: string;
  description?: string;
  terms: Array<{
    id: string; 
    name: string;
    path: string;
  }>;
};

/**
 * Builds a schema-dts compliant DefinedTermSet node for a collection of taxonomy terms.
 */
export function buildDefinedTermSetData({
  path,
  name,
  description,
  terms,
}: DefinedTermSetData): DefinedTermSet {
  return {
    "@type": "DefinedTermSet",
    "@id": SCHEMA_IDS.definedTermSet(path),
    name,
    ...(description ? { description } : {}),
    url: absoluteUrl(path),
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      "@id": term.id,
      name: term.name,
      url: absoluteUrl(term.path),
    })),
  };
}