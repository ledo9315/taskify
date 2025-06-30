import { Task } from "@/types/task";

export const todoListApi = {
  baseQueryKey: ["tasks"],
  queryKey: {
    // Alle Tasks eines Users
    byUser: (userId: string) => ["tasks", { userId }],

    // Tasks eines Users nach Status gefiltert
    byUserAndStatus: (userId: string, completed: boolean) => [
      "tasks",
      { userId, completed },
    ],

    // Einzelne Task eines Users
    single: (userId: string, taskId: number) => ["tasks", { userId, taskId }],

    // Fallback für Legacy-Code
    legacy: (completed: boolean) => ["tasks", { completed }],
  },

  getTasks: async (): Promise<Task[]> => {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await fetch(`/api/tasks/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    const task = await response.json();
    return task;
  },

  createTask: async (
    task: Pick<Task, "title" | "description" | "tags" | "dueDate" | "priority">
  ): Promise<Task> => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json();
  },

  updateTask: async (task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json();
  },

  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  },
};
