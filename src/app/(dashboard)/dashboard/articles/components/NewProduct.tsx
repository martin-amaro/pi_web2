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
import React, { MouseEvent, useEffect, useState } from "react";
import { InputError } from "../../components/InputError";
import {
  validateEmail,
  validatePassword,
  validateText,
} from "@/app/utils/auth";
import { toast } from "sonner";
import { ROLE_INFO, ROLES } from "@/app/constants/roles";
import {
  Check,
  Copy,
  ImageUp,
  Info,
  Plus,
  RotateCw,
  Sparkle,
  Sparkles,
} from "lucide-react";
import { generatePassword } from "@/app/utils/misc";
import { ButtonGroup } from "@/components/ui/button-group";
import { useBackend } from "@/app/hooks/useBackend";
import clsx from "clsx";
import Title from "../../components/Title";
import { articleTypes } from "@/app/constants/articles";
import { Textarea } from "@/components/ui/textarea";
import { UpdateCategory } from "./UpdateCategory";

export default function NewProduct({ onCreated }: { onCreated?: () => void }) {
  const { data: session, status, update } = useSession();
  const { request } = useBackend();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const token = (session?.user as any)?.accessToken;

  // Data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<File[]>([]);

  const handleSave = async () => {
    // showMessage("Correo actualizado con éxito", "success");

    try {
      setLoading(true);

      const formData = new FormData();
      
      const productData = {
        name,
        description,
        type,
        price,
        categoryId: null,
        stock: 3
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(productData)], { type: "application/json" })
      );

      images.forEach((file) => formData.append("images", file));

      const data = await request("/api/products", {
        method: "POST",
        data: formData,
        token,
      });


      //   const res = await createUserAction({
      //     name,
      //     email,
      //     password: hash,
      //     role,
      //   });
      setOpen(false);
      toast.success("Artículo creado correctamente.", {});
      handleClose();
    } catch (err: any) {
      switch (err.status) {
        case 409:
          toast.error("El correo electrónico ya existe.");
          break;
        case 401:
          toast.error(
            "No tienes permisos suficientes para realizar esta acción.", 
          );
          break;
        default:
          toast.error("No se pudo agregar el nuevo usuario");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setImages([]);
    setType("");
    setPrice(0);
    setDescription("");
  };

  useEffect(() => {
    // add password match validation
    setError((prev) => ({
      ...prev,
      name: validateText(name, "El nombre"),
      description: validateText(description, "La descripción"),
      // email: validateEmail(email),
    }));
  }, [name]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) handleClose();
        setOpen(state);
      }}
    >
      <DialogTrigger onClick={() => setHash(generatePassword(6))} asChild>
        <Button className="inline-flex items-center gap-2" variant="primary">
          <Plus className="size-5" />
          Agregar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-full! max-h-full! w-full h-full border-2 mx-0!">
        <DialogHeader className="mx-auto w-full max-w-[1000px]! justify-end">
          <DialogTitle>Crear artículo</DialogTitle>
          <DialogDescription>
            Rellena los siguientes campos para crear un nuevo artículo.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-2 h-full">
          <div className="mx-auto w-full max-w-[1000px]! h-full ">
            <Title msg="Detalles" />
            <div className="flex gap-6">
              <div className="grid gap-6 w-[70%]">
                <ItemName val={name} set={setName} />
                <ItemType val={type} set={setType} />
              </div>
              <ItemThumb />
            </div>
            <div className="mt-6 grid gap-3">
              <ItemDesc val={description} set={setDescription} />
              <ItemImages val={images} set={setImages}/>
            </div>

            <div className="w-full h-2 bg-[#f2f2f2] my-8"></div>
            <Title msg="Categorización" />
            <p>
              Asigna categorías a este artículo para facilitar su búsqueda y
              organización.
            </p>
            <div>
              <UpdateCategory />
            </div>

            <div>
              <Title msg="Opciones" />
              <p>
                Configura opciones adicionales para este artículo, como
                etiquetas o atributos personalizados.
              </p>
              <div className="mt-6">
                <ItemPrice val={price} set={setPrice} />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button variant="alternative" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="min-w-24"
            // disabled={error.name !== "" || error.email !== ""}
            loading={loading}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ItemName = ({ val, set }: { val: string; set: (v: string) => void }) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="pass-3">Nombre</Label>
      <Input
        id="name"
        name="name"
        type="text"
        // defaultValue={newEmail}
        autoComplete="off"
        value={val}
        onChange={(e) => set(e.target.value)}
        placeholder="Nombre del producto"
        required
      />
    </div>
  );
};

const ItemType = ({ val, set }: { val: string; set: (v: string) => void }) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="pass-3">Tipo de artículo</Label>
      <Select value={val} onValueChange={set}>
        <SelectTrigger className="w-full h-10! font-[400] text-black">
          <SelectValue placeholder="Selecciona un tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Fruits</SelectLabel> */}
            {Object.entries(articleTypes).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2 ">{value[0]}</div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const ItemThumb = () => {
  return (
    <div className="w-[30%] grid gap-3">
      <Label htmlFor="pass-3">Presentación</Label>
      <div className="border border-[#d1d5dc] rounded-sm w-full h-32">
        <div className="w-full h-[80%]"></div>
        <div className="w-full h-[20%]">
          <Button variant="text">Cambiar</Button>
        </div>
      </div>
    </div>
  );
};

