"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Unlink } from "lucide-react";
import Button from "./ui/Button";

export default function Page() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Solo si hay historial previo
    if (window.history.length > 1) {
      setCanGoBack(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <Unlink className="w-8 h-8 text-red-500" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800">404</h2>
      <p className="mt-2 text-gray-500 max-w-sm">
        Parece que esta página no existe o no está disponible en este momento.
      </p>

      {canGoBack && (
        <Button
          className="mt-6 w-40"
          type="secondary"
          onClick={() => router.back()}
        >
          Volver atrás
        </Button>
      )}

      <Button className="mt-3 w-40" href="/">
        Volver al inicio
      </Button>
    </div>
  );
}
