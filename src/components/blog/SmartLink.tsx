import Link from "next/link";
import type { ReactNode } from "react";

const SITE_HOSTNAME = "bappaayurveda.com";

type LinkType = "auto" | "internal" | "external";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  type?: LinkType;
  openInNewTab?: boolean;
  affiliate?: boolean;
  sponsored?: boolean;
  className?: string;
};

function normalizeHostname(hostname: string) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function isInternalUrl(href: string) {
  // Relative URLs are internal.
  if (href.startsWith("/")) {
    return true;
  }

  try {
    const url = new URL(href);

    return (
      url.protocol === "https:" &&
      normalizeHostname(url.hostname) === SITE_HOSTNAME
    );
  } catch {
    return false;
  }
}

function getRel({
  isExternal,
  affiliate,
  sponsored,
}: {
  isExternal: boolean;
  affiliate: boolean;
  sponsored: boolean;
}) {
  const rel = new Set<string>();

  if (isExternal) {
    rel.add("noopener");
    rel.add("noreferrer");
  }

  if (affiliate || sponsored) {
    rel.add("sponsored");
    rel.add("nofollow");
  }

  return rel.size > 0 ? [...rel].join(" ") : undefined;
}

export function SmartLink({
  href,
  children,
  type = "auto",
  openInNewTab = true,
  affiliate = false,
  sponsored = false,
  className,
}: SmartLinkProps) {
  if (!href) {
    return <>{children}</>;
  }

  const isInternal =
    type === "internal" || (type === "auto" && isInternalUrl(href));

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const rel = getRel({
    isExternal: true,
    affiliate,
    sponsored,
  });

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
}
