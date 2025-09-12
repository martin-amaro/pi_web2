import { CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AuthError = ({ message }: { message: string }) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mt-6">
            <CircleX size={24} className="text-red-600" />
            <span className="text-sm font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
