import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

export const UserRowSkeleton = () => {
  return (
    <tr className="bg-white border-b border-gray-200 ">
      <td className="w-4 p-4">
        <Skeleton className="w-4 h-4 rounded" />
      </td>

      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
      >
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
        <div className="ps-3 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </th>

      <td className="px-6 py-4">
        <Skeleton className="h-4 w-20" />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </td>

      <td className="px-6 py-4">
        <Skeleton className="h-4 w-16" />
      </td>
    </tr>
  );
}
