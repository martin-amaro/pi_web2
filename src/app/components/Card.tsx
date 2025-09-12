export const Card = ({ className, children }: { className: string, children: React.ReactNode}) => {
  return (
    <div className={"bg-white rounded-xl shadow p-5 " + className}>
      {children}
    </div>
  );
};
