import { absoluteUrl } from "@/lib/seo";
import type { ItemList, ListItem } from "schema-dts";
import { SCHEMA_IDS } from "./ids";

export type ItemListElement = {
  name: string;
  id: string; // Enforces entity identity ownership at the call site
  path?: string;
};

export type ItemListData = {
  path: string;
  name: string;
  items: ItemListElement[];
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
};

/**
 * Builds an ItemList node linking list items directly to their target entity @ids.
 */
export function buildItemListData({
  path,
  name,
  items,
  currentPage = 1,
  pageSize = 9,
  totalItems,
}: ItemListData): ItemList {
  const startIndex = (currentPage - 1) * pageSize;

  const itemListElement: ListItem[] = items.map((item, index) => ({
    "@type": "ListItem",
    position: startIndex + index + 1,
    name: item.name,
    item: {
      "@id": item.id,
      ...(item.path ? { url: absoluteUrl(item.path) } : {}),
    },
  }));

  return {
    "@type": "ItemList",
    "@id": SCHEMA_IDS.itemList(path),
    name,
    numberOfItems: totalItems ?? items.length,
    itemListElement,
  };
}
