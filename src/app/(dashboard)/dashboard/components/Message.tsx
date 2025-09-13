'use client'

import { CircleCheckBig, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

interface MessageProps {
  message: string | null;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
}


export const Message = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: MessageProps) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (!message) return;

    setVisible(true); // Mostrar el mensaje cuando se actualiza

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Llamar a la función onClose si se proporciona
    }, duration);

    return () => clearTimeout(timer); // Limpiar el temporizador anterior
  }, [message, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-14 middle:top-0 left-0 middle:left-[280px] right-0 z-[1000] animate-fade-in animate-duration-200 pointer-events-none shadow-md">
      <div
        className={`h-full w-full p-4 text-sm text-white flex justify-center items-center gap-2 ${
          type === "success" ? "bg-[#00b23b]" : "bg-[#cc0023]"
        }`}
        role="alert"
      >
        {type === "success" ? (
          <CircleCheckBig className="size-6" />
        ) : (
          <CircleX className="size-6" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
