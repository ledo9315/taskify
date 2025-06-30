import { useState } from "react";
import { Input } from "../ui/input";
import { CornerDownLeft } from "lucide-react";
import { TagBadge } from "@src/components/form/TagBadge";
import { cn } from "@/src/lib/utils";
import { useIntl } from "react-intl";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  className?: string;
}

export const TagInput = ({ tags, setTags, className }: TagInputProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState<string | null>(null);
  const { formatMessage } = useIntl();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const trimmedTag = tagInput.trim();

      if (trimmedTag.length < 3) {
        setTagError(
          formatMessage({
            id: "TagInput.error.minLength",
            defaultMessage: "Tag muss mindestens 3 Zeichen lang sein.",
          })
        );
        return;
      }

      if (!tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setTagError(null);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label htmlFor="tags" className="block mb-2 text-sm font-normal">
        {formatMessage({
          id: "TaskForm.labels.tags",
          defaultMessage: "Tags",
        })}
      </label>
      <div className="relative">
        <Input
          id="tags"
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            if (tagError) setTagError(null);
          }}
          onKeyDown={handleAddTag}
          className={cn(
            "border border-border px-3 py-2 w-full pr-10",
            className
          )}
          placeholder={formatMessage({
            id: "TagInput.placeholder",
            defaultMessage: "Enter drücken, um Tag hinzuzufügen",
          })}
        />
        <CornerDownLeft
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={16}
        />
      </div>

      {tagError && <div className="text-primary text-xs mt-1">{tagError}</div>}

      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <TagBadge
            key={index}
            tag={tag}
            onRemove={() => handleRemoveTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};
