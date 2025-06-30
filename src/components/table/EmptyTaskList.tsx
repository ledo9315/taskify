"use client";

interface EmptyTaskListProps {
  message: string;
}

export const EmptyTaskList = ({ message }: EmptyTaskListProps) => (
  <div className="my-6 py-4 px-3 bg-secondary/50 text-muted-foreground text-center border-l-2 border-accent">
    <p className="text-sm text-accent italic">{message}</p>
  </div>
);
