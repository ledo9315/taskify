import { Task } from "@/types/task";
import { UseQueryResult } from "@tanstack/react-query";
import { DEFAULT_LOCALE } from "../locale/locale";
import { useParams } from "next/navigation";

interface Props {
  className?: string;
  taskQuery: UseQueryResult<Task, Error>;
}

export const LoadingScreen = ({ className, taskQuery }: Props) => {
  const params = useParams();
  const locale = (params?.locale as string) || DEFAULT_LOCALE;

  if (taskQuery.isLoading) {
    return (
      <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="font-medium">
            {locale === "de" ? "Wird geladen..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }
  if (taskQuery.isError) {
    return <span>Fehler beim Laden...</span>;
  }
  return <div className={className}>{null}</div>;
};
