export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const Card = ({ className = '', children, ...props }: CardProps) => {
  return (
    <div {...props} className={"bg-white rounded-xl shadow p-5 " + className}>
      {children}
    </div>
  );
};
