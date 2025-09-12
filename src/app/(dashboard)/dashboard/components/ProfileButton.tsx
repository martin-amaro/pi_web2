import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, CircleUserRound, LogOut, User } from "lucide-react";
import { getRole } from "@/app/utils/roles";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function ProfileButton() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative border border-[#d5d5d5] rounded-md w-full px-4 py-3 flex justify-between items-center gap-3 text-neutral-900 font-medium transition-colors duration-200 cursor-pointer ",
            open ? "bg-blue-100 " : "hover:bg-blue-100"
          )}
        >
          <div className="flex gap-3 items-center">
            <CircleUserRound />
            <span className="truncate max-w-[150px] block text-left">
              {/* {user ? user.name : "Perfil"} */}
              {session?.user?.name ?? "Invitado"}
              <p className="text-tiny text-neutral-700 font-normal">
                {/* {ROLE_INFO[user.role]?.[0]} */}
                {getRole(session?.user?.role)}
              </p>
            </span>
          </div>
          <ChevronDown
            className={cn(
              "shrink-0 transition-transform duration-300",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <User className="size-4" />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()} variant="destructive">
          <LogOut className="size-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
