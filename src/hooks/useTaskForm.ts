"use client";

import { useRouter, useParams } from "next/navigation";
import { useUpdateTask } from "./server-actions/useUpdateTask";
import { useCreateTask } from "./server-actions/useCreateTask";
import { useForm } from "react-hook-form";
import { Task } from "@/types/task";
import { useEffect } from "react";

export interface TaskInputFormProps {
  className?: string;
  task?: Task;
}

export const useTaskForm = ({ task }: TaskInputFormProps) => {
  const { handleUpdateTask, isSuccessUpdateMutation: isUpdateSuccess } =
    useUpdateTask();
  const { handleCreateTask, isSuccessCreateMutation: isCreateSuccess } =
    useCreateTask();
  const router = useRouter();
  const params = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Task, "complete" | "id"> & { tags: string[] }>({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      tags: task?.tags || [],
      dueDate: task?.dueDate || undefined,
      priority: task?.priority || 0,
    },
  });

  const onSubmit = (
    data: Pick<Task, "title" | "description" | "tags" | "dueDate" | "priority">
  ) => {
    if (task) {
      handleUpdateTask({
        id: task.id,
        title: data.title,
        description: data.description,
        tags: data.tags,
        dueDate: data.dueDate,
        priority: data.priority,
      });
    } else {
      handleCreateTask({
        title: data.title,
        description: data.description,
        tags: data.tags,
        dueDate: data.dueDate,
        priority: data.priority,
      });
    }
  };

  const handleCancel = () => {
    // Navigiere zur Hauptseite
    const locale = params.locale || "de";
    router.push(`/${locale}`);
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      // Navigiere zur Hauptseite nach erfolgreichem Update
      const locale = params.locale || "de";
      router.push(`/${locale}`);
    }
  }, [isUpdateSuccess, router, params]);

  useEffect(() => {
    if (isCreateSuccess) {
      const locale = params.locale || "de";
      router.push(`/${locale}`);
    }
  }, [isCreateSuccess, router, params]);

  const errorMessages = Object.values(errors).map((err) => err?.message ?? "");
  return {
    control,
    handleSubmit,
    handleCancel,
    isSubmitting,
    errors,
    onSubmit,
    errorMessages,
  };
};
