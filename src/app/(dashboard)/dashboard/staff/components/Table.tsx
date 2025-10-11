import React from "react";
import { UserRow } from "./UserRow";
import { backendRequest } from "@/app/hooks/useBackendServer";
import { auth } from "@/auth";
import { SearchX, UsersRound } from "lucide-react";

interface UserQuery {
    id: number;
    name: string;
    email: string;
    role: string;
}

export const Table = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const session = await auth();
  let staff: {
    totalItems?: number;
    totalPages?: number;
    currentPage?: number;
    users?: UserQuery[];
  } = {};
  try {
    staff = await backendRequest(`/business/users/search?query=${query}&page=${currentPage}`, {
      method: "GET",
      token: session?.user?.accessToken,
    });
    
    staff.users = staff?.users?.filter(
      (u: any) => (u.id as number).toString() !== session?.user?.id
    );
  } catch (err) {
    console.error("Error al cargar usuarios:", err);
    staff = {};
  }

  if (staff?.users?.length === 0 && query.length !== 0) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center text-neutral-600 h-48 gap-4">
        <SearchX className="size-10" />

        <h2 className="text-2xl font-medium font-app">
          No se han encontrado resultados
        </h2>
        <p>Intenta probar con otros términos.</p>
      </div>
    );
  }
  if (staff?.users?.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center text-neutral-600 h-48 gap-4">
        <UsersRound className="size-10" />
        <h2 className="text-2xl font-medium font-app">
          Aún no tienes personal
        </h2>
        <p>Agrega miembros para comenzar a construir tu equipo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <table className="w-full text-sm text-left text-gray-500 table-fixed mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="w-[50px] p-4">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
              />
            </th>
            <th className="w-8/16 px-6 py-3">Nombre</th>
            <th className="w-3/16 px-6 py-3">Función</th>
            <th className="w-3/16 px-6 py-3">Status</th>
            <th className="w-2/16 px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {staff?.users?.map((user: any, index: number) => (
            <UserRow key={index} user={user} onToggle={false} isChecked={false} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
