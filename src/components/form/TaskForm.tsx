"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { TagInput } from "./TagInput";
import { ValidationErrors } from "./ValidationErrors";
import { Task } from "@/types/task";
import { Controller } from "react-hook-form";
import { cn } from "@/src/lib/utils";
import { useTaskForm } from "@/src/hooks/useTaskForm";
import { FormattedMessage } from "react-intl";
import { useIntl } from "react-intl";
import { DateTimePicker } from "./DateTimePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Save, Plus } from "lucide-react";

interface TaskInputFormProps {
  className?: string;
  task?: Task;
}

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 0:
      return "text-green-600 dark:text-green-400";
    case 1:
      return "text-yellow-600 dark:text-yellow-400";
    case 2:
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

export const TaskInputForm = ({ className, task }: TaskInputFormProps) => {
  const {
    control,
    handleSubmit,
    isSubmitting,
    errors,
    handleCancel,
    onSubmit,
    errorMessages,
  } = useTaskForm({ task });

  const { formatMessage } = useIntl();

  return (
    <div className={className}>
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border pb-6">
          <CardTitle className="text-2xl font-light tracking-tight flex items-center gap-3">
            {task ? (
              <>
                <Save className="w-6 h-6 text-primary" />
                <FormattedMessage
                  defaultMessage="Aufgabe bearbeiten"
                  id="TaskForm.editTask"
                />
              </>
            ) : (
              <>
                <Plus className="w-6 h-6 text-primary" />
                <FormattedMessage
                  defaultMessage="Aufgabe hinzufügen"
                  id="TaskForm.addTask"
                />
              </>
            )}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-y-6 pt-6 px-6">
            {/* Priority Field */}
            <div className="space-y-2">
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3">
                    <Label htmlFor="priority" className="text-sm font-medium">
                      {formatMessage({
                        id: "TaskForm.labels.priority",
                        defaultMessage: "Priorität",
                      })}
                    </Label>
                    <div className="flex items-center gap-3">
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue
                            placeholder={formatMessage({
                              id: "TaskForm.priority.placeholder",
                              defaultMessage: "Priorität auswählen",
                            })}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              {formatMessage({
                                id: "TaskForm.priority.low",
                                defaultMessage: "Niedrig",
                              })}
                            </div>
                          </SelectItem>
                          <SelectItem value="1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              {formatMessage({
                                id: "TaskForm.priority.medium",
                                defaultMessage: "Mittel",
                              })}
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              {formatMessage({
                                id: "TaskForm.priority.high",
                                defaultMessage: "Hoch",
                              })}
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {field.value !== undefined && (
                        <div
                          className={cn(
                            "text-sm font-medium",
                            getPriorityColor(field.value)
                          )}
                        >
                          {field.value === 0 && "Niedrig"}
                          {field.value === 1 && "Mittel"}
                          {field.value === 2 && "Hoch"}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>

            {/* Title Field */}
            <Controller
              name="title"
              control={control}
              rules={{
                required: formatMessage({
                  id: "TaskForm.title.required",
                  defaultMessage: "Titel ist erforderlich",
                }),
                minLength: {
                  value: 3,
                  message: formatMessage({
                    id: "TaskForm.title.minLength",
                    defaultMessage: "Titel muss mindestens 3 Zeichen lang sein",
                  }),
                },
                validate: (title) =>
                  title.trim() !== ""
                    ? true
                    : formatMessage({
                        id: "TaskForm.title.notEmpty",
                        defaultMessage: "Titel darf nicht leer sein",
                      }),
              }}
              render={({ field }) => (
                <div className="space-y-2">
                  <FormInput
                    id="title"
                    label={formatMessage({
                      id: "TaskForm.labels.title",
                      defaultMessage: "Titel",
                    })}
                    className={errors.title && "border-red-500"}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <FormTextarea
                    id="description"
                    label={formatMessage({
                      id: "TaskForm.labels.description",
                      defaultMessage: "Beschreibung (optional)",
                    })}
                    className={
                      errors.description && "border-red-500 dark:border-red-500"
                    }
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Due Date Field */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {formatMessage({
                  id: "TaskForm.labels.dueDate",
                  defaultMessage: "Fälligkeitsdatum (optional)",
                })}
              </Label>
              <Controller
                name="dueDate"
                control={control}
                rules={{
                  validate: (dueDate) => {
                    if (!dueDate) return true;
                    return dueDate.getTime() > new Date().getTime()
                      ? true
                      : formatMessage({
                          id: "TaskForm.dueDate.invalid",
                          defaultMessage:
                            "Fälligkeitsdatum muss in der Zukunft liegen",
                        });
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.dueDate && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.dueDate.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Tags Field */}
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <TagInput
                    tags={field.value}
                    setTags={field.onChange}
                    className={errors.tags && "border-red-500"}
                  />
                  {errors.tags && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.tags.message}
                    </p>
                  )}
                </div>
              )}
            />

            <ValidationErrors errors={errorMessages} />
          </CardContent>
          <CardFooter className="pb-6 px-6 flex flex-col gap-4">
            <Button
              className="w-full py-3 text-base cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Wird gespeichert..."
                : task
                  ? formatMessage({
                      id: "TaskForm.submit.editTask",
                      defaultMessage: "Aufgabe bearbeiten",
                    })
                  : formatMessage({
                      id: "TaskForm.submit.addTask",
                      defaultMessage: "Aufgabe hinzufügen",
                    })}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full py-3 text-base cursor-pointer"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {formatMessage({
                id: "TaskForm.cancel",
                defaultMessage: "Abbrechen",
              })}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
