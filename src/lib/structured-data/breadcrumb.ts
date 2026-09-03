import { absoluteUrl } from "@/lib/seo";
import type { BreadcrumbList, ListItem } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Builds a schema-dts compliant BreadcrumbList node.
 * @param items - An array of BreadcrumbItem objects.
 * @returns A BreadcrumbList object.
 * Requires at least one BreadcrumbItem via a non-empty tuple type signature.
 */
export function buildBreadcrumbData(
  items: BreadcrumbItem[]
): BreadcrumbList {
  const currentPath = items[items.length - 1]?.path ?? "/";

  const itemListElement: ListItem[] = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  }));

  return {
    "@type": "BreadcrumbList",
    "@id": SCHEMA_IDS.breadcrumb(currentPath),
    "name": "Breadcrumbs",
    itemListElement,
  };
}
