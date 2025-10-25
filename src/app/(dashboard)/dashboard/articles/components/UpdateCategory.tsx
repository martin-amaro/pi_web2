import Button from "@/app/ui/Button";
import { Folder } from "lucide-react";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryProps {
  active: boolean;
  description?: string;
  id: number;
  name: string;
}

import { useBusiness } from "@/app/context/BusinessContext";
import { useBackend } from "@/app/hooks/useBackend";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

//{ val, set }: { val: string; set: (v: string) => void }
export const UpdateCategory = ({
  open,
  setOpen,
  val,
  set,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  val: string;
  set: (v: string) => void;
}) => {
  const { getBusinessProp, categories } = useBusiness();
  const [industry, setIndustry] = useState(
    (getBusinessProp("industry") as string) || "8"
  );
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState(val);
  const { request } = useBackend();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      setCategory(val || "0");
    }, 300);
  };

  const handleSave = async (name: string) => {
    setOpen(false);
    set(category);
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
        <Button variant="text">Cambiar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar categoría</DialogTitle>
          <DialogDescription>
            Selecciona una nueva categoría para este artículo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full font-[400] text-black">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value={"0"}>Sin asignar</SelectItem>
                  <Separator></Separator>
                  {categories.map((key) => (
                    <SelectItem key={key.id} value={key.id.toString()}>
                      <div className="flex items-center gap-2 ">{key.name}</div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* {error && <InputError message={error} />} */}
          </div>
        </div>
        <DialogFooter>
          <Button variant="alternative" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            onClick={() => handleSave(industry)}
            // disabled={!industry || industry === getBusinessProp("industry")}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
