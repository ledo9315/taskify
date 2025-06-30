import { TaskInputForm } from "@/src/components/form/TaskForm";
import { Task } from "@/types/task";
import { UseQueryResult } from "@tanstack/react-query";
import { LoadingScreen } from "../common/LoadingScreen";
import { FormattedMessage } from "react-intl";

interface TaskEditorProps {
  taskQuery: UseQueryResult<Task, Error>;
  renderWrapper?: (children: React.ReactNode) => React.ReactNode;
}

export function TaskEditor({
  taskQuery,
  renderWrapper = (children) => children,
}: TaskEditorProps) {
  if (taskQuery.isLoading) {
    return <LoadingScreen taskQuery={taskQuery} />;
  }

  if (taskQuery.isError) {
    return (
      <div>
        <FormattedMessage
          defaultMessage="Fehler beim Laden der Aufgabe."
          id="TaskEditor.errorMessage"
        />
      </div>
    );
  }

  return renderWrapper(<TaskInputForm task={taskQuery.data} />);
}
