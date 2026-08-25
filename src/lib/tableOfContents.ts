import type { PortableTextBlock } from "@portabletext/types";

export interface TableOfContentsItem {
  key: string;
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extract H2/H3 headings from Portable Text and generate
 * deterministic, unique IDs.
 */
export function extractTableOfContents(
  body?: PortableTextBlock[] | null,
): TableOfContentsItem[] {
  if (!body?.length) {
    return [];
  }

  const usedIds = new Map<string, number>();

  return body.reduce<TableOfContentsItem[]>((items, block) => {
    if (
      block._type !== "block" ||
      (block.style !== "h2" && block.style !== "h3") ||
      !block._key
    ) {
      return items;
    }

    const text = getBlockText(block);

    if (!text) {
      return items;
    }

    const baseId = slugify(text);
    const id = createUniqueId(baseId, usedIds);

    items.push({
      key: block._key,
      id,
      text,
      level: block.style === "h2" ? 2 : 3,
    });

    return items;
  }, []);
}

function getBlockText(block: PortableTextBlock): string {
  if (!("children" in block) || !block.children) {
    return "";
  }

  return block.children
    .map((child) => {
      if ("text" in child && typeof child.text === "string") {
        return child.text;
      }

      return "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function createUniqueId(baseId: string, usedIds: Map<string, number>): string {
  const safeBaseId = baseId || "section";
  const occurrence = usedIds.get(safeBaseId) ?? 0;

  usedIds.set(safeBaseId, occurrence + 1);

  return occurrence === 0 ? safeBaseId : `${safeBaseId}-${occurrence + 1}`;
}
