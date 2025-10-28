import Button from "@/app/ui/Button";
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

import { useBusiness } from "@/app/context/BusinessContext";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "./store";

export const UpdateCategory = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { category, setCategory } = useProductStore();
  const { categories } = useBusiness();
  const [newCategory, setNewCategory] = useState(String(category));

  const handleCancel = () => {
    setOpen(false);
    setTimeout(() => {
      setNewCategory(category || "0");
    }, 300);
  };

  const handleSave = async () => {
    setOpen(false);
    setCategory(newCategory);
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
        <Button variant="text" onClick={() => setNewCategory(String(category))}>Cambiar</Button>
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
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="w-full font-[400] text-black">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value={"0"}>Sin categoría</SelectItem>
                  <Separator />
                  {categories.map((key) => (
                    <SelectItem key={key.id} value={key.id.toString()}>
                      <div className="flex items-center gap-2 ">{key.name}</div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </div>
        <DialogFooter>
          <Button variant="alternative" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
