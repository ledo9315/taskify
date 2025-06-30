"use client";

import { Badge } from "@/src/components/ui/badge";
import { FormattedMessage } from "react-intl";
import { ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface TaskItemPriorityProps {
  priority: 0 | 1 | 2;
}

export const TaskItemPriority = ({ priority }: TaskItemPriorityProps) => {
  const getPriorityConfig = (priority: 0 | 1 | 2) => {
    switch (priority) {
      case 2:
        return {
          className:
            "bg-red-50/80 text-red-700 border-red-600/20 hover:bg-red-50 hover:border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-600/40 dark:hover:bg-red-900/90 dark:hover:border-red-800",
          icon: <AlertTriangle className="w-3 h-3" />,
          messageId: "TaskForm.priority.high",
          defaultMessage: "Hoch",
        };
      case 1:
        return {
          className:
            "bg-amber-50/80 text-amber-700 border-amber-600/20 hover:bg-amber-50 hover:border-amber-200 dark:bg-amber-800/20 dark:text-amber-200 dark:border-amber-600/40 dark:hover:bg-amber-900/90 dark:hover:border-amber-800",
          icon: <ChevronUp className="w-3 h-3" />,
          messageId: "TaskForm.priority.medium",
          defaultMessage: "Mittel",
        };
      case 0:
      default:
        return {
          className:
            "bg-slate-50/80 text-slate-600 border-slate-600/20 hover:bg-slate-50 hover:border-slate-200 dark:bg-slate-600/20 dark:text-slate-200 dark:border-slate-600/40 dark:hover:bg-slate-900/90 dark:hover:border-slate-800",
          icon: <ChevronDown className="w-3 h-3" />,
          messageId: "TaskForm.priority.low",
          defaultMessage: "Niedrig",
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium px-3 py-1 border transition-all duration-200 rounded-md backdrop-blur-sm",
        config.className
      )}
    >
      {config.icon}
      <FormattedMessage
        id={config.messageId}
        defaultMessage={config.defaultMessage}
      />
    </Badge>
  );
};
