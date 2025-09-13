import clsx from "clsx";
import { CircleX } from "lucide-react";

export const InputError = ({
  message = "",
  className,
}: {
  message: string | undefined;
  className?: string;
}) => {
  if (!message) return null;
  return (
    <div
      className={clsx(
        "flex items-center text-red-600 text-sm mt-1 gap-2",
        className
      )}
    >
      <CircleX size={16} />
      <span>{message}</span>
    </div>
  );
};
