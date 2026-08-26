import Link from "next/link";

interface ShareLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export default function ShareLink({ href, label, children }: ShareLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      title={`Share on ${label}`}
      className="inline-flex size-10 items-center justify-center rounded-full text-text-muted transition-all duration-(--duration-fast) ease-default hover:bg-bg-surface hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
