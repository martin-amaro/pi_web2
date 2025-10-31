import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import Button from "@/app/ui/Button";

const RestaurantsPage = async () => {
  const session = await auth();

  return (
    <div className="py-20 bg-gradient-to-b from-white to-[#f7fbff] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-title">
            Soluciones para Restaurantes
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-app">
            Todo lo que necesitas para abrir, gestionar y escalar tu restaurante:
            reservas, cartas digitales, TPV y control de operaciones.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: resumen y CTA */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold">¿Por qué elegirnos?</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-2" />
                  Gestión de mesas y reservas en tiempo real
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-2" />
                  Pedidos desde mesa y cocina integrados con TPV
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mt-2" />
                  Reportes de ventas y control de costes
                </li>
              </ul>

              <div className="mt-6">
                <Button variant="secondary">
                  {session ? "Ir al panel del restaurante" : "Ver planes y demo"}
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-medium">Casos de uso</h3>
              <div className="mt-3 text-gray-700 space-y-2">
                <p>Pequeños locales: gestión simple para mesas y pedidos.</p>
                <p>Restaurantes con cocina: integración de órdenes y kitchen display.</p>
                <p>Cadena de restaurantes: control multi-sucursal y reportes consolidados.</p>
              </div>
            </div>
          </aside>

          {/* Columna derecha: CTA a registro y guía */}
          <main className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold">Registrar tu restaurante</h2>
              <p className="mt-2 text-gray-600">
                Con un solo registro podrás crear la empresa-restaurante en tu cuenta,
                configurar menús, mesas y usuarios.
              </p>

              <div className="mt-6">
                {/* Botón que redirige a la página de registro */}
                <Link href="/register" legacyBehavior>
                  <a>
                    <Button variant="primary">Registrar empresa</Button>
                  </a>
                </Link>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-medium">Guía rápida de configuración</h3>
              <ol className="mt-3 list-decimal list-inside text-gray-700 space-y-2">
                <li>Registrar datos básicos del restaurante y ubicación.</li>
                <li>Configurar mesas y zonas del salón.</li>
                <li>Subir menús y precios; activar pedidos desde mesa.</li>
                <li>Conectar TPV y revisar reportes de ventas.</li>
              </ol>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <RestaurantsPage />;
}
