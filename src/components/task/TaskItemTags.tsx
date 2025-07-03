import { cn } from "@/src/lib/utils";

interface TaskItemTagsProps {
  tags: string[];
  className?: string;
}

export const TaskItemTags = ({ tags, className }: TaskItemTagsProps) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <div
          className={cn(
            "flex justify-end md:justify-start flex-wrap gap-2.5 w-full",
            className
          )}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="h-7 text-xs font-medium text-muted-foreground bg-secondary/80 border border-border/40 px-3 py-1 rounded-md transition-all duration-200 hover:bg-secondary hover:border-border/60 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
