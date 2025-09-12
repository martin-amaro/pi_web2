"use client";
import { auth } from "@/auth";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { UserAvatar } from "./UserAvatar";
import { DashHeader } from "./components/DashHeader";
import { DashTitle } from "./components/DashTitle";
import DashContainer from "./components/DashContainer";
import { BookmarkCheck, Package, ReceiptText, Siren } from "lucide-react";
import { Card } from "@/app/components/Card";

export default function page() {
  // const { data: session, status } = useSession()

  // const session = await auth()
  // if (status === "loading") {
  //   return <div>Cargando...</div>
  // }

  // if (status === "unauthenticated") {
  //   return <div>No estás autenticado</div>
  // }

  return (
    <div className="md:p-8 w-full">
      <div className="p-5 md:p-3">
        <h1 className="text-2xl font-semibold mb-4">Bienvenido/a otra vez.</h1>
        <p className="text-sm text-gray-500 mb-6">
          Configuraste un <strong>0%</strong>.
        </p>
      </div>

      <section className="w-full bg-[#f7f7f7] p-5 md:p-6 middle:rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <TopCard
            title="Productos registrados"
            icon={<Package className="size-6 text-blue-text" />}
          />

          <TopCard
            title="Avisos"
            icon={<Siren className="size-6 text-blue-text" />}
          />

          <TopCard
            title="Tareas pendientes"
            icon={<BookmarkCheck className="size-6 text-blue-text" />}
          />

          <TopCard
            title="Movimientos este mes"
            icon={<ReceiptText className="size-6 text-blue-text" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 col-span-4">
          <Card className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              Resumen del inventario
            </h3>
            <ul className="space-y-3 text-tiny font-medium text-neutral-700">
              <li className="flex justify-between pb-2 border-b border-neutral-200">
                <span>Producto más vendido</span>
                <strong>---</strong>
              </li>
              <li className="flex justify-between pb-2 border-b border-neutral-200">
                <span>Producto con más stock</span>
                <strong>---</strong>
              </li>
              <li className="flex justify-between pb-2 ">
                <span>Categoría más activa</span>
                <strong>---</strong>
              </li>
            </ul>
          </Card>

          <Card className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Actividad reciente</h3>
            {/* <ul className="space-y-3 text-sm text-gray-700">
                            <li className='flex items-center gap-2'>
                                <PackagePlus className='size-5 text-accent' />

                                Se agregaron 15 unidades al producto "Cables HDMI"</li>
                            <li className='flex items-center gap-2'>
                                <ReceiptText className='size-5 text-accent' />
                                Se generó factura #1023 por $560.00
                            </li>
                            <li className='flex items-center gap-2'>
                                <BanknoteArrowDown className='size-5 text-accent' />
                                Se recibió un pago de Cliente XYZ</li>
                            <li className='flex items-center gap-2'>
                                <Ban className='size-5 text-accent' />
                                Producto "Baterías AA" marcó sin stock</li>
                        </ul> */}
            <div className=" flex flex-col justify-center items-center ">
              <p className="text-neutral-500 my-4">No hay nada que mostrar.</p>
            </div>
            {/* <div className='text-center mt-4'>
                            <Link className='btn-text text-sm!'>Mostrar más</Link >
                        </div> */}
          </Card>
        </div>

        {/* <div className="col-span-3 bg-white rounded-xl shadow p-5"> 
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Rendimiento</h2>
                        <span className="text-sm text-gray-500">Fecha: 29 de mayo</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div><strong>Ventas netas:</strong> $0.00</div>
                        <div><strong>Venta neta promedio:</strong> $0.00</div>
                        <div><strong>Ventas brutas:</strong> $0.00</div>
                        <div><strong>Devoluciones:</strong> $0.00</div>
                        <div><strong>Transacciones:</strong> 0</div>
                    </div>
                </div> */}

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-md font-semibold mb-3">Clientes</h2>
            <ul className="text-sm space-y-1">
              <li>Total de clientes: 0</li>
              <li>Clientes frecuentes: 0</li>
              <li>Promedio de visitas: 0</li>
              <li>Consumo promedio por visita: $0.00</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-md font-semibold mb-3">Formas de pago</h2>
            <div className="h-3 w-full bg-gray-100 rounded mb-2">
              <div className="bg-blue-500 h-3 rounded w-[0%]"></div>
            </div>
            <p className="text-sm">Tarjeta: $0.00 (0%)</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-md font-semibold mb-3">Artículos</h2>
            <p className="text-sm text-gray-500">
              Verás un desglose de tus ventas de artículos aquí una vez que
              comiences a vender artículos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}



const TopCard = ({ icon, title, value = 0 }: {icon: React.ReactNode, title: string, value?: number}) => (
  <Card className="w-full col-span-1 flex items-center gap-4 cursor-pointer hover:bg-white/50 transition-colors duration-100">
    <div className="p-3 bg-[#e9edf6] rounded-lg">{icon}</div>
    <div>
      <p className="text-2xl font-semibold text-neutral-800 mt-1">{value}</p>
      <h2 className="text-gray-600 text-sm font-semibold">{title}</h2>
    </div>
  </Card>
);
