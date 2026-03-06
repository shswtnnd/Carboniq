"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

type HashScrollLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

function parseHashHref(href: LinkProps["href"]) {
  if (typeof href !== "string") return null;
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const path = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex + 1);
  if (!hash) return null;
  return { path, hash };
}

export default function HashScrollLink({ href, children, className, ...props }: HashScrollLinkProps) {
  const pathname = usePathname();
  const parsed = parseHashHref(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!parsed || pathname !== parsed.path) return;
    event.preventDefault();
    const target = document.getElementById(parsed.hash);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState({}, "", `${parsed.path}#${parsed.hash}`);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
