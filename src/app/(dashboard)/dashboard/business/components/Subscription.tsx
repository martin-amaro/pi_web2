import { PLANS } from "@/app/constants/plans";
import Button from "@/app/ui/Button";
import { getPlanName } from "@/app/utils/plans";
import { getRoleName } from "@/app/utils/roles";
import { useSession } from "next-auth/react";
import React from "react";

export const Subscription = () => {
  const { data: session } = useSession();

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <label className="font-medium text-base text-slate-800 mb-1 block">
          Susbscripción
        </label>
        <div className="flex items-center gap-2">
          <p className="text-neutral-500 text-sm">{getPlanName(session?.user?.plan?.name)}</p>
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
        <Button type="text" href="/pricing">Cambiar</Button>
      </div>
    </div>
  );
};
