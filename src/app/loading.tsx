"use client";

import { useParams } from "next/navigation";
import { DEFAULT_LOCALE } from "@src/components/locale/locale";

export default function Loading() {
  const params = useParams();
  const locale = (params?.locale as string) || DEFAULT_LOCALE;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="font-medium">
          {locale === "de" ? "Wird geladen..." : "Loading..."}
        </p>
      </div>
    </div>
  );
}
