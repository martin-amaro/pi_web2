import Button from "@/app/ui/Button";
import { Crown } from "lucide-react";
import React from "react";

export const PremiumFeature = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
        <Crown className="w-8 h-8 text-yellow-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">Función Premium</h2>
      <p className="mt-2 text-gray-500 max-w-sm">
        Esta característica está disponible solo para usuarios con plan Premium.
        Mejora tu cuenta para desbloquear acceso completo.
      </p>
      <Button className="mt-6" href="/pricing">Ver planes</Button>
    </div>
  );
};
