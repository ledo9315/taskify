import { useDeleteTask } from "@/src/hooks/server-actions/useDeleteTask";
import { useToggleTask } from "@/src/hooks/server-actions/useToggleTask";
import { Check, Pencil, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

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

  // Animation variants für das Icon-Wackeln
  const iconWiggleVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -4, 4, -2, 2, 0],
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  // Animation variants für den Button-Container
  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  useEffect(() => {
    if (isSuccessToggleMutation) router.back();
    if (isSuccessDeleteMutation) router.back();
  }, [isSuccessToggleMutation, isSuccessDeleteMutation, router]);

  return (
    <>
      <motion.div
        className={
          "flex flex-row items-center gap-0 text-sm transition-opacity duration-300"
        }
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        }}
      >
        {/* Toggle Button */}
        <motion.button
          onClick={() => handleToggleTask(id, complete)}
          className="px-2 py-0.5 transition-all duration-200 cursor-pointer hover:bg-gray-100 rounded-md border border-transparent hover:border-green-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed group"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          disabled={isPendingToggleMutation}
        >
          <motion.div variants={iconWiggleVariants}>
            {complete ? (
              <Undo className="w-4 h-4 text-gray-500 group-hover:text-green-600" />
            ) : (
              <Check className="w-4 h-4 text-gray-500 group-hover:text-green-600" />
            )}
          </motion.div>
        </motion.button>

        {/* Edit Button */}
        <motion.button
          onClick={() => router.push(`/${locale}/edit/${id}`)}
          disabled={isPendingToggleMutation}
          className="px-2 py-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-transparent hover:border-blue-500 group"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div variants={iconWiggleVariants}>
            <Pencil className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
          </motion.div>
        </motion.button>

        {/* Delete Button */}
        <motion.button
          onClick={() => handleDeleteTask(id, title)}
          disabled={isPendingDeleteMutation}
          className="px-2 py-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-transparent hover:border-red-500 group"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div variants={iconWiggleVariants}>
            <Trash className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
};
