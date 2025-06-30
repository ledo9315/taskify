interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({ className, children }: Props) => {
  return (
    <div className={`h-full flex flex-col ${className || ""}`}>
      <div className="w-full mx-auto flex flex-col h-full animate-fade-in">
        {children}
      </div>
    </div>
  );
};
