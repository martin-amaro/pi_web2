import { ROLE_INFO } from "@/app/constants/roles";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { DeleteUser } from "./DeleteUser";

export const UserRow = ({ user, isChecked, onToggle }) => (
  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          id={`checkbox-${user.id}`}
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor={`checkbox-${user.id}`} className="sr-only">
          Seleccionar
        </label>
      </div>
    </td>
    <th
      scope="row"
      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
    >
      <img
        className="w-10 h-10 rounded-full"
        src={
          user.avatar ||
          "https://i.pinimg.com/474x/2b/da/51/2bda51ca60cc3b5daaa8e062eb880430.jpg"
        }
        alt={`${user.name} image`}
      />
      <div className="ps-3">
        <div className="text-base font-semibold">{user.name}</div>
        <div className="font-normal text-gray-500">{user.email}</div>
      </div>
    </th>
    <td className="px-6 py-4">{ROLE_INFO[user.role]?.[0] || "???"}</td>
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
        {user.status || "Activo"}
      </div>
    </td>
    <td className=" ">
      <div className="flex justify-end items-center">
        <Button
          variant={"ghost"}
          className="font-medium text-blue-600 hover:underline cursor-pointer"
          title="Visualizar"
        >
          <Eye />
        </Button>
        <Button
          variant={"ghost"}
          className="font-medium text-blue-600 hover:underline cursor-pointer"
          title="Editar"
        >
          <Pencil />
        </Button>
        <DeleteUser id={user.id}/>

      </div>
    </td>
  </tr>
);
