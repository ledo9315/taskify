"use client";

import Image from "next/image";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const { locale } = useParams();

  return (
    <nav className={cn(className)}>
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link className="flex items-center gap-x-2" href={`/${locale}`}>
            <Image alt="Logo" src="/logo.svg" width={28} height={28} />
            <h1 className="text-xl font-medium tracking-tight">taskify</h1>
          </Link>
          <div className="flex items-center p-0 md:px-4">
            <LanguageToggle />
            <div className="mx-1">
              <div className="w-px h-6 bg-border"></div>
            </div>
            <ThemeToggle className="cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
}
