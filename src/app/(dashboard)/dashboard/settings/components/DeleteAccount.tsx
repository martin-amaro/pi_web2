import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { signOut, useSession } from 'next-auth/react';
import Button from '@/app/ui/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';

export default function DeleteAccount() {
    const { data: session, status, update } = useSession();
    const { logout } = useAuth();
    const [open, setOpen] = React.useState(false);
    const token = (session?.user as any)?.accessToken;

    const router = useRouter();

    const handleSave = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "No se pudo eliminar la cuenta");
        return;
      }

      toast.success("Cuenta eliminada con éxito");

      setTimeout(async () => {
        await signOut();
        router.push('/login');
      }, 1500);
      
      //next router

    }

     const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
            <div className="space-y-1">
                <label className="font-medium text-base text-slate-800 mb-1 block">
                    Mi cuenta
                </label>
                <div className="flex items-center gap-2">
                    
                    {/* <p className="text-neutral-500 text-sm">{email}</p> */}
                </div>
            </div>
            <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
                <Dialog
                    open={open}
                    onOpenChange={(state) => {
                        if (!state) handleCancel();
                        setOpen(state);
                    }}
                >
                    <DialogTrigger asChild>
                        <Button variant="danger">Eliminar cuenta</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Eliminar cuenta</DialogTitle>
                            <DialogDescription>
                                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.

                            </DialogDescription>
                        </DialogHeader>
                        
                        <DialogFooter>
                            <Button variant="alternative" onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleSave} >
                                Eliminar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
