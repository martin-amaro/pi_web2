import React, { useEffect, useState } from "react";
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
import { validateText } from "@/app/utils/auth";
import { Checkbox } from "@/app/components/Checkbox";
import { InputError } from "../../../components/InputError";
import { useProductStore } from "../../../../../stores/product";

export const NewCategory = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { data: session } = useSession();
  const { category, setCategory } = useProductStore();
  const token = session?.user?.accessToken;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [select, setSelect] = useState(true);
  const { request } = useBackend();
  const { getCategories } = useBusiness();

  useEffect(() => {
    setError(validateText(name, "El nombre"));
  }, [name]);

  const handleCancel = () => {
    setName("");
    setSelect(true);
    setOpen(false);
  };

  const handleSave = async () => {
    setOpen(false);
    try {
      const response = await request("/categories", {
        method: "POST",
        data: {
          name,
        },
        token,
      });
      await getCategories();
      toast.success(`Categoría "${name}" creada.`);
      if (select) setCategory(String(response.id));

    } catch (e) {
      toast.error("No se pudo crear la categoría.");
    } finally {
      handleCancel();
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
            <Label>Nombre de la categoría</Label>
            <Input
              maxLength={50}
              autoComplete="off"
              spellCheck={false}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {error && <InputError message={error} />}
          </div>
          <Checkbox
            label="Seleccionar automáticamente"
            checked={select}
            onCheckedChange={(e) => setSelect(e === true)}
          />
        </div>
        <DialogFooter>
          <Button variant="alternative" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={error !== ""}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
