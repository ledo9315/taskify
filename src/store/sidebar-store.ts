import { create } from "zustand";

type SidebarView =
  | "open"
  | "completed"
  | "overdue"
  | "due-today"
  | "no-due-date"
  | "high-priority"
  | "medium-priority"
  | "low-priority"
  | "tag-filter";

interface SidebarStore {
  activeView: SidebarView;
  setActiveView: (view: SidebarView) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  activeView: "open",
  setActiveView: (view) => set({ activeView: view }),
  selectedTag: null,
  setSelectedTag: (tag) =>
    set({ selectedTag: tag, activeView: tag ? "tag-filter" : "open" }),
}));
