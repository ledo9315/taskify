interface TagBadgeProps {
  tag: string;
  onRemove: () => void;
}

export const TagBadge = ({ tag, onRemove }: TagBadgeProps) => {
  return (
    <span className="bg-secondary text-muted-foreground px-3 py-1 text-xs flex items-center gap-1.5 border border-border">
      {tag}
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        &times;
      </button>
    </span>
  );
};
