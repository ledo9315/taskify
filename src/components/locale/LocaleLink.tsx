"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { DEFAULT_LOCALE } from "./locale";

type LocaleLinkProps = ComponentProps<typeof Link>;

export function LocaleLink({ href, children, ...props }: LocaleLinkProps) {
  const params = useParams();
  const locale = params?.locale || DEFAULT_LOCALE;

  let normalizedHref;

  if (typeof href === "string") {
    const cleanHref = href.startsWith("/") ? href : `/${href}`;
    normalizedHref = `/${locale}${cleanHref}`;
  } else {
    normalizedHref = href;
  }

  return (
    <Link href={normalizedHref} {...props}>
      {children}
    </Link>
  );
}
