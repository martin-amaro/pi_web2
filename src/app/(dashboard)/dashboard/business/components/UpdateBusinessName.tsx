'use client'
import React, { useState } from 'react'
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


export const UpdateBusinessName = () => {
    const { data: session, status, update } = useSession();
    const [open, setOpen] = useState(false);

    const handleSave = async () => {

        try {
            
        } catch (err) {

        } finally {
        }
    };

    const handleCancelOrClose = () => {
        setOpen(false);
        // setNewEmail(email);
    };

    return (
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
            <div className="space-y-1">
                <label className="font-medium text-base text-slate-800 mb-1 block">
                    Nombre del negocio
                </label>
                <div className="flex items-center gap-2">
                    <p className="text-neutral-500 text-sm">{"email"}</p>
                </div>
            </div>
            <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
                <Dialog
                    open={open}
                    onOpenChange={(state) => {
                        // if (!state) handleCancelOrClose();
                        setOpen(state);
                    }}
                >
                    <DialogTrigger asChild>
                        {/* {(session?.user as any).provider === null && (
                            <Button type="text">Actualizar</Button>
                        )} */}
                        <Button type="text">Actualizar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar nombre del negocio</DialogTitle>
                            <DialogDescription>
                                Ingresa un nuevo nombre para tu negocio.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                {/* <Label htmlFor="name-1">
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

                                {error && <InputError message={error} />} */}
                            </div>

                        </div>
                        <DialogFooter>
                            <Button type="secondary" onClick={handleCancelOrClose}>
                                Cancelar
                            </Button>
                            {/* <Button onClick={handleSave} disabled={error.length !== 0}>
                                Guardar
                            </Button> */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
