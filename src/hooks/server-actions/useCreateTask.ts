import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../../api/api";
import { Task } from "@/types/task";
import { toast } from "sonner";
import { useIntl } from "react-intl";
import { authClient } from "@/src/lib/auth-client";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const { data: session } = authClient.useSession();

  const createTaskMutation = useMutation({
    mutationFn: todoListApi.createTask,
    onSuccess: (newTask) => {
      if (!session?.user?.id) return;

      queryClient.invalidateQueries({
        queryKey: todoListApi.queryKey.byUser(session.user.id),
      });

      toast.success(
        `${formatMessage({
          id: "Toast.taskCreated",
          defaultMessage: "Aufgabe erstellt",
        })}: „${newTask.title}"`
      );
    },
    onError: () => {
      toast.error(
        formatMessage({
          id: "Toast.taskCreateError",
          defaultMessage: "Fehler beim Erstellen der Aufgabe",
        })
      );
    },
  });

  const handleCreateTask = (
    taskData: Pick<
      Task,
      "title" | "description" | "tags" | "dueDate" | "priority"
    >
  ) => {
    if (!session?.user?.id) {
      toast.error(
        formatMessage({
          id: "Toast.notLoggedIn",
          defaultMessage: "Bitte loggen Sie sich ein",
        })
      );
      return;
    }

    createTaskMutation.mutate(taskData);
  };

  return {
    handleCreateTask,
    isPendingCreateMutation: createTaskMutation.isPending,
    isSuccessCreateMutation: createTaskMutation.isSuccess,
    isEnabled: !!session?.user?.id,
  };
}
