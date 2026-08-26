interface ShareButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  compact?: boolean;
}

export default function ShareButton({
  label,
  onClick,
  children,
  active = false,
  compact = false,
}: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        "inline-flex items-center justify-center",
        "rounded-btn border",
        "transition-colors duration-(--duration-fast) ease-default",
        "focus-visible:ring-2 focus-visible:outline-none",
        "focus-visible:ring-border-accent focus-visible:ring-offset-2",
        "focus-visible:ring-offset-bg-page",

        compact ? "size-9" : "min-h-11 px-3",

        active
          ? "border-border-accent bg-bg-surface text-text-accent"
          : [
              "border-border-subtle text-text-muted",
              "hover:border-border-default",
              "hover:text-text-primary",
            ].join(" "),
      ].join(" ")}
    >
      {children}
    </button>
  );
}
