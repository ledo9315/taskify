"use client";

import { Task } from "@/types/task";
import { TaskItemActions } from "./TaskItemActions";
import { TaskItemDescription } from "./TaskItemDescription";
import { TaskItemTags } from "./TaskItemTags";
import { TaskItemTitle } from "./TaskItemTitle";
import { TaskItemDate } from "./TaskItemDate";
import { TaskItemPriority } from "./TaskItemPriority";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div
      className={`
        task-card py-5 px-4 my-3 w-full border border-border
        transition-all duration-300 rounded-lg
        ${task.complete ? "opacity-60 hover:opacity-75" : "hover:translate-y-[-1px]"}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col items-start md:items-center md:flex-row gap-3 flex-1 min-w-0">
          <TaskItemTitle
            title={task.title}
            complete={task.complete}
            id={task.id.toString()}
          />
          <TaskItemPriority priority={task.priority} />
        </div>
        <div className="flex-shrink-0">
          <TaskItemActions
            id={task.id}
            title={task.title}
            complete={task.complete}
          />
        </div>
      </div>
      <TaskItemDescription
        description={task.description || ""}
        className="border-b border-border pb-3"
      />
      <div className="flex items-start justify-between mt-6 flex-col md:flex-row md:items-center gap-y-2">
        <TaskItemTags tags={task.tags} />
        <TaskItemDate
          createdAt={task.createdAt}
          updatedAt={task.updatedAt || null}
          dueDate={task.dueDate || null}
        />
      </div>
    </div>
  );
};

export default TaskItem;
