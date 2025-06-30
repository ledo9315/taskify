import { cn } from "@/src/lib/utils";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const FormTextarea = ({
  id,
  label,
  value,
  className,
  onChange,
}: Props) => {
  return (
    <div className={className}>
      <div className="relative">
        <label htmlFor="description" className="block mb-2 text-sm font-normal">
          {label}
        </label>
        <textarea
          onChange={(e) => onChange(e.target.value)}
          value={value}
          id={id}
          className={cn(
            "w-full min-h-[120px] px-3 py-2 border border-border transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-input/60 dark:border-[#3a3a3a] dark:text-foreground rounded-md",
            className
          )}
        />
      </div>
    </div>
  );
};
