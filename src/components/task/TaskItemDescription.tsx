import { cn } from "@/src/lib/utils";

interface TaskItemDescriptionProps {
  description: string;
  className?: string;
}

export const TaskItemDescription = ({
  description,
  className,
}: TaskItemDescriptionProps) => {
  return (
    <div>
      {description && (
        <div
          className={cn(
            "mt-3 text-sm text-muted-foreground leading-relaxed",
            className
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
};
