import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div
          className={clsx(
            "flex items-center text-red-600 text-sm mt-1 gap-2",
            className
          )}
        >
          <CircleX size={16} />
          <span>{message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
