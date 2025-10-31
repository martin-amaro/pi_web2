import { Card } from "@/app/components/Card";

export const TopCard = ({
  icon,
  title,
  value = 0,
}: {
  icon: React.ReactNode;
  title: string;
  value?: number;
}) => {
  return (
    <Card className="w-full col-span-1 flex items-center gap-4 bg-white hover:bg-white/50 transition-colors duration-100">
      <div className="p-3 bg-[#e9edf6] rounded-lg">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-neutral-800 mt-1">{value}</p>
        <h2 className="text-gray-600 text-sm font-semibold">{title}</h2>
      </div>
    </Card>
  );
};
