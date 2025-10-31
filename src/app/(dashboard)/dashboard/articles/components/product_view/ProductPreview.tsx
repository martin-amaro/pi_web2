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
import Button from "@/app/ui/Button";
import StoreGallery from "./StoreGallery";
import { useProductStore } from "@/app/stores/product";
import { formatCurrency } from "@/app/utils/misc";
import { getCategoryName } from "@/app/utils/business";
import { useBusiness } from "@/app/context/BusinessContext";
import { SquarePen } from "lucide-react";
import { isAdmin } from "@/app/utils/roles";
import { useSession } from "next-auth/react";

export const ProductPreview = () => {
  const { data: session } = useSession();
  const {
    preview,
    setPreview,
    setOpen,
    name,
    price,
    description,
    images,
    category,
    reset,
  } = useProductStore();

  const handleClose = () => {
    setPreview(false);
    setTimeout(() => reset(), 300);
  };

  const handleEdit = () => {
    setPreview(false);
    setOpen(true);
  };

  const { categories } = useBusiness();
  return (
    <Dialog
      open={preview}
      onOpenChange={(state) => {
        if (!state) handleClose();
        else setPreview(true);
      }}
    >
      <DialogContent className="max-w-[1200px]!  md:max-h-[600px]! w-full h-full mx-0! px-0">
        <DialogHeader className="px-8">
          <DialogTitle>Detalles del producto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className=" w-full flex flex-col md:flex-row gap-4 relative h-full overflow-auto px-8">
          <div className="flex-3/6">
            <StoreGallery
              images={images.filter((e) => typeof e === "string")}
              initialIndex={0}
            />
          </div>
          <div className="flex-1/6 border rounded-lg p-4">
            <h2 className="font-medium text-2xl mb-1">{name}</h2>
            <h3 className="text-4xl  font-a3 font-100 text-gray-900">
              {formatCurrency(price)}
            </h3>
            <p className="mt-2 font-sm text-neutral-800 leading-5 md:overflow-auto md:max-h-1/2">
              {description}
            </p>
            <div className="inline-flex px-2 py-1 my-2 text-blue-600 bg-accent rounded-md text-sm">
              {getCategoryName(categories, category)}
            </div>
            <div className="mt-3">
              <p className="font-medium text-sm">Stock disponible:</p>
              <p className="font-thin text-sm">5 unidad</p>
            </div>
          </div>
        </div>

        <DialogFooter className="md:items-end px-8">
          {!isAdmin(session?.user) && (
            <Button
              variant="alternative"
              className="flex gap-2"
              onClick={handleEdit}
            >
              <SquarePen className="size-5" />
              Editar
            </Button>
          )}
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
