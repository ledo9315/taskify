"use client";

import { cn } from "@/src/lib/utils";
import { SidebarTrigger, useSidebar } from "@/src/components/ui/sidebar";
import { useSidebarStore } from "@/src/store/sidebar-store";
import { Container } from "@src/components/common/Container";
import TaskPanel from "@src/components/table/TaskPanel";
import { useIntl } from "react-intl";
import { ThemeToggle } from "../common/ThemeToggle";
import { LanguageToggle } from "../common/LanguageToggle";
import { FloatingActionButton } from "../ui/floating-action-button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

interface MainPageContentProps {
  className?: string;
}

type SortCriteria = "due" | "priority" | "created" | "updated";
type SortDirection = "asc" | "desc";

export function Dashboard({ className }: MainPageContentProps) {
  const { activeView, selectedTag } = useSidebarStore();
  const { formatMessage } = useIntl();
  const { state, isMobile } = useSidebar();

  const [sortCriteria, setSortCriteria] = useState<SortCriteria>("due");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortBy =
    sortDirection === "desc" ? `${sortCriteria}-desc` : sortCriteria;

  const sortOptions: Array<{
    value: SortCriteria;
    label: string;
  }> = [
    {
      value: "due",
      label: formatMessage({
        id: "sort.due",
        defaultMessage: "Fälligkeit",
      }),
    },
    {
      value: "priority",
      label: formatMessage({
        id: "sort.priority",
        defaultMessage: "Priorität",
      }),
    },
    {
      value: "created",
      label: formatMessage({
        id: "sort.created",
        defaultMessage: "Erstellt",
      }),
    },
    {
      value: "updated",
      label: formatMessage({
        id: "sort.updated",
        defaultMessage: "Aktualisiert",
      }),
    },
  ];

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getViewTitle = () => {
    switch (activeView) {
      case "open":
        return formatMessage({
          id: "MainPageContent.title.openTasks",
          defaultMessage: "Offene Aufgaben",
        });
      case "completed":
        return formatMessage({
          id: "MainPageContent.title.completedTasks",
          defaultMessage: "Abgeschlossene Aufgaben",
        });
      case "overdue":
        return formatMessage({
          id: "MainPageContent.title.overdueTasks",
          defaultMessage: "Überfällige Aufgaben",
        });

      case "due":
        return formatMessage({
          id: "MainPageContent.title.dueTasks",
          defaultMessage: "Fällige Aufgaben",
        });
      case "due-today":
        return formatMessage({
          id: "MainPageContent.title.dueTodayTasks",
          defaultMessage: "Heute fällige Aufgaben",
        });
      case "no-due-date":
        return formatMessage({
          id: "MainPageContent.title.noDueDateTasks",
          defaultMessage: "Aufgaben ohne Fälligkeit",
        });
      case "high-priority":
        return formatMessage({
          id: "MainPageContent.title.highPriorityTasks",
          defaultMessage: "Aufgaben mit hoher Priorität",
        });
      case "medium-priority":
        return formatMessage({
          id: "MainPageContent.title.mediumPriorityTasks",
          defaultMessage: "Aufgaben mit mittlerer Priorität",
        });
      case "low-priority":
        return formatMessage({
          id: "MainPageContent.title.lowPriorityTasks",
          defaultMessage: "Aufgaben mit niedriger Priorität",
        });
      case "tag-filter":
        return formatMessage({
          id: "MainPageContent.title.tagFilterTasks",
          defaultMessage: "Nach Tag gefiltert",
        });
      default:
        return formatMessage({
          id: "MainPageContent.title.openTasks",
          defaultMessage: "Offene Aufgaben",
        });
    }
  };

  const getHeaderPosition = () => {
    if (isMobile) {
      return "left-0";
    }
    return state === "expanded" ? "md:left-64" : "md:left-0";
  };

  return (
    <div className={cn("min-h-screen w-full", className)}>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-sm transition-all duration-300",
          getHeaderPosition()
        )}
      >
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle className="cursor-pointer" />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="pt-16">
        <Container>
          <div className="flex flex-col min-h-[calc(100vh-4rem)] pt-16 pb-0 px-4 sm:px-6">
            <header className="mb-12">
              <div className="flex items-center justify-between border-b border-primary/30 pb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-medium tracking-tight">
                    {getViewTitle()}
                  </h2>
                  {activeView === "tag-filter" && selectedTag && (
                    <Badge variant="secondary" className="text-sm">
                      #{selectedTag}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={sortCriteria}
                    onValueChange={(value: SortCriteria) =>
                      setSortCriteria(value)
                    }
                  >
                    <SelectTrigger className="cursor-pointer min-w-[140px]">
                      <SelectValue placeholder="Sortieren nach" />
                    </SelectTrigger>
                    <SelectContent className="focus:outline-none focus:ring-0">
                      {sortOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          className="focus:outline-none focus:ring-0 cursor-pointer"
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={toggleSortDirection}
                    className="p-2 rounded-md transition-colors cursor-pointer hover:bg-secondary"
                    title={
                      sortDirection === "asc"
                        ? "Umschalten zu absteigend"
                        : "Umschalten zu aufsteigend"
                    }
                  >
                    {sortDirection === "asc" ? (
                      <ArrowUpWideNarrow className="w-4 h-4 text-primary" />
                    ) : (
                      <ArrowDownWideNarrow className="w-4 h-4 text-primary" />
                    )}
                  </button>
                </div>
              </div>
            </header>
            <main className="animate-fade-in flex-1">
              <TaskPanel
                view={activeView}
                selectedTag={selectedTag}
                sortBy={sortBy}
              />
            </main>
          </div>
        </Container>
      </div>

      <FloatingActionButton />
    </div>
  );
}
