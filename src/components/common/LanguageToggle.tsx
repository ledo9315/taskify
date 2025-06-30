"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { FormattedMessage } from "react-intl";
import { messages, Locale } from "@src/components/locale/locale";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";

const localeDisplayNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
};

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentLocale = params.locale as Locale;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" className={cn("cursor-pointer")}>
        <span className="text-xs tracking-wide">
          <FormattedMessage
            defaultMessage="Sprache wechseln"
            id="ThemeToggle.languageToggle"
          />
        </span>
        <span className="sr-only">
          <FormattedMessage
            defaultMessage="Sprache wechseln"
            id="ThemeToggle.languageToggle"
          />
        </span>
      </Button>
    );
  }

  const handleLanguageChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "";
    const currentSearchParams = searchParams.toString();
    const newUrl = `/${newLocale}${pathWithoutLocale}${currentSearchParams ? `?${currentSearchParams}` : ""}`;
    router.push(newUrl);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex gap-x-1 cursor-pointer border-none !bg-transparent dark:!bg-transparent hover:bg-gray-100/50 dark:hover:bg-gray-800/50 w-auto">
        <Languages className="size-4" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(messages).map((localeKey) => {
          const locale = localeKey as Locale;
          return (
            <SelectItem className="cursor-pointer" key={locale} value={locale}>
              {localeDisplayNames[locale]}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
