"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { User, LogOut, Hash, X, Check } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import { useSidebarStore } from "@/src/store/sidebar-store";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "@/src/api/api";

import { ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/src/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export function AppSidebar() {
  const { activeView, setActiveView, selectedTag, setSelectedTag } =
    useSidebarStore();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { data: session } = authClient.useSession();
  const { locale } = useParams();

  // State to track if component has mounted (hydrated)
  const [isMounted, setIsMounted] = useState(false);
  const [tagComboboxOpen, setTagComboboxOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onViewChange = (
    view:
      | "open"
      | "completed"
      | "overdue"
      | "due-today"
      | "no-due-date"
      | "high-priority"
      | "medium-priority"
      | "low-priority"
      | "tag-filter"
  ) => {
    if (view !== "tag-filter") {
      setSelectedTag(null);
    }
    setActiveView(view);
  };

  const tasksQuery = useQuery({
    queryFn: todoListApi.getTasks,
    queryKey: session?.user?.id
      ? todoListApi.queryKey.byUser(session.user.id)
      : todoListApi.baseQueryKey,
    enabled: !!session?.user?.id,
  });

  // Extract all unique tags and their counts
  const tagStats = useMemo(() => {
    const tasks = tasksQuery.data ?? [];
    const tagCounts = new Map<string, { total: number; open: number }>();

    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        const current = tagCounts.get(tag) || { total: 0, open: 0 };
        tagCounts.set(tag, {
          total: current.total + 1,
          open: current.open + (task.complete ? 0 : 1),
        });
      });
    });

    return Array.from(tagCounts.entries())
      .map(([tag, stats]) => ({ tag, ...stats }))
      .sort((a, b) => b.open - a.open || a.tag.localeCompare(b.tag));
  }, [tasksQuery.data]);

  const tasks = tasksQuery.data ?? [];

  // Calculate counts for different categories
  const openCount = tasks.filter((task) => !task.complete).length;
  const completedCount = tasks.filter((task) => task.complete).length;

  // Calculate duedate-based counts
  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const overdueCount = tasks.filter((task) => {
    if (task.complete || !task.dueDate) return false;
    return new Date(task.dueDate).getTime() < now.getTime();
  }).length;

  const dueTodayCount = tasks.filter((task) => {
    if (task.complete || !task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }).length;

  const noDueDateCount = tasks.filter(
    (task) => !task.complete && !task.dueDate
  ).length;

  // Calculate priority-based counts
  const highPriorityCount = tasks.filter(
    (task) => !task.complete && task.priority === 2
  ).length;

  const mediumPriorityCount = tasks.filter(
    (task) => !task.complete && task.priority === 1
  ).length;

  const lowPriorityCount = tasks.filter(
    (task) => !task.complete && task.priority === 0
  ).length;

  const [open, setOpen] = useState(false);

  // Extract user data from session
  const user = session?.user;
  const actualUserName = user?.name || "Benutzer";
  const actualUserEmail = user?.email || "";
  const userImage = user?.image;

  // Use fallback values during SSR/hydration to prevent mismatch
  const userName = isMounted ? actualUserName : "Benutzer";
  const userEmail = isMounted ? actualUserEmail : "";

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Use fallback initials during SSR/hydration
  const displayInitials = isMounted ? getInitials(actualUserName) : "B";

  const handleMenuAction = async (action: string) => {
    setOpen(false);

    switch (action) {
      case "account":
        router.push(`/${locale}/account`);
        break;
      case "logout":
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              toast.success("Erfolgreich abgemeldet", {
                description: "Sie wurden erfolgreich abgemeldet.",
              });
            },
          },
        });
        break;
    }
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setTagComboboxOpen(false);
  };

  const clearTagFilter = () => {
    setSelectedTag(null);
    setActiveView("open");
  };

  const selectedTagStats = selectedTag
    ? tagStats.find((t) => t.tag === selectedTag)
    : null;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 pb-4 mt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 px-2">
            <Image alt="Logo" src="/logo.svg" width={28} height={28} />
            <h1 className="text-xl font-medium tracking-tight">taskify</h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {formatMessage({
              id: "AppSidebar.tasks",
              defaultMessage: "Aufgaben",
            })}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "open"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "open"}
                  onClick={() => onViewChange("open")}
                >
                  <FormattedMessage
                    defaultMessage="Offen"
                    id="AppSidebar.open"
                  />
                  <span className="ml-2 text-accent">{openCount}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "completed"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "completed"}
                  onClick={() => onViewChange("completed")}
                >
                  <FormattedMessage
                    defaultMessage="Abgeschlossen"
                    id="AppSidebar.completed"
                  />
                  <span className="ml-2 text-accent">{completedCount}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {formatMessage({
              id: "AppSidebar.byDueDate",
              defaultMessage: "Nach Fälligkeit",
            })}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "overdue"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "overdue"}
                  onClick={() => onViewChange("overdue")}
                >
                  <FormattedMessage
                    defaultMessage="Überfällig"
                    id="AppSidebar.overdue"
                  />
                  <span
                    className={`ml-2 ${overdueCount > 0 ? "text-red-500" : "text-accent"}`}
                  >
                    {overdueCount}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "due-today"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "due-today"}
                  onClick={() => onViewChange("due-today")}
                >
                  <FormattedMessage
                    defaultMessage="Heute fällig"
                    id="AppSidebar.dueToday"
                  />
                  <span
                    className={`ml-2 ${dueTodayCount > 0 ? "text-orange-400" : "text-accent"}`}
                  >
                    {dueTodayCount}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "no-due-date"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "no-due-date"}
                  onClick={() => onViewChange("no-due-date")}
                >
                  <FormattedMessage
                    defaultMessage="Ohne Fälligkeit"
                    id="AppSidebar.noDueDate"
                  />
                  <span className="ml-2 text-accent">{noDueDateCount}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {formatMessage({
              id: "AppSidebar.byPriority",
              defaultMessage: "Nach Priorität",
            })}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "high-priority"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "high-priority"}
                  onClick={() => onViewChange("high-priority")}
                >
                  <FormattedMessage
                    defaultMessage="Hohe Priorität"
                    id="AppSidebar.highPriority"
                  />
                  <span
                    className={`ml-2 ${highPriorityCount > 0 ? "text-orange-400" : "text-accent"}`}
                  >
                    {highPriorityCount}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "medium-priority"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "medium-priority"}
                  onClick={() => onViewChange("medium-priority")}
                >
                  <FormattedMessage
                    defaultMessage="Mittlere Priorität"
                    id="AppSidebar.mediumPriority"
                  />
                  <span className={`ml-2 text-accent`}>
                    {mediumPriorityCount}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={`flex justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeView === "low-priority"
                      ? "!bg-secondary !text-secondary-foreground hover:!bg-secondary/80 data-[active=true]:!bg-secondary data-[active=true]:!text-secondary-foreground"
                      : ""
                  }`}
                  isActive={activeView === "low-priority"}
                  onClick={() => onViewChange("low-priority")}
                >
                  <FormattedMessage
                    defaultMessage="Niedrige Priorität"
                    id="AppSidebar.lowPriority"
                  />
                  <span className="ml-2 text-accent">{lowPriorityCount}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {formatMessage({
              id: "AppSidebar.byTags",
              defaultMessage: "Nach Tags",
            })}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Popover
                  open={tagComboboxOpen}
                  onOpenChange={setTagComboboxOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-auto p-2 hover:bg-secondary/80 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Hash className="h-4 w-4 flex-shrink-0" />
                        {selectedTag ? (
                          <div className="flex items-center gap-1 min-w-0 flex-1">
                            <Badge variant="secondary" className="text-xs">
                              {selectedTag}
                            </Badge>
                            {selectedTagStats && (
                              <span className="text-xs text-muted-foreground">
                                ({selectedTagStats.open})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {formatMessage({
                              id: "AppSidebar.selectTag",
                              defaultMessage: "Tag auswählen...",
                            })}
                          </span>
                        )}
                      </div>
                      {selectedTag ? (
                        <div
                          className="h-4 w-4 flex items-center justify-center rounded hover:bg-destructive/20 cursor-pointer flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearTagFilter();
                          }}
                        >
                          <X className="h-3 w-3" />
                        </div>
                      ) : (
                        <ChevronsUpDown className="ml-auto h-4 w-4 flex-shrink-0" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <Command>
                      <CommandInput
                        className="focus-visible:ring-0"
                        placeholder={formatMessage({
                          id: "AppSidebar.searchTags",
                          defaultMessage: "Tags durchsuchen...",
                        })}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {formatMessage({
                            id: "AppSidebar.noTagsFound",
                            defaultMessage: "Keine Tags gefunden.",
                          })}
                        </CommandEmpty>
                        <CommandGroup>
                          {tagStats.map(({ tag, open, total }) => (
                            <CommandItem
                              key={tag}
                              onSelect={() => handleTagSelect(tag)}
                              className="cursor-pointer"
                            >
                              <Hash className="mr-2 h-4 w-4" />
                              <span className="flex-1">{tag}</span>
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground">
                                  {open > 0 && (
                                    <span className="text-accent">{open}</span>
                                  )}
                                  {open > 0 && total > open && <span>/</span>}
                                  {total > open && (
                                    <span className="text-muted-foreground">
                                      {total}
                                    </span>
                                  )}
                                </span>
                                {selectedTag === tag && (
                                  <Check className="h-4 w-4" />
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 pt-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto p-2 hover:bg-secondary/80 cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Avatar className="w-8 h-8 rounded-lg flex-shrink-0">
                  <AvatarImage src={userImage || undefined} />
                  <AvatarFallback>{displayInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <div className="font-medium text-sm truncate w-full">
                    {userName}
                  </div>
                  <div className="text-xs text-muted-foreground truncate w-full">
                    {userEmail}
                  </div>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 flex-shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 p-0"
            align="end"
            side="right"
            sideOffset={-8}
          >
            <Command>
              <CommandList>
                <CommandGroup>
                  <div className="flex items-center gap-2 px-2 py-2 text-sm">
                    <Avatar className="w-8 h-8 rounded-lg flex-shrink-0">
                      <AvatarImage src={userImage || undefined} />
                      <AvatarFallback>{displayInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="font-medium truncate">{userName}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {userEmail}
                      </div>
                    </div>
                  </div>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="cursor-pointer"
                    onSelect={() => handleMenuAction("account")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <FormattedMessage
                      id="AppSidebar.account"
                      defaultMessage="Konto"
                    />
                  </CommandItem>
                  <CommandItem
                    className="cursor-pointer"
                    onSelect={() => handleMenuAction("logout")}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <FormattedMessage
                      id="AppSidebar.logout"
                      defaultMessage="Abmelden"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
}
