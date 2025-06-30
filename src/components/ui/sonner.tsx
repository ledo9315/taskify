"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--border-radius": "0px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          description: "dark:!text-[#e0e0e0]",
          actionButton:
            "rounded-none dark:bg-[#2d2d2d] dark:hover:bg-[#3a3a3a]",
          cancelButton: "dark:!text-gray-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
