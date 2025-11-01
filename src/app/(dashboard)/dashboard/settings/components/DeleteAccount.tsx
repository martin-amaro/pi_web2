import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";
import Button from "@/app/ui/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { useBackend } from "@/app/hooks/useBackend";

export default function DeleteAccount() {
  const { data: session } = useSession();
  const { logout } = useAuth();
  const { request } = useBackend();
  const [open, setOpen] = React.useState(false);
  const token = (session?.user as any)?.accessToken;

  const router = useRouter();

  const handleSave = async () => {
    try {
      const res = await request("/auth/me", {
        method: "DELETE",
        token,
      });

      toast.success("Cuenta eliminada con éxito");
      setTimeout(async () => {
        await signOut();
        router.push("/login");
      }, 1500);

    } catch (e: any) {
      toast.error(e.message || "No se pudo eliminar la cuenta");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <label className="font-medium text-base text-slate-800 mb-1 block">
          Mi cuenta
        </label>
        <div className="flex items-center gap-2">
          {/* <p className="text-neutral-500 text-sm">{email}</p> */}
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
        <Dialog
          open={open}
          onOpenChange={(state) => {
            if (!state) handleCancel();
            setOpen(state);
          }}
        >
          <DialogTrigger asChild>
            <Button variant="danger">Eliminar cuenta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar cuenta</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es
                irreversible.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="alternative" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleSave}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
