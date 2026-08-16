import { cn } from "@/lib/cn";
import type { TrustItem } from "@/types";
import Image from "next/image";

export default function TrustBar({ items }: { items: TrustItem[] }) {
  return (
    <div className={cn("border-t border-border-subtle", "pt-6 md:pt-8")}>
      <ul
        role="list"
        aria-label="Certifications and availability"
        className={cn(
          "flex flex-wrap items-center justify-center",
          "gap-x-5 gap-y-3",
        )}
      >
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-3">
            {/* Icon */}
            <div
              className="flex size-5 shrink-0 items-center justify-center md:size-6"
              aria-hidden="true"
            >
              <Image
                src={item.img}
                alt=""
                width={24}
                height={24}
                className="size-full object-contain"
              />
            </div>

            {/* Label */}
            <span className="font-body text-caption text-text-muted">
              {item.label}
            </span>

            {/* Separator */}
            {index < items.length - 1 && (
              <span
                className="h-3 w-px shrink-0 bg-border-default"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
