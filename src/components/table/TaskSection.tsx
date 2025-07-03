import { Task } from "@/types/task";
import { EmptyTaskList } from "./EmptyTaskList";
import { LoaderCircle } from "lucide-react";
import TaskItem from "../task/TaskItem";
import { useIntl } from "react-intl";

interface Props {
  className?: string;
  completed: boolean;
  tasks: Task[];
  isPending?: boolean;
  isError?: boolean;
}

export const TaskSection = ({
  className,
  completed,
  tasks,
  isPending,
  isError,
}: Props) => {
  const { formatMessage } = useIntl();

  if (isPending) {
    return (
      <div className="py-4 px-3 bg-secondary/50 border-l-2 border-accent">
        <span className="text-sm italic text-accent flex items-center justify-center gap-2">
          {formatMessage({
            id: "TaskSection.isPending.showLoadingText",
            defaultMessage: "Lade Aufgaben...",
          })}
          <LoaderCircle className="w-4 h-4 animate-spin text-accent" />
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-4 px-3 text-accent bg-red-300/50 border-l-2 border-red-800/40">
        <p className="text-sm text-center italic text-red-800">
          {formatMessage({
            id: "TaskSection.isError.showErrorText",
            defaultMessage: "Fehler beim Laden der Aufgaben",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <section className="animate-slide-in">
        {completed ? (
          tasks.length === 0 ? (
            <EmptyTaskList
              message={formatMessage({
                id: "TaskSection.isLoaded.noCompletedTasks",
                defaultMessage: "Keine abgeschlossenen Aufgaben",
              })}
            />
          ) : (
            <div className="space-y-1">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          )
        ) : tasks.length === 0 ? (
          <EmptyTaskList
            message={formatMessage({
              id: "TaskSection.isLoaded.noOpenTasks",
              defaultMessage: "Keine offenen Aufgaben",
            })}
          />
        ) : (
          <div className="space-y-1">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
