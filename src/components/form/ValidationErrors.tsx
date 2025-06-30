import { AlertCircle } from "lucide-react";

interface Props {
  errors: string[];
  className?: string;
}

export const ValidationErrors = ({ className, errors }: Props) => {
  return (
    <div className={className}>
      {errors.length > 0 && (
        <div className="mt-4 p-3">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-red-500 text-sm mb-1"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
