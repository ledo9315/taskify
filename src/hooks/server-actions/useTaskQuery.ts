import { todoListApi } from "@/src/api/api";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useTaskQuery(taskId: number) {
  const router = useRouter();

  const taskQuery = useQuery<Task, Error>({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const task = await todoListApi.getTask(taskId);
      if (!task) throw new Error("Task not found");
      return task;
    },
    enabled: !!taskId,
    gcTime: 0,
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (taskQuery.isError) {
      toast.error("Aufgabe nicht gefunden", {
        description: taskQuery.error?.message,
      });
      router.push("/");
    }
  }, [taskQuery.isError, taskQuery.error?.message, router]);

  return taskQuery;
}
