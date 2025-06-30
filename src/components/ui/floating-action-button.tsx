"use client";

import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useParams } from "next/navigation";
import Link from "next/link";

interface FloatingActionButtonProps {
  className?: string;
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  const { locale } = useParams();

  return (
    <Link href={`/${locale}/add`}>
      <Button
        size="lg"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "border-2 border-primary-foreground/10",
          "group cursor-pointer",
          className
        )}
        aria-label="Neue Aufgabe erstellen"
      >
        <Plus className="h-6 w-6 transition-transform group-hover:rotate-90 duration-300" />
      </Button>
    </Link>
  );
}
