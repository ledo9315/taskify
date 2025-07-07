"use client";

import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "@/src/api/api";
import { TaskSection } from "./TaskSection";
import { authClient } from "@/src/lib/auth-client";

type SidebarView =
  | "open"
  | "completed"
  | "overdue"
  | "due"
  | "due-today"
  | "no-due-date"
  | "high-priority"
  | "medium-priority"
  | "low-priority"
  | "tag-filter";

interface TaskPanelProps {
  view: SidebarView;
  selectedTag?: string | null;
  sortBy: string;
}

const TaskPanel = ({ view, selectedTag, sortBy }: TaskPanelProps) => {
  const { data: session } = authClient.useSession();

  const tasksQuery = useQuery({
    queryFn: todoListApi.getTasks,

    queryKey: session?.user?.id
      ? todoListApi.queryKey.byUser(session.user.id)
      : todoListApi.baseQueryKey,

    select: (data) => {
      const now = new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let filtered;

      switch (view) {
        case "completed":
          filtered = data.filter((task) => task.complete);
          break;

        case "open":
          filtered = data.filter((task) => !task.complete);
          break;

        case "overdue":
          filtered = data.filter((task) => {
            if (task.complete || !task.dueDate) return false;
            return new Date(task.dueDate).getTime() < now.getTime();
          });
          break;

        case "due":
          filtered = data.filter((task) => {
            if (task.complete || !task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() >= today.getTime();
          });
          break;

        case "due-today":
          filtered = data.filter((task) => {
            if (task.complete || !task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            const now = new Date();
            // Prüfe, ob das Fälligkeitsdatum heute ist
            return (
              dueDate.getFullYear() === now.getFullYear() &&
              dueDate.getMonth() === now.getMonth() &&
              dueDate.getDate() === now.getDate() &&
              dueDate.getTime() > now.getTime()
            );
          });
          break;

        case "no-due-date":
          filtered = data.filter((task) => !task.complete && !task.dueDate);
          break;

        case "high-priority":
          filtered = data.filter(
            (task) => !task.complete && task.priority === 2
          );
          break;

        case "medium-priority":
          filtered = data.filter(
            (task) => !task.complete && task.priority === 1
          );
          break;

        case "low-priority":
          filtered = data.filter(
            (task) => !task.complete && task.priority === 0
          );
          break;

        case "tag-filter":
          filtered = data.filter((task) =>
            selectedTag ? task.tags.includes(selectedTag) : false
          );
          break;

        default:
          filtered = data.filter((task) => !task.complete);
      }

      // Sortierung basierend auf sortBy
      const isDescending = sortBy.endsWith("-desc");
      const sortCriteria = sortBy.replace("-desc", "");

      switch (sortCriteria) {
        case "due":
          filtered = filtered.sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;

            const comparison =
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            return isDescending ? -comparison : comparison;
          });
          break;

        case "priority":
          filtered = filtered.sort((a, b) => {
            if (a.priority !== b.priority) {
              const comparison = a.priority - b.priority;
              return isDescending ? comparison : -comparison;
            }
            // Bei gleicher Priorität nach Erstellungsdatum sortieren
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          break;

        case "created":
          filtered = filtered.sort((a, b) => {
            const comparison =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            return isDescending ? -comparison : comparison;
          });
          break;

        case "updated":
          filtered = filtered.sort((a, b) => {
            if (!a.updatedAt && !b.updatedAt) return 0;
            if (!a.updatedAt) return 1;
            if (!b.updatedAt) return -1;

            const comparison =
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            return isDescending ? -comparison : comparison;
          });
          break;
      }

      return filtered;
    },

    enabled: !!session?.user,
  });

  return (
    <TaskSection
      className="mb-30"
      tasks={tasksQuery.data ?? []}
      completed={view === "completed"}
      isPending={tasksQuery.isPending}
      isError={tasksQuery.isError}
    />
  );
};

export default TaskPanel;
