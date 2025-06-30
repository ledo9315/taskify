import { LocaleLink } from "@src/components/locale/LocaleLink";

interface TaskItemTitleProps {
  title: string;
  complete: boolean;
  id: string;
}

export const TaskItemTitle = ({ title, complete, id }: TaskItemTitleProps) => {
  return (
    <>
      <LocaleLink href={`/task/${id}`}>
        <span
          className={`${
            complete ? "line-through text-muted-foreground" : "font-medium"
          } wrap-break-word max-w-[30%] lg:max-w-full transition-all duration-300`}
        >
          {title}
        </span>
      </LocaleLink>
    </>
  );
};
