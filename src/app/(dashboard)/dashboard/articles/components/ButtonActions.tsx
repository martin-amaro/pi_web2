import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/app/ui/Button";
import { Ellipsis } from "lucide-react";
import { Article } from "@/app/libs/definitions";
import { useProductStore } from "@/app/stores/product";
import { useSession } from "next-auth/react";
import { isAdmin } from "@/app/utils/roles";
export const ButtonActions = ({article}: {article: Article}) => {
  const [open, setOpen] = useState(false);
  const {setProduct} = useProductStore();
   const { data: session } = useSession();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="text-blue-500 hover:text-blue-700 transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom" align="end">
        <DropdownMenuItem>Ver artículo</DropdownMenuItem>
        {isAdmin(session?.user) ? (
          <>
            <DropdownMenuItem
              onClick={() => useProductStore.getState().setProduct(article)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>Marcar como no disponible</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => {}} variant="destructive">
              Eliminar
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
