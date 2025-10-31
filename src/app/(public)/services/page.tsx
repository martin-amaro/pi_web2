import React from "react";
import { auth } from "@/auth";
import Button from "@/app/ui/Button";
import Link from "next/link";
import { Check } from "lucide-react";

export default async function Page() {
  const session = await auth();

  return (
    <div className="py-24 bg-gradient-to-b from-white to-[#f3f6fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display text-title sm:text-4xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-app">
            Todo lo que necesitas para gestionar tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {servicios.map((servicio, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{servicio.titulo}</h3>
              <ul className="space-y-3">
                {servicio.caracteristicas.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/register" legacyBehavior>
            <Button variant="primary">
              {session ? "Ir al Panel" : "Comenzar ahora"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const servicios = [
  {
    titulo: "Gestión de Negocio",
    caracteristicas: [
      "Control de ventas e inventario",
      "Gestión de empleados y horarios",
      "Reportes y análisis en tiempo real",
      "Panel administrativo intuitivo"
    ]
  },
  {
    titulo: "Atención al Cliente",
    caracteristicas: [
      "Sistema de reservas online",
      "Gestión de citas y recordatorios",
      "Seguimiento de satisfacción",
      "Comunicación automatizada"
    ]
  },
  {
    titulo: "Herramientas de Venta",
    caracteristicas: [
      "Terminal punto de venta (TPV)",
      "Catálogo de productos digital",
      "Control de precios y promociones",
      "Integración con pagos online"
    ]
  },
  {
    titulo: "Características Adicionales",
    caracteristicas: [
      "Soporte técnico especializado",
      "Actualizaciones continuas",
      "Copias de seguridad automáticas",
      "Acceso desde cualquier dispositivo"
    ]
  }
];
