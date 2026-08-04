import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: [
    "bg-btn-primary-bg",
    "text-btn-primary-text",
    "border-2 border-transparent",
    "hover:bg-btn-primary-bg-hover",
  ].join(" "),

  secondary: [
    "bg-transparent",
    "text-btn-secondary-text",
    "border-2 border-forest",
    "hover:bg-btn-secondary-bg-hover",
    "hover:text-btn-secondary-text-hover",
  ].join(" "),

  link: [
    "bg-transparent",
    "hover:text-text-accent",
    "text-btn-secondary-text",
    "underline underline-offset-4",
  ].join(" "),
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  external = false,
  "aria-label": ariaLabel,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center",
    "gap-2",
    "font-body font-semibold",
    "tracking-wide cursor-pointer select-none",
    "rounded-btn",
    "transition-colors duration-normal",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    fullWidth && "w-full",
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href && external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
        <ArrowUpRightIcon className="h-4 w-4" />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
