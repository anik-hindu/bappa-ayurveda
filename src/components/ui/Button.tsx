import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "link" | "filter";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-btn-primary-bg",
    "rounded-btn",
    "text-btn-primary-text",
    "border-2 border-transparent",
    "hover:bg-btn-primary-bg-hover",
    "active:scale-[0.97] active:opacity-90",
    "active:bg-btn-primary-bg-hover",
  ),

  secondary: cn(
    "bg-transparent",
    "text-btn-secondary-text",
    "border-2 border-forest",
    "rounded-btn",

    "hover:bg-btn-secondary-bg-hover",
    "hover:text-btn-secondary-text-hover",
    "active:bg-btn-secondary-bg-hover",
    "active:text-btn-secondary-text-hover",
    "active:scale-[0.97] active:opacity-90",
  ),

  link: cn(
    "bg-transparent",
    "hover:text-text-accent",
    "active:text-text-accent",
    "text-btn-secondary-text",
    "underline underline-offset-4",
    "active:opacity-60",
  ),
  filter: cn(
    "relative",
    "rounded-none",
    "border-0",
    "bg-transparent",
    "text-text-muted",
    "hover:bg-transparent",
    "hover:text-text-primary",
    "aria-pressed:text-text-primary",
    "after:absolute",
    "after:bottom-0",
    "after:left-3",
    "after:right-3",
    "after:h-0.5",
    "after:origin-center",
    "after:scale-x-0",
    "after:bg-border-accent",
    "after:transition-transform",
    "after:duration-normal",
    "after:ease-default",
    "aria-pressed:after:scale-x-100",
    "motion-reduce:after:transition-none",
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-base",
  lg: "min-h-14 px-8 py-4 text-lg",
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
