import { Card } from "@/app/components/Card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const TopCardSkeleton = () => {
  return (
    // <Skeleton className="rounded-xl shadow p-5 h-[125px] w-[250px]" />
    <Card className="w-full col-span-1 flex items-center gap-4 bg-white hover:bg-white/50 transition-colors duration-100">
      <Skeleton className="p-3 rounded-lg size-[48px] opacity-50" />
      <div>
        <Skeleton className=" h-3 w-[200px]" />
        <Skeleton className="mt-2 h-3 w-[150px]" />
      </div>
    </Card>
  );
};
