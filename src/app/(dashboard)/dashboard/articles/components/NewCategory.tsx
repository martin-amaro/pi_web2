import React, { useState } from "react";
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
import Button from "@/app/ui/Button";
import { Plus } from "lucide-react";
import { useBackend } from "@/app/hooks/useBackend";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useBusiness } from "@/app/context/BusinessContext";

export const NewCategory = ({
  open,
  setOpen,
  val,
  set,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  val: string;
  set: (v: string) => void;
}) => {
  const { data: session, status, update } = useSession();
  const token = session?.user?.accessToken;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const { request } = useBackend();
  const { getCategories } = useBusiness();

  const handleCancel = () => {
    setName("");
    setOpen(false);
  };

  const handleSave = async () => {
    setOpen(false);
    try {
      await request("/categories", {
        method: "POST",
        data: {
          name,
        },
        token,
      });
      await getCategories();
      toast.success(`Categoría "${name}" creada.`);
    } catch (e) {
      toast.error("No se pudo crear la categoría.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) handleCancel();
        else setOpen(true);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="text" className="flex gap-1.5 items-center">
          <Plus className="size-5"></Plus>
          Nueva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nueva categoría</DialogTitle>
          <DialogDescription>
            Ingresa el nombre de la nueva categoría para tus artículos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Nombre de la categoría</Label>
            <Input
              id="name-1"
              name="name"
              type="text"
              maxLength={50}
              autoComplete="off"
              spellCheck={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* {error && <InputError message={error} />} */}
          </div>
        </div>
        <DialogFooter>
          <Button variant="alternative" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            // disabled={!industry || industry === getBusinessProp("industry")}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
