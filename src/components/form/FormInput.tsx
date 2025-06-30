import { cn } from "@/src/lib/utils";
import { Input } from "../ui/input";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FormInput = ({ className, id, label, value, onChange }: Props) => {
  return (
    <div className={className}>
      <div className="relative">
        <label htmlFor={id} className="block mb-2 text-sm font-normal">
          {label}
        </label>
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          id={id}
          type="text"
          className={cn(
            "border border-border px-3 py-2 w-full dark:bg-input/60",
            className
          )}
        />
      </div>
    </div>
  );
};
