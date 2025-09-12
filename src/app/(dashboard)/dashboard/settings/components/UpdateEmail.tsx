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
import React, { useState } from "react";

export default function UpdateEmail() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(session?.user?.email || "");
  const [newEmail, setNewEmail] = useState(email);

  const handleSave = () => {
    console.log("Nuevo email:", newEmail);

    setEmail(newEmail);

    setOpen(false);
  };

  const handleCancelOrClose = () => {
    setOpen(false);
    setNewEmail(email);
  };

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <label className="font-medium text-base text-slate-800 mb-1 block">
          Correo electrónico
        </label>
        <div className="flex items-center gap-2">
          {session?.user?.provider === "google" && (
            <img src="/images/google.svg" className="size-4" alt="" />
          )}
          <p className="text-neutral-500 text-sm">
            { email }
          </p>
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
            {session?.user?.provider === null && (
              <Button type="text">Actualizar</Button>
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
                  defaultValue={newEmail}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">
                  Confirmar dirección de correo electrónico
                </Label>
                <Input
                  id="username-1"
                  name="username"
                  type="email"
                  defaultValue=""
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="secondary" onClick={handleCancelOrClose}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
