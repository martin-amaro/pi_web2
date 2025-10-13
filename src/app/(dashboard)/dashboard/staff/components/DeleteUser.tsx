"use client";
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
import Button from "@/app/ui/Button";
import { Button as Btn } from "@/components/ui/button";
import { useBusiness } from "@/app/context/BusinessContext";
import { Pencil, Trash2 } from "lucide-react";
import { useBackend } from "@/app/hooks/useBackend";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { revalidate } from "../actions";

export const DeleteUser = ({ id } : { id: number}) => {
  const [open, setOpen] = React.useState(false);

  return <MainDialog open={open} setOpen={setOpen} id={id}/>;
};

const MainDialog = ({
  open,
  setOpen,
  onSave,
  id,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSave?: (v?: any) => Promise<void>;
  id: number
}) => {
    const { getBusinessProp } = useBusiness();
    const { data: session } = useSession();
  const { request } = useBackend();
  const [name, setName] = useState((getBusinessProp("name") as string) || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      setName((getBusinessProp("name") as string) || "");
    }, 300);
  };

  const handleSave = async () => {
    try {
        setLoading(true)
        const data = await request(`/business/staff/${id}`, { method: 'DELETE', token: session?.user?.accessToken});
        toast.success("Usuario eliminado correctamente.");
        setOpen(false);
        console.log(data)
        await revalidate();

    }
    catch (err: any){
        toast.error(err.response?.data?.error || err.message);
        console.log(err)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
        <Btn
          variant={"ghost"}
          className="font-medium text-blue-600 hover:underline cursor-pointer"
          title="Eliminar"
        >
          <Trash2 />
        </Btn>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar empleado</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este empleado? Esta acción es
            irreversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="danger" className="w-26 flex justify-center" onClick={handleSave} loading={loading}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
