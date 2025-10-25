"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useBusiness } from "@/app/context/BusinessContext";
import { isAdmin } from "@/app/utils/roles";
import { useBackend } from "@/app/hooks/useBackend";
import { toast } from "sonner";
import { InputError } from "../../components/InputError";

const validateName = (name: string) => name.length >= 3 && name.length <= 50;

export const UpdateBusinessName = () => {
  const { data: session} = useSession();
  const { request } = useBackend();
  const [open, setOpen] = useState(false);
  const { getBusinessProp, refreshBusiness } = useBusiness();

  const handleSave = async (name: string) => {
    try {
      await request("/business/me", {
        method: "PATCH",
        token: session?.user?.accessToken,
        data: {
          name,
        },
      });
      refreshBusiness();
      toast.success("Nombre del negocio actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el nombre del negocio");
    } finally {
    }
  };

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <label className="font-medium text-base text-slate-800 mb-1 block">
          Nombre del negocio
        </label>
        <div className="flex items-center gap-2">
          <p className="text-neutral-500 text-sm">{getBusinessProp("name")}</p>
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
        {isAdmin(session?.user) && (
          <MainDialog open={open} setOpen={setOpen} onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

const MainDialog = ({
  open,
  setOpen,
  onSave,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSave: (v?: any) => Promise<void>;
}) => {
  const { getBusinessProp } = useBusiness();
  const [name, setName] = useState((getBusinessProp("name") as string) || "");
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      setName((getBusinessProp("name") as string) || "");
    }, 300);
  };

  const handleSave = async (name: string) => {
    setOpen(false);
    await onSave(name);
  };

  useEffect(() => {
    if (!validateName(name)) {
        setError("El nombre debe tener entre 3 y 50 caracteres.");
    } else if (name === getBusinessProp("name") as string) {
        setError("El nombre no puede ser igual al actual.");
    }
    else {
        setError(null);
    }
  }, [name]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) handleCancel();
        else setOpen(true);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="text">Cambiar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar nombre del negocio</DialogTitle>
          <DialogDescription>
            Cambia el nombre de tu negocio. (3-50 caracteres)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Nuevo nombre</Label>
            <Input
              id="name-1"
              name="name"
              type="email"
              maxLength={50}
              autoComplete="new-email"
              spellCheck={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {error && <InputError message={error} />}
          </div>
        </div>
        <DialogFooter>
          <Button variant="alternative" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={() => handleSave(name)} disabled={!!error}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
