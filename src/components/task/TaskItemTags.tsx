interface TaskItemTagsProps {
  tags: string[];
}

export const TaskItemTags = ({ tags }: TaskItemTagsProps) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2.5 max-w-1/2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium text-muted-foreground bg-secondary/80 border border-border/40 px-3 py-1 rounded-md transition-all duration-200 hover:bg-secondary hover:border-border/60 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
