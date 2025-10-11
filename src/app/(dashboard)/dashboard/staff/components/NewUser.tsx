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

import { Button as Btn } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { InputError } from "../../components/InputError";
import {
  validateEmail,
  validatePassword,
  validateText,
} from "@/app/utils/auth";
import { toast } from "sonner";
import { ROLE_INFO, ROLES } from "@/app/constants/roles";
import { Copy, Info, Plus, RotateCw } from "lucide-react";
import { generatePassword } from "@/app/utils/misc";
import { ButtonGroup } from "@/components/ui/button-group";
import { useBackend } from "@/app/hooks/useBackend";
import { createUserAction } from "../actions";

export default function NewUser({ onCreated }: { onCreated?: () => void }) {
  const { data: session, status, update } = useSession();
  const { request } = useBackend();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("USER");
  const [hash, setHash] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const token = (session?.user as any)?.accessToken;

  const handleSave = async () => {
    // showMessage("Correo actualizado con éxito", "success");

    try {
      const res = await createUserAction({
        name,
        email,
        password: hash,
        role
      });

      setOpen(false);
      toast.success("Correo actualizado con éxito", {});
      handleClose();
    } catch (err: any) {
      switch (err.status) {
        case 409:
          toast.error("El correo electrónico ya existe.");
          break;
        case 401:
          toast.error(
            "No tienes permisos suficientes para realizar esta acción."
          );
          break;
        default:
          toast.error("No se pudo agregar el nuevo usuario");
      }
    } finally {
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setRole("USER");
  };

  useEffect(() => {
    // add password match validation
    setError((prev) => ({
      ...prev,
      name: validateText(name, "El nombre"),
      email: validateEmail(email),
    }));
  }, [name, email]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) handleClose();
        setOpen(state);
      }}
    >
      <DialogTrigger onClick={() => setHash(generatePassword(6))} asChild>
        <Button type="primary" className="flex h-10 items-center rounded-lg">
          <span className="hidden md:block">Nuevo empleado</span>{" "}
          <Plus className="md:ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo empleado</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="pass-3">Nombre</Label>
            <Input
              id="name"
              name="name"
              type="text"
              // defaultValue={newEmail}
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {error.name && <InputError message={error.name} />}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="name"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error.email && <InputError message={error.email} />}
          </div>

          <div className="grid gap-3">
            <Label>Rol</Label>
            <Select value={role} onValueChange={setRole} defaultValue="USER">
              <SelectTrigger className="w-full font-[400] text-black">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {Object.entries(ROLE_INFO).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2 ">{value[0]}</div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="px-1 flex items-center gap-2 text-sm text-neutral-700">
              <Info className="size-4" />
              <p className="">{ROLE_INFO[role][1]}</p>
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Contraseña autogenerada</Label>
            <ButtonGroup className="w-full">
              <Input
                id="pass"
                name="pass"
                type="text"
                readOnly
                value={hash}
                //   onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Btn variant={"outline"}>
                <Copy />
              </Btn>
              <Btn
                variant={"outline"}
                onClick={() => setHash(generatePassword(6))}
              >
                <RotateCw />
              </Btn>
            </ButtonGroup>

            <p className="px-1 text-sm text-neutral-600 leading-snug">
              Esta debe ser cambiada una vez iniciada la sesión.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={error.name !== "" || error.email !== ""}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
