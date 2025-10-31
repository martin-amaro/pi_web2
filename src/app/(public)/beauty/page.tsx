import React from "react";
import { Calendar, Users, Sparkles, TrendingUp } from "lucide-react";
import { auth } from "@/auth";
import Button from "@/app/ui/Button";
import Link from "next/link";

const BeautyPage = async () => {
  const session = await auth();

  return (
    <div className="py-20 bg-gradient-to-b from-white to-[#f7fbff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold font-display sm:text-4xl lg:text-5xl text-title">
            Soluciones para Belleza
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-app">
            Gestión integral para salones de belleza, spas y centros estéticos
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <Calendar className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Agenda Online</h3>
            <p className="text-gray-600">
              Sistema de citas online 24/7 con recordatorios automáticos
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <Users className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gestión de Personal</h3>
            <p className="text-gray-600">
              Control de horarios, comisiones y agenda por profesional
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <Sparkles className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Servicios y Productos</h3>
            <p className="text-gray-600">
              Catálogo de servicios, inventario y ventas de productos
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fidelización</h3>
            <p className="text-gray-600">
              Programa de puntos, promociones y marketing directo
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">
            Haz crecer tu negocio de belleza
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya gestionan sus negocios de belleza con nuestra plataforma.
          </p>
          <Link href="/register" legacyBehavior>
            <Button variant="primary" className="mx-auto">
              {session ? "Ir al Panel" : "Crear mi negocio"}
            </Button>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold font-display text-center mb-8">
            Beneficios destacados
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
    icon: <Calendar className="w-6 h-6 text-primary" />,
    title: "Reservas 24/7",
    description: "Tus clientes pueden reservar en cualquier momento"
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Control total",
    description: "Gestión completa de personal, servicios y clientes"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Crecimiento",
    description: "Herramientas para hacer crecer tu negocio"
  }
];

export default function Page() {
  return <BeautyPage />;
}
