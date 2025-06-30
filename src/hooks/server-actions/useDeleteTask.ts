import { authClient } from "@/src/lib/auth-client";
import { Task } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useIntl } from "react-intl";

import { todoListApi } from "../../api/api";

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const { data: session } = authClient.useSession();

  const deleteTaskMutation = useMutation({
    mutationFn: async ({ id, title }: { id: number; title: string }) => {
      if (!session?.user?.id) {
        throw new Error("Not authenticated");
      }

      await todoListApi.deleteTask(id);

      return {
        id,
        title:
          title ||
          formatMessage({
            id: "Toast.unknown",
            defaultMessage: "Unbekannt",
          }),
      };
    },

    onMutate: async (deletedTask: { id: number; title: string }) => {
      if (!session?.user?.id) return { prevData: [] };

      // User-spezifische Query Key für alle Tasks
      const allTasksQueryKey = todoListApi.queryKey.byUser(session.user.id);

      // Cancel die Haupt-Query
      await queryClient.cancelQueries({ queryKey: allTasksQueryKey });

      // Aktuelle Daten sichern
      const prevAllTasks =
        queryClient.getQueryData<Task[]>(allTasksQueryKey) || [];

      // Optimistic Update: Task aus allen Tasks entfernen
      const updatedTasks = prevAllTasks.filter(
        (task) => task.id !== deletedTask.id
      );

      queryClient.setQueryData(allTasksQueryKey, updatedTasks);

      return {
        prevAllTasks,
        allTasksQueryKey,
      };
    },

    onSuccess: (data) => {
      toast.success(
        `${formatMessage({
          id: "Toast.taskDeleted",
          defaultMessage: "Aufgabe gelöscht",
        })}: „${data.title}"`
      );
    },

    onError: (_, __, ctx) => {
      if (!ctx || !session?.user?.id) return;

      if (ctx.prevAllTasks) {
        queryClient.setQueryData(ctx.allTasksQueryKey, ctx.prevAllTasks);
      }

      toast.error(
        formatMessage({
          id: "Toast.taskDeleteError",
          defaultMessage: "Fehler beim Löschen der Aufgabe",
        })
      );
    },

    onSettled: async () => {
      if (!session?.user?.id) return;

      await queryClient.invalidateQueries({
        queryKey: todoListApi.queryKey.byUser(session.user.id),
      });
    },
  });

  const handleDeleteTask = (id: number, title: string) => {
    if (!session?.user?.id) {
      toast.error(
        formatMessage({
          id: "Toast.notLoggedIn",
          defaultMessage: "Bitte loggen Sie sich ein",
        })
      );
      return;
    }

    deleteTaskMutation.mutate({ id, title });
  };

  return {
    handleDeleteTask,
    isPendingDeleteMutation: deleteTaskMutation.isPending,
    isSuccessDeleteMutation: deleteTaskMutation.isSuccess,
    isEnabled: !!session?.user?.id,
  };
}
