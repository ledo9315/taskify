import { useDeleteTask } from "@/src/hooks/server-actions/useDeleteTask";
import { useToggleTask } from "@/src/hooks/server-actions/useToggleTask";
import { Check, Pencil, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface TaskItemActionsProps {
  id: number;
  title: string;
  complete: boolean;
}

export const TaskItemActions = ({
  id,
  title,
  complete,
}: TaskItemActionsProps) => {
  const { handleToggleTask, isPendingToggleMutation, isSuccessToggleMutation } =
    useToggleTask();
  const { handleDeleteTask, isPendingDeleteMutation, isSuccessDeleteMutation } =
    useDeleteTask();

  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    if (isSuccessToggleMutation) router.back();
    if (isSuccessDeleteMutation) router.back();
  }, [isSuccessToggleMutation, isSuccessDeleteMutation, router]);

  return (
    <>
      <div
        className={
          "flex flex-row items-center gap-0 text-sm transition-opacity duration-300"
        }
      >
        <button
          onClick={() => handleToggleTask(id, complete)}
          className="px-2 py-0.5 transition-all duration-200 cursor-pointer hover:bg-gray-100 rounded-md border border-transparent hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {complete ? (
            <Undo className="w-4 h-4 text-gray-500" />
          ) : (
            <Check className="w-4 h-4 text-gray-500" />
          )}
        </button>
        <button
          onClick={() => router.push(`/${locale}/edit/${id}`)}
          disabled={isPendingToggleMutation}
          className="px-2 py-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md border border-transparent hover:border-gray-200"
        >
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
        <button
          onClick={() => handleDeleteTask(id, title)}
          disabled={isPendingDeleteMutation}
          className="px-2 py-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md border border-transparent hover:border-gray-200"
        >
          <Trash className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </>
  );
};
