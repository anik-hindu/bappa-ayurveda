import { PortableTextBlock } from "@portabletext/types";

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function estimateReadTime(body?: PortableTextBlock[]): number {
  if (!body?.length) return 1;

  const words = body.reduce((count, block) => {
    if (block._type !== "block") return count;

    const text =
      block.children?.map((child: any) => child.text ?? "").join(" ") ?? "";

    return count + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);

  return Math.max(1, Math.ceil(words / 200));
}