const ItemDesc = ({ val, set }: { val: string, set: (v: string) => void }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [focusInside, setFocusInside] = useState(false);

  useEffect(() => {
    setError(validateText(val, "La descripción"));
  }, [val]);

  return (
    <div className="grid gap-3">
      <Label htmlFor="pass-3">Descripción</Label>
      <div
        className="relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => {
          if (!focusInside) setShow(false);
        }}
      >
        <Textarea
          className="w-full resize-none max-h-[200px]!"
          id="name"
          name="name"
          maxLength={255}
          onFocus={() => {
            setShow(true);
            setFocusInside(true);
          }}
          onBlur={() => {
            setFocusInside(false);
            setShow(false);
          }}
          autoComplete="off"
          value={val}
          onChange={(e) => set(e.target.value)}
          placeholder="Describe el producto aquí"
          required
        />
        {show && (
          <Button
            variant="alternative"
            className="absolute right-6 bottom-2 p-2! text-sm! flex gap-2 h-auto!"
            onMouseDown={(e) => {
              e.preventDefault(); // evita perder el foco antes de hacer clic
              alert("hola");
            }}
          >
            <Sparkle className="size-4" />
            Generar con IA
          </Button>
        )}
      </div>
      {error && <InputError message={error} />}
    </div>
  );
};

const ItemImages = ({ val, set }: { val: File[]; set: React.Dispatch<React.SetStateAction<File[]>> }) => {
  // const [images, setImages] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const MAX_IMAGES = 4;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (val.length + files.length > MAX_IMAGES) {
      toast.error(`Solo puedes subir hasta ${MAX_IMAGES} imágenes.`);
      return;
    }

    set((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    if (val.length + files.length > MAX_IMAGES) {
      toast.error(`Solo puedes subir hasta ${MAX_IMAGES} imágenes.`);
      //return;
    }

    set((prev) => [...prev, ...files].slice(0, MAX_IMAGES));
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    set((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 ounded-sm">
      {/* Zona Droppable */}
      <div
        className={clsx(
          "flex flex-col items-center justify-center text-sm gap-2 p-6 rounded-md cursor-pointer transition-all border-dashed border-2",
          dragOver
            ? "bg-blue-50 border-blue-400 border-2"
            : "bg-white border-gray-300 border"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <ImageUp className="size-5 text-gray-500" />
        <p className="text-gray-600 text-center">
          Arrastra y suelta imágenes aquí o
        </p>
        <label
          htmlFor="file-upload"
          className="text-blue-600 hover:underline cursor-pointer"
        >
          haz clic para seleccionarlas
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelect}
        />
      </div>

      {/* Previsualización */}
      {val.length > 0 && (
        //  grid grid-cols-8
        <div className="mt-4 flex flex-wrap gap-3">
          {val.map((file, index) => (
            <div
              key={index}
              className="relative border rounded-md overflow-hidden size-20"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-bl-sm cursor-pointer"
                onClick={() => handleRemove(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type ItemPriceProps = {
  val: number | null;
  set: (v: number) => void;
  locale?: string;
  currency?: string;
};

function ItemPrice({
  val,
  set,
  locale = "es-ES",
  currency = "COP",
}: ItemPriceProps) {
  // raw: lo que se muestra mientras el usuario escribe
  const [raw, setRaw] = useState<string>(
    val !== null && val !== undefined ? String(val) : ""
  );

  // Si `val` cambia desde fuera, sincronizamos la vista (sin formateo si el input está activo)
  useEffect(() => {
    if (
      document.activeElement &&
      (document.activeElement as HTMLElement).id === "price-input"
    ) {
      // no sobreescribir mientras el usuario está escribiendo
      return;
    }
    setRaw(val !== null && val !== undefined ? String(val) : "");
  }, [val]);

  const numberPattern = /^-?(?:\d+|\d*\.\d+|\d+\.)$/; // admite "123", ".5", "12.", "12.34"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Quitamos símbolos de moneda y espacios, permitimos dígitos, comas, puntos y signo menos
    input = input.replace(/\s/g, "").replace(/[^0-9,.\-]/g, "");

    // Normalizamos comas a puntos para parsear
    const normalized = input.replace(/,/g, ".");

    // Guardamos la visualización tal cual escribe el usuario
    setRaw(input);

    // Si el texto coincide con un número válido (incluye "12." y ".5") actualizamos el valor numérico
    if (numberPattern.test(normalized)) {
      const parsed = parseFloat(normalized);
      if (!Number.isNaN(parsed)) {
        set(parsed);
        return;
      }
    }

    // Si la entrada queda vacía o es solo "-" -> consideramos null (sin precio)
    if (input === "" || input === "-") {
      set(0);
      return;
    }

    // Si no es un número válido aún, no tocamos `set` (dejamos el último número válido intacto)
  };

  const handleFocus = () => {
    // Al enfocar mostramos la versión sin formato (número limpio)
    if (val !== null && val !== undefined) {
      // usa punto decimal para facilitar la edición (el usuario puede escribir con coma si quiere)
      setRaw(String(val));
    } else {
      setRaw("");
    }
  };

  const handleBlur = () => {
    // Al perder foco, si hay un número lo formateamos a moneda
    if (val !== null && val !== undefined && !Number.isNaN(val)) {
      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(val);
      setRaw(formatted);
    } else {
      // si no hay valor válido, limpiar o mantener vacío
      setRaw("");
    }
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="price-input">Precio</Label>
      <Input
        id="price-input"
        name="price"
        inputMode="decimal"
        autoComplete="off"
        value={raw}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Precio del producto"
        // type="text" para que no restrinja la entrada al formateo del browser
        type="text"
        required
      />
    </div>
  );
}