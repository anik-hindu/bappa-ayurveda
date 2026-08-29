import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "accent" | "outline";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  neutral: cn(
    "bg-bg-surface",
    "border border-border-default",
    "text-text-primary",
  ),

  accent: cn(
    "bg-bg-hover",
    "border border-border-accent",
    "text-accent-strong",
  ),

  outline: cn(
    "bg-transparent",
    "border border-border-default",
    "text-text-body",
  ),
};

export default function Badge({
  children,
  icon,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        "px-3 py-1",
        "rounded-badge",
        "font-body text-label font-medium",
        "leading-none tracking-wider",
        "whitespace-nowrap",
        "select-none",
        "transition-colors duration-(--duration-fast)",
        variants[variant],
        className,
      )}
    >
      {icon && (
        <span
          className="flex size-4 shrink-0 items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      {children}
    </span>
  );
}
