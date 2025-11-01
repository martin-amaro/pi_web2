"use client";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { s } from "framer-motion/client";
import { InputError } from "../../components/InputError";
import { isValidEmail } from "@/app/utils/auth";
import { toast } from "sonner";
import { useBackend } from "@/app/hooks/useBackend";

export default function UpdateEmail() {
  const { data: session, status, update } = useSession();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [newEmail, setNewEmail] = useState(email);
  const token = (session?.user as any)?.accessToken;
  const { request } = useBackend();

  const handleSave = async () => {
    // showMessage("Correo actualizado con éxito", "success");

    try {
      const updatedUser = await request("/auth/me", {
        method: "PATCH",
        token,
        data: {
          email: newEmail,
        },
      });

      // Actualizar la sesión correctamente
      const updatedSession = await update({
        user: {
          ...session?.user,
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          provider: updatedUser.provider,
          accessToken: updatedUser.token || token,
        },
        expires: session?.expires || "",
      });

      // Actualizar estados locales
      setEmail(updatedUser.email);
      setNewEmail("");

      setOpen(false);
      toast.success("Correo actualizado con éxito", {});
    } catch (err: any) {
      toast.error(err.message || "No se pudo actualizar el correo");
    } finally {
    }
  };

  const handleCancelOrClose = () => {
    setOpen(false);
    setNewEmail(email);
  };

  useEffect(() => {
    const value = newEmail;

    if (value.length === 0) {
      setError("El correo es obligatorio");
      return;
    }

    if (value === email) {
      setError("El correo no puede ser igual al actual");
      return;
    }

    if (value && !isValidEmail(value)) {
      setError("Correo inválido");
      return;
    }

    setError("");
  }, [error, email, newEmail]);

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <label className="font-medium text-base text-slate-800 mb-1 block">
          Correo electrónico
        </label>
        <div className="flex items-center gap-2">
          {(session?.user as any).provider === "google" && (
            <img src="/images/google.svg" className="size-4" alt="" />
          )}
          <p className="text-neutral-500 text-sm">{email}</p>
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
        <Dialog
          open={open}
          onOpenChange={(state) => {
            if (!state) handleCancelOrClose();
            setOpen(state);
          }}
        >
          <DialogTrigger asChild>
            {(session?.user as any).provider === null && (
              <Button variant="text">Actualizar</Button>
            )}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cambiar dirección de correo electrónico</DialogTitle>
              <DialogDescription>
                Ingresa una nueva dirección de correo electrónico que desees
                asociar con tu cuenta de Square para iniciar sesión, generar
                recibos y recibir mensajes sobre tu cuenta o de marketing. Ya no
                podrás iniciar sesión con{" "}
                <span className="font-bold">{email}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name-1">
                  Nueva dirección de correo electrónico
                </Label>
                <Input
                  id="name-1"
                  name="name"
                  type="email"
                  // defaultValue={newEmail}
                  autoComplete="new-email"
                  spellCheck={false}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />

                {error && <InputError message={error} />}
              </div>
            </div>
            <DialogFooter>
              <Button variant="alternative" onClick={handleCancelOrClose}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={error.length !== 0}>
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
