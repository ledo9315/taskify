import { cn } from "@/src/lib/utils";
import { usePathname } from "next/navigation";
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
  useIntl,
} from "react-intl";

interface TaskItemDateProps {
  createdAt: Date;
  updatedAt: Date | null;
  dueDate?: Date | null;
  className?: string;
}

export const TaskItemDate = ({
  createdAt,
  updatedAt,
  dueDate,
  className,
}: TaskItemDateProps) => {
  const { formatMessage } = useIntl();
  const pathname = usePathname();
  const isTaskPage = pathname.includes("/task/");

  const renderDueDateContent = () => {
    if (!dueDate) return null;

    const now = new Date();
    const due = new Date(dueDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDay = new Date(due);
    dueDay.setHours(0, 0, 0, 0);

    const diffTime = dueDay.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    let colorClass = "text-primary";
    let content = null;

    if (now > due) {
      // Overdue
      colorClass = "text-destructive";
      if (diffDays === -1) {
        content = (
          <FormattedMessage
            id="TaskItemDate.DueYesterday"
            defaultMessage="Gestern fällig gewesen"
          />
        );
      } else {
        colorClass = "text-red-500";
        content = (
          <>
            <FormattedMessage
              id="TaskItemDate.OverdueSince"
              defaultMessage="Überfällig seit"
            />{" "}
            <FormattedDate
              value={due}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </>
        );
      }
    } else if (diffDays === 0) {
      colorClass = "text-orange-500";
      content = (
        <>
          <FormattedMessage
            id="TaskItemDate.DueToday"
            defaultMessage="Fällig heute um"
          />{" "}
          <FormattedTime value={due} />{" "}
          {formatMessage({
            id: "TaskItemDate.timeUnit",
            defaultMessage: "Uhr",
          })}
        </>
      );
    } else if (diffDays === 1) {
      colorClass = "text-yellow-500";
      content = (
        <>
          <FormattedMessage
            id="TaskItemDate.DueTomorrow"
            defaultMessage="Fällig morgen um"
          />{" "}
          <FormattedTime value={due} />{" "}
          {formatMessage({
            id: "TaskItemDate.timeUnit",
            defaultMessage: "Uhr",
          })}
        </>
      );
    } else {
      content = (
        <>
          <FormattedMessage
            id="TaskItemDate.DueOn"
            defaultMessage="Fällig am"
          />{" "}
          <FormattedDate
            value={due}
            year="numeric"
            month="long"
            day="2-digit"
          />
        </>
      );
    }

    return (
      <div className={`text-sm font-semibold ${colorClass}`}>{content}</div>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-y-1",
        isTaskPage ? "items-start" : "items-end",
        className
      )}
    >
      {renderDueDateContent()}

      <div className="text-xs text-muted-foreground">
        {updatedAt ? (
          <>
            <FormattedMessage
              defaultMessage="Aktualisiert am"
              id="TaskItemDate.UpdatedText"
            />{" "}
            <FormattedDate
              value={updatedAt}
              year="numeric"
              month="long"
              day="2-digit"
            />{" "}
            <FormattedTime value={updatedAt} />{" "}
            {formatMessage({
              id: "TaskItemDate.timeUnit",
              defaultMessage: "Uhr",
            })}
          </>
        ) : (
          <>
            <FormattedMessage
              defaultMessage="Erstellt am"
              id="TaskItemDate.CreatedText"
            />{" "}
            <FormattedDate
              value={createdAt}
              year="numeric"
              month="long"
              day="2-digit"
            />{" "}
            <FormattedTime value={createdAt} />{" "}
            {formatMessage({
              id: "TaskItemDate.timeUnit",
              defaultMessage: "Uhr",
            })}
          </>
        )}
      </div>
    </div>
  );
};
