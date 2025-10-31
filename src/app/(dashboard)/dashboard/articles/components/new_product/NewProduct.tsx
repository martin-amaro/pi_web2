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

import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { validateText } from "@/app/utils/auth";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useBackend } from "@/app/hooks/useBackend";
import Title from "../../../components/Title";
import { useRouter } from "next/navigation";
import { useProductStore } from "../../../../../stores/product";
import { SectionName } from "./SectionName";
import { SectionType } from "./SectionType";
import { SectionDescription } from "./SectionDescription";
import { SectionImages } from "./SectionImages";
import { SectionPrice } from "./SectionPrice";
import { SectionActive } from "./SectionActive";
import { SectionCategory } from "./SectionCategory";
import Separator from "../../../components/Separator";
import { SectionThumb } from "./SectionThumb";
import { isAdmin } from "@/app/utils/roles";

export default function NewProduct({ onCreated }: { onCreated?: () => void }) {
  const { data: session, status, update } = useSession();
  const { request } = useBackend();
  const token = session?.user?.accessToken;
  const router = useRouter();

  const {
    open,
    setOpen,
    name,
    active,
    setName,
    description,
    setDescription,
    type,
    setType,
    price,
    setPrice,
    images,
    thumb,
    setThumb,
    category,
    setCategory,
    loading,
    setLoading,
    loadingAI,
    setLoadingAI,
    error,
    setError,
    removedImages,
    reset,
  } = useProductStore();

  useEffect(() => {
    setError({
      name: validateText(name, "El nombre"),
      description: validateText(description, "El campo descripción"),
    });
  }, [name, description]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => reset(), 300);
  };

  const handleSave = async () => {
    const categoryId = category !== "0" ? parseInt(category) : null;

    try {
      setLoading(true);

      const formData = new FormData();

      const productData = {
        name,
        description,
        type,
        price,
        categoryId,
        stock: 3,
        thumbIndex: thumb,
        removedImages,
        active,
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(productData)], { type: "application/json" })
      );

      // images.forEach((file) => formData.append("images", file));

      useProductStore
        .getState()
        .newImages.forEach((file) => formData.append("newImages", file));

      const method = useProductStore.getState().productId ? "PUT" : "POST";
      const endpoint = useProductStore.getState().productId
        ? `/api/products/${useProductStore.getState().productId}`
        : "/api/products";

      const data = await request(endpoint, {
        method,
        data: formData,
        token,
      });

      setOpen(false);
      toast.success(
        useProductStore.getState().productId
          ? "Artículo actualizado correctamente"
          : "Artículo creado correctamente",
        {}
      );
      handleClose();
      router.refresh();
    } catch (err: any) {
      switch (err.status) {
        case 409:
          toast.error("Hay conflictos al guardar la imagen.");
          break;
        case 401:
          toast.error(
            "No tienes permisos suficientes para realizar esta acción."
          );
          break;

        case 413:
          toast.error("Las imágenes exceden el tamaño máximo permitido.");
          break;

        default:
          toast.error(
            useProductStore.getState().productId
              ? "No se pudo actualizar el artículo"
              : "No se pudo agregar el nuevo artículo"
          );
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) handleClose();
        setOpen(state);
      }}
    >
      <DialogTrigger asChild>
        {isAdmin(session?.user) && (
          <Button className="inline-flex items-center gap-2" variant="primary">
            <Plus className="size-5" />
            Agregar
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-full! max-h-full! w-full h-full border-2 mx-0!">
        <DialogHeader className="mx-auto w-full max-w-[1000px]! justify-end">
          <DialogTitle>
            {" "}
            {useProductStore.getState().productId
              ? "Editar artículo"
              : "Crear artículo"}
          </DialogTitle>
          <DialogDescription>
            {useProductStore.getState().productId
              ? "Modifica los campos para actualizar el artículo."
              : "Rellena los siguientes campos para crear un nuevo artículo."}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto px-2 py-2 mb-2">
          <div className="mx-auto w-full max-w-[1000px]!">
            <Details />
            <Categorization />
            <Options />
          </div>
        </div>

        <DialogFooter className="items-end">
          <Button variant="alternative" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="min-w-24"
            disabled={error.name !== "" || error.description !== ""}
            loading={loading}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Details = () => (
  <>
    <Title msg="Detalles" />
    <div className="flex gap-6">
      <div className="grid gap-6 w-[70%]">
        <SectionName />
        <SectionType />
      </div>
      <SectionThumb />
    </div>
    <div className="mt-6 grid gap-3">
      <SectionDescription />
      <SectionImages />
    </div>
    <Separator />
  </>
);

const Categorization = () => (
  <>
    <Title msg="Categorización" />
    <p>
      Asigna categorías a este artículo para facilitar su búsqueda y
      organización.
    </p>
    <SectionCategory />
    <Separator />
  </>
);

const Options = () => (
  <div>
    <Title msg="Opciones" />
    <p>
      Configura opciones adicionales para este artículo, como etiquetas o
      atributos personalizados.
    </p>
    <SectionPrice />
    <SectionActive />
  </div>
);
