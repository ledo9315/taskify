interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container = ({ className, children }: Props) => {
  return (
    <div className={`h-full flex flex-col ${className || ""}`}>
      <div className="w-full lg:w-5/6 xl:w-7/10 2xl:w-6/10 mx-auto flex flex-col h-full animate-fade-in">
        {children}
      </div>
    </div>
  );
};
