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
import { signOut, useSession } from "next-auth/react";
import Button from "@/app/ui/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { useProductStore } from "@/app/stores/product";
import { useBackend } from "@/app/hooks/useBackend";

export default function DeleteProduct() {
  const { data: session, status, update } = useSession();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const token = (session?.user as any)?.accessToken;
  const { delete: del, setDelete } = useProductStore();
  const { request } = useBackend();

  const manyItems = del.length > 1;
  const router = useRouter();

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await request("/api/products/delete", {
        method: "POST",
        token,
        data: {
          ids: del,
        },
      });
      toast.success("Eliminado correctamente.");
      handleCancel();

      router.refresh();
    } catch (e) {
      toast.error("No se pudo eliminar.");
    } finally {
      setLoading(false);
    }

    // if (!res.ok) {
    //   const errorData = await res.json().catch(() => ({}));
    //   toast.error(errorData.message || "No se pudo eliminar la cuenta");
    //   return;
    // }
    // toast.success("Cuenta eliminada con éxito");
    // setTimeout(async () => {
    //   await signOut();
    //   router.push("/login");
    // }, 1500);
    //next router
  };

  const handleCancel = () => {
    setDelete([]);
  };

  return (
    <Dialog
      open={del.length > 0}
      onOpenChange={(state) => {
        if (!state) handleCancel();
        setDelete([]);
      }}
    >
      {/* <DialogTrigger asChild>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {manyItems ? "Eliminar artículos" : "Eliminar artículo"}
          </DialogTitle>
          <DialogDescription>
            {manyItems
              ? "¿Estás seguro de que deseas eliminar los artículos?"
              : "¿Estás seguro de que deseas eliminar el artículo?"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="alternative" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleSave} disabled={loading}>
            {manyItems ? "Eliminar todos" : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
