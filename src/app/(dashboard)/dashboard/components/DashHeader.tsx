export const DashHeader = ({ title } : { title: string}) => {
  return (
    <div className="w-full py-4 px-6 bg-dash-header text-blue-text font-semibold text-sm">
      {title}
    </div>
  );
};
