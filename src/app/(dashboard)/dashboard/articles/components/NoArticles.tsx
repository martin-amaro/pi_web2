import { Package, UsersRound } from 'lucide-react';
import React from 'react'

export const NoArticles = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
        <Package className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">
        No tienes productos
      </h2>
      <p className="mt-2 text-gray-500 max-w-sm">
        Parece que aún no has agregado ningún producto. Comienza a crear tu
        inventario para gestionar tus artículos de manera eficiente.
      </p>
    </div>
  );
}
