import { authClient } from "@/src/lib/auth-client";
import { Task } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useIntl } from "react-intl";

import { todoListApi } from "../../api/api";

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const { data: session } = authClient.useSession();

  const updateTaskMutation = useMutation({
    mutationFn: async (updateData: Partial<Task>) => {
      if (!session?.user?.id) {
        throw new Error("Not authenticated");
      }

      const result = await todoListApi.updateTask(updateData);
      return result;
    },

    onMutate: async (mutateVariables) => {
      if (!session?.user?.id || !mutateVariables.id) return { prevData: [] };

      // User-spezifische Query Keys für beide Views
      const completedQueryKey = todoListApi.queryKey.byUserAndStatus(
        session.user.id,
        true
      );
      const openQueryKey = todoListApi.queryKey.byUserAndStatus(
        session.user.id,
        false
      );
      const singleTaskQueryKey = todoListApi.queryKey.single(
        session.user.id,
        mutateVariables.id
      );

      // Cancel alle relevanten Queries
      await queryClient.cancelQueries({ queryKey: completedQueryKey });
      await queryClient.cancelQueries({ queryKey: openQueryKey });
      await queryClient.cancelQueries({ queryKey: singleTaskQueryKey });

      // Aktuelle Daten sichern
      const prevCompletedData =
        queryClient.getQueryData<Task[]>(completedQueryKey) || [];
      const prevOpenData = queryClient.getQueryData<Task[]>(openQueryKey) || [];
      const prevSingleData = queryClient.getQueryData<Task>(singleTaskQueryKey);

      // Optimistic Update für alle Views
      const updateTask = (tasks: Task[]) =>
        tasks.map((task) =>
          task.id === mutateVariables.id
            ? { ...task, ...mutateVariables }
            : task
        );

      queryClient.setQueryData(
        completedQueryKey,
        updateTask(prevCompletedData)
      );
      queryClient.setQueryData(openQueryKey, updateTask(prevOpenData));

      if (prevSingleData) {
        queryClient.setQueryData(singleTaskQueryKey, {
          ...prevSingleData,
          ...mutateVariables,
        });
      }

      return {
        prevCompletedData,
        prevOpenData,
        prevSingleData,
        completedQueryKey,
        openQueryKey,
        singleTaskQueryKey,
      };
    },

    onSuccess: (updatedTask) => {
      toast.success(
        `${formatMessage({
          id: "Toast.taskUpdated",
          defaultMessage: "Aufgabe aktualisiert",
        })}: „${updatedTask.title}"`
      );
    },

    onError: (_, __, ctx) => {
      if (!ctx || !session?.user?.id) return;

      // Rollback für alle Views
      if (ctx.prevCompletedData) {
        queryClient.setQueryData(ctx.completedQueryKey, ctx.prevCompletedData);
      }
      if (ctx.prevOpenData) {
        queryClient.setQueryData(ctx.openQueryKey, ctx.prevOpenData);
      }
      if (ctx.prevSingleData) {
        queryClient.setQueryData(ctx.singleTaskQueryKey, ctx.prevSingleData);
      }

      toast.error(
        formatMessage({
          id: "Toast.taskUpdateError",
          defaultMessage: "Fehler beim Aktualisieren der Aufgabe",
        })
      );
    },

    onSettled: async () => {
      if (!session?.user?.id) return;

      // Invalidate alle user-spezifischen Task Queries
      await queryClient.invalidateQueries({
        queryKey: todoListApi.queryKey.byUser(session.user.id),
      });
    },
  });

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (!session?.user?.id) {
      toast.error(
        formatMessage({
          id: "Toast.notLoggedIn",
          defaultMessage: "Bitte loggen Sie sich ein",
        })
      );
      return;
    }

    updateTaskMutation.mutate(taskData);
  };

  return {
    handleUpdateTask,
    isPendingUpdateMutation: updateTaskMutation.isPending,
    isSuccessUpdateMutation: updateTaskMutation.isSuccess,
    isEnabled: !!session?.user?.id,
  };
}
