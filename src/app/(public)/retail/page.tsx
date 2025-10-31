import React from "react";
import { ShoppingBag, BarChart3, Store, Boxes } from "lucide-react";
import { auth } from "@/auth";
import Button from "@/app/ui/Button";
import Link from "next/link";

const RetailPage = async () => {
  const session = await auth();

  return (
    <div className="py-20 bg-gradient-to-b from-white to-[#f7fbff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold font-display sm:text-4xl lg:text-5xl text-title">
            Soluciones para Retail
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-app">
            Gestiona tu tienda física y online desde un solo lugar
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <Store className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Punto de Venta</h3>
            <p className="text-gray-600">
              TPV intuitivo con control de inventario, ventas y reportes en tiempo real.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <Boxes className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Control de Inventario</h3>
            <p className="text-gray-600">
              Gestión de stock multicanalidad, alertas y predicciones de demanda.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <ShoppingBag className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">E-commerce Integrado</h3>
            <p className="text-gray-600">
              Sincronización automática con tu tienda online y marketplaces.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <BarChart3 className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics Avanzado</h3>
            <p className="text-gray-600">
              Reportes detallados de ventas, inventario y comportamiento del cliente.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">
            Comienza a vender más inteligentemente
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a cientos de comercios que ya están optimizando sus ventas con nuestra plataforma integral para retail.
          </p>
          <Link href="/register" legacyBehavior>
            <Button variant="primary" className="mx-auto">
              {session ? "Ir al Panel" : "Crear mi tienda"}
            </Button>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold font-display text-center mb-8">
            ¿Por qué elegir nuestra solución?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const benefits = [
  {
    icon: <Store className="w-6 h-6 text-primary" />,
    title: "Todo en uno",
    description: "Gestión completa de tu negocio desde una sola plataforma"
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-primary" />,
    title: "Omnicanalidad",
    description: "Integra tus ventas físicas y online sin complicaciones"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Datos en tiempo real",
    description: "Toma decisiones informadas con análisis en tiempo real"
  }
];

export default function Page() {
  return <RetailPage />;
}
