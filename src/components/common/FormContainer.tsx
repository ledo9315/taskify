import { cn } from "@/src/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export const FormContainer = ({ className, children, size }: Props) => {
  return (
    <div className={cn(className)}>
      <div className={`container max-w-${size} mx-auto h-full`}>{children}</div>
    </div>
  );
};
