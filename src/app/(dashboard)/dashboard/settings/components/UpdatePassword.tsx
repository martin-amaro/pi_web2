'use client';
import Button from '@/app/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { InputError } from '../../components/InputError';
import { validatePassword } from '@/app/utils/auth';
import { toast } from 'sonner';
import { useBackend } from '@/app/hooks/useBackend';

export default function UpdatePassword() {
    const { data: session, status, update } = useSession();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<Record<string, string>>({
        password: "x",
        newPassword: "",
    });
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const token = (session?.user as any)?.accessToken;
    const { request } = useBackend();

    const handleSave = async () => {
      // showMessage("Correo actualizado con éxito", "success");

    try {
      const updatedUser = await request("/auth/me", {
        method: "PATCH",
        token,
        data: {
          password: newPassword,
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

      setOpen(false);
      toast.success("Correo actualizado con éxito", {
        
      });
    } catch (err: any) {
      toast.error("No se pudo actualizar el correo");

    } finally {
    }
  };

    const handleCancelOrClose = () => {
        setOpen(false);
        setPassword('');
        setNewPassword('');
    };

    useEffect(() => {
        // add password match validation
        setError((prev) => ({
            ...prev,
            password: validatePassword(password),
            newPassword: validatePassword(newPassword) || (password === newPassword ? "La nueva contraseña debe ser diferente a la actual." : ""),
        }));

    }, [password, newPassword]);

    return (
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
            <div className="space-y-1">
                <label className="font-medium text-base text-slate-800 mb-1 block">
                    Contraseña
                </label>
                {/* <div className="flex items-center gap-2">
                    <p className="text-neutral-500 text-sm">{email}</p>
                </div> */}
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
                        
                        <Button variant="text">Actualizar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Cambiar contraseña</DialogTitle>
                            <DialogDescription>
                                Ingrese su contraseña actual y la nueva contraseña que desea establecer.
                                La nueva contraseña debe tener al menos 6 caracteres.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="pass-3">
                                    Contraseña actual
                                </Label>
                                <Input
                                    id="pass-3"
                                    name="ios"
                                    type="password"
                                    // defaultValue={newEmail}
                                        value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                {error.password && <InputError message={error.password} />}
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="pass-2">
                                    Contraseña nueva
                                </Label>
                                <Input
                                    id="pass-2"
                                    name="name"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />

                                {error.newPassword && <InputError message={error.newPassword} />}
                            </div>

                        </div>
                        <DialogFooter>
                            <Button variant="alternative" onClick={handleCancelOrClose}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} disabled={!!error.password || !!error.newPassword}>
                                Guardar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
