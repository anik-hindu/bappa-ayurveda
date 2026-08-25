import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/types/";

interface PortableTextImageProps {
  value: SanityImage;
}

function PortableTextImage({ value }: PortableTextImageProps) {
  if (!value?.asset?._ref) {
    return null;
  }

  const imageUrl = urlFor(value).width(1200).auto("format").url();

  return (
    <figure className="my-10">
      <div className="relative aspect-video overflow-hidden rounded-card bg-bg-surface">
        <Image
          src={imageUrl}
          alt={value.alt || ""}
          width={1200}
          height={675}
          sizes="
            (max-width: 767px) calc(100vw - 48px),
            760px
          "
          className="h-auto w-full object-cover"
        />
      </div>

      {value.caption && (
        <figcaption className="mt-3 text-center text-caption leading-relaxed text-text-muted">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default PortableTextImage;
