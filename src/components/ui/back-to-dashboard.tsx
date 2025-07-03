import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { FormattedMessage } from "react-intl";
import { useNavigation } from "@/src/hooks/useNavigation";
import { cn } from "@/src/lib/utils";

interface BackToDashboardButtonProps {
  className?: string;
}

export const BackToDashboardButton = ({
  className,
}: BackToDashboardButtonProps) => {
  const { backToDashboard } = useNavigation();

  return (
    <div className={cn(className)}>
      <Button
        variant="outline"
        onClick={backToDashboard}
        className="flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeft size={16} />
        <FormattedMessage
          id="Navigation.backToDashboard"
          defaultMessage="Zurück zum Dashboard"
        />
      </Button>
    </div>
  );
};
