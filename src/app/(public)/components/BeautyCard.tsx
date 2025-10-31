import React from "react";
import { Check } from "lucide-react";
import Button from "@/app/ui/Button";
import clsx from "clsx";

type Props = {
  session?: any;
};

export const BeautyCard: React.FC<Props> = ({ session }) => {
  return (
    <div className={clsx("bg-white rounded-2xl shadow-md p-6 flex flex-col")}>
      <h3 className="text-2xl font-bold font-display">Belleza</h3>
      <p className="mt-2 text-gray-600 font-app">
        Reservas, gestión de personal y recordatorios automáticos para salones y spas.
      </p>

      <ul className="mt-4 space-y-3 flex-1">
        <li className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 shrink-0" />
          <span className="text-gray-700">Agenda y reservas por servicio</span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 shrink-0" />
          <span className="text-gray-700">Gestión de personal y comisiones</span>
        </li>
        <li className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 shrink-0" />
          <span className="text-gray-700">Recordatorios y fidelización</span>
        </li>
      </ul>

      <div className="mt-6">
        <Button variant="primary">{session ? "Panel de Belleza" : "Ver planes para Belleza"}</Button>
      </div>
    </div>
  );
};
