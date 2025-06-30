import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/task";
import { todoListApi } from "../../api/api";
import { toast } from "sonner";
import { useIntl } from "react-intl";
import { authClient } from "@/src/lib/auth-client";

export function useToggleTask() {
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const { data: session } = authClient.useSession();

  const toggleTaskMutation = useMutation({
    mutationFn: async (updateData: { id: number; complete: boolean }) => {
      // Hole alle Tasks aus der Haupt-Query
      const allTasksQueryKey = session?.user?.id
        ? todoListApi.queryKey.byUser(session.user.id)
        : todoListApi.baseQueryKey;

      const allTasks = queryClient.getQueryData<Task[]>(allTasksQueryKey) || [];
      const taskToToggle = allTasks.find((task) => task.id === updateData.id);

      const result = await todoListApi.updateTask(updateData);

      return {
        ...updateData,
        title:
          taskToToggle?.title ||
          formatMessage({
            id: "Toast.unknown",
            defaultMessage: "Unbekannt",
          }),
        result,
      };
    },

    onMutate: async (mutateVariables) => {
      if (!session?.user?.id) return { prevData: [] };

      // User-spezifische Query Key für alle Tasks
      const allTasksQueryKey = todoListApi.queryKey.byUser(session.user.id);

      // Cancel die Haupt-Query
      await queryClient.cancelQueries({ queryKey: allTasksQueryKey });

      // Aktuelle Daten sichern
      const prevAllTasks =
        queryClient.getQueryData<Task[]>(allTasksQueryKey) || [];

      // Optimistic Update für alle Tasks
      const updatedTasks = prevAllTasks.map((task) =>
        task.id === mutateVariables.id
          ? { ...task, complete: mutateVariables.complete }
          : task
      );

      queryClient.setQueryData(allTasksQueryKey, updatedTasks);

      return {
        prevAllTasks,
        allTasksQueryKey,
      };
    },

    onSuccess: (data) => {
      const statusMessage = data.complete
        ? formatMessage({
            id: "Toast.taskToggled.completed",
            defaultMessage: "Aufgabe als erledigt markiert",
          })
        : formatMessage({
            id: "Toast.taskToggled.open",
            defaultMessage: "Aufgabe als offen markiert",
          });

      toast.success(`${statusMessage}: „${data.title}"`);
    },

    onError: (_, __, ctx) => {
      if (!ctx || !session?.user?.id) return;

      // Rollback für alle Tasks
      if (ctx.prevAllTasks) {
        queryClient.setQueryData(ctx.allTasksQueryKey, ctx.prevAllTasks);
      }

      toast.error(
        formatMessage({
          id: "Toast.taskToggleError",
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

  const handleToggleTask = (id: number, done: boolean) => {
    if (!session?.user?.id) {
      toast.error(
        formatMessage({
          id: "Toast.notLoggedIn",
          defaultMessage: "Bitte loggen Sie sich ein",
        })
      );
      return;
    }

    toggleTaskMutation.mutate({
      id: id,
      complete: !done,
    });
  };

  return {
    handleToggleTask,
    isSuccessToggleMutation: toggleTaskMutation.isSuccess,
    isPendingToggleMutation: toggleTaskMutation.isPending,
    isEnabled: !!session?.user?.id,
  };
}
