import { SearchX } from 'lucide-react';
import React from 'react'

export const NoResultsArticles = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <SearchX className="w-8 h-8 text-gray-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">
        No se han encontrado resultados
      </h2>
      <p className="mt-2 text-gray-500 max-w-sm">
        Intenta ajustar los filtros o busca con otras palabras.
      </p>
    </div>
  );
}
