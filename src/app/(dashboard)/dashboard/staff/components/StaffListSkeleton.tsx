import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { UserRowSkeleton } from "./UserRowSkeleton";

export const StaffListSkeleton = () => {
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
          <UserRowSkeleton />
          <UserRowSkeleton />
          <UserRowSkeleton />
        </tbody>
      </table>
    </div>
  );
};
