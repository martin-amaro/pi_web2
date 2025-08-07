'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { APP_BACKEND } from '../config';

export const BackendTester = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${APP_BACKEND}/test`);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (!error) return null;

  return (
    <div className="w-full flex items-start justify-between gap-4 p-4 bg-red-100 border border-red-300 text-red-800">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-red-700 mt-1" />
        <div>
          <h2 className="text-lg font-semibold">Backend no disponible</h2>
          <p className="text-sm">
            Parece que el servidor no está respondiendo correctamente. Por favor, verifica que el backend esté en ejecución.
          </p>
          <p className="text-sm">Servidor utilizado: {APP_BACKEND}</p>
        </div>
      </div>
      <button
        onClick={() => setError(false)}
        className="text-red-600 hover:text-red-800 transition mt-1 cursor-pointer"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
