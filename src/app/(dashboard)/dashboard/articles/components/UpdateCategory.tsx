import Button from "@/app/ui/Button";
import { Folder } from "lucide-react";
import React from "react";

export const UpdateCategory = () => {
  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <div className="flex gap-2 ">
          <Folder />
          <label className="font-medium text-base text-slate-800 mb-1 block">
            Categoría
          </label>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-neutral-500 text-sm">Sin asignar</p>
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
        <Button variant="text">Cambiar</Button >
      </div>
    </div>
  );
};
