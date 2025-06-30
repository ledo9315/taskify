"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";
import { Moon, Sun } from "lucide-react";
import { FormattedMessage } from "react-intl";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className={cn("button-clickable cursor-pointer", className)}
      >
        <span className="text-xs tracking-wide">
          <FormattedMessage defaultMessage="mode" id="ThemeToggle.mode" />
        </span>
        <span className="sr-only">
          <FormattedMessage
            defaultMessage="Thema wechseln"
            id="ThemeToggle.changeTheme"
          />
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "border-none transition-all duration-300 hover:bg-transparent hover:text-current dark:hover:bg-transparent p-0 pl-4",
        className
      )}
      onClick={toggleTheme}
    >
      <span
        className={`flex items-center p-0.5 bg-gray-100 w-[45px] rounded-full border border-gray-400 hover:border-accent transition-transform duration-300 ease-in-out ${
          theme === "dark" &&
          "justify-end dark:border-[#3D3F45] dark:bg-[#282A2F] dark:text-white dark:hover:border-accent"
        }`}
      >
        {theme === "dark" ? (
          <div className="bg-gray-900 p-1 rounded-full shadow-md">
            <Moon className="size-3" />
          </div>
        ) : (
          <div className="bg-white p-[3px] rounded-full shadow-md">
            <Sun className="size-2.5" />
          </div>
        )}
      </span>
      <span className="sr-only">
        <FormattedMessage
          defaultMessage="Theme wechseln"
          id="ThemeToggle.changeTheme"
        />
      </span>
    </Button>
  );
}
