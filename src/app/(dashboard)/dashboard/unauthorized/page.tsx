import React from 'react'
import { Lock } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <Lock className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">
        No tienes permiso
      </h2>
      <p className="mt-2 text-gray-500 max-w-sm">
        No puedes acceder a esta sección. Si crees que se trata de un error,
        contacta con el administrador del sistema.
      </p>
    </div>
  );
}
