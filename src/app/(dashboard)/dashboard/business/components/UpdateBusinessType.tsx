"use client";
import { useBusiness } from "@/app/context/BusinessContext";
import { useBackend } from "@/app/hooks/useBackend";
import Button from "@/app/ui/Button";
import { isAdmin } from "@/app/utils/roles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BedDouble,
  BriefcaseBusiness,
  ChefHat,
  Dumbbell,
  Forklift,
  HardHat,
  Martini,
  Shirt,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

const BusinessType = {
  1: ["Restaurante", <ChefHat size={20} />],
  2: ["Construcción", <HardHat size={20} />],
  3: ["Logística", <Forklift size={20} />],
  4: ["Hotelería", <BedDouble size={20} />],
  5: ["Bar / Licorería", <Martini size={20} />],
  6: ["Gimnasio", <Dumbbell size={20} />],
  7: ["Retail", <Shirt size={20} />],
  8: ["Otro", ""],
};

type BusinessTypes = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export const UpdateBusinessType = () => {
  const { getBusinessProp, refreshBusiness } = useBusiness();
  const { data: session, status, update } = useSession();
  const { request, } = useBackend();
  const [open, setOpen] = useState(false);

  const [businessType, setBusinessType] = useState<BusinessTypes>(
    (getBusinessProp("industry") as BusinessTypes) || "8"
  );
  // const [address, setAddress] = useState(user.business?.address || "");

  const handleSave = async (industry: string) => {
    try {
      await request("/business/me", {
        method: "PATCH",
        token: session?.user?.accessToken,
        data: {
          industry: industry,
        },
      });
      refreshBusiness();
      toast.success("Tipo de negocio actualizado correctamente");
    } catch (err) {
      toast.error("Error al actualizar el nombre del negocio");
    } finally {
    }
  };

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <label className="font-medium text-base text-slate-800 mb-1 block">
          Tipo de negocio
        </label>
        <div className="flex items-center gap-2">
          {BusinessType[businessType] ? (
            BusinessType[businessType][1]
          ) : (
            <BriefcaseBusiness size={24} />
          )}
          <span className="text-slate-500 font-medium text-sm py-2">
            {BusinessType[businessType]?.[0] ?? "Desconocido"}
          </span>
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
        {isAdmin(session?.user) && (
          <MainDialog open={open} setOpen={setOpen} onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

const MainDialog = ({
  open,
  setOpen,
  onSave,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSave: (v?: any) => Promise<void>;
}) => {
  const { getBusinessProp } = useBusiness();
  const [industry, setIndustry] = useState(
    (getBusinessProp("industry") as string) || "8"
  );
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      setIndustry((getBusinessProp("industry") as string) || "");
    }, 300);
  };

  const handleSave = async (name: string) => {
    setOpen(false);
    await onSave(name);
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
        <Button type="text">Cambiar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tipo de negocio</DialogTitle>
          <DialogDescription>
            El tipo de negocio puede activar o desactivar algunas
            características. Escoge el que más se adapte a tu negocio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="w-full font-[400] text-black">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {Object.entries(BusinessType).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2 ">
                        {value[1]} {value[0]}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* {error && <InputError message={error} />} */}
          </div>
        </div>
        <DialogFooter>
          <Button type="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            onClick={() => handleSave(industry)}
            disabled={!industry || industry === getBusinessProp("industry")}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
