import { Ellipsis, Image } from "lucide-react";
import React from "react";

export const TableProducts = () => {
  return (
    <div className="rounded-lg md:pt-0 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 table-fixed mt-6 font-normal!">
        <thead className="text-[.8rem] text-gray-700 font-normal! border-b border-[#b3b3b3] bg-gray-50">
          <tr className="">
            <th className="w-[30%] px-6 py-3">
              <div className="flex items-center gap-3">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                />
                <span>Nombre</span>
              </div>
            </th>
            <th className="w-[20%] px-6 py-3">Categoría</th>
            <th className="w-[20%] px-6 py-3">Disponibilidad</th>
            <th className="w-[15%] px-6 py-3">Precio</th>
            <th className="w-[10%] px-6 py-3">Stock</th>
            <th className="w-[5%] px-6 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          <Item />
          <Item />
          <Item />
        </tbody>
      </table>
    </div>
  );
};

const Item = () => {
  return (
    <tr className="border-b border-[#f2f2f2] hover:bg-[#e6f0ff] h-14 text-[#1a1a1a] cursor-pointer">
      <td className="px-6">
        <div className="flex items-center gap-3">
          <input
            id="checkbox-row"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
          />
          <div className="flex justify-center items-center size-9 rounded-sm bg-[#f2f2f2] text-[#d9d9d9]">
            <Image className="size-5" />
          </div>
          <span>Nombre</span>
        </div>
      </td>
      <td className="px-6">-</td>
      <td className="px-6 text-green-700 font-medium">Disponible</td>
      <td className="px-6">$ 20.000</td>
      <td className="px-6">5</td>
      <td className="px-6 text-right">
        <Ellipsis className="text-gray-400 hover:text-gray-600 transition-colors" />
      </td>
    </tr>
  );
};
