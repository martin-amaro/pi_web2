import React, { useState } from 'react'
import { useProductStore } from './store';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { getPlanName } from '@/app/utils/plans';
import clsx from 'clsx';
import Button from '@/app/ui/Button';
import { ImageUp, Star, X } from 'lucide-react';

export const SectionImages = () => {
  const { images, setImages, thumb, setThumb, productId, removedImages} = useProductStore();
  const [dragOver, setDragOver] = useState(false);
  const { data: session } = useSession();
  const plan = session?.user?.plan?.name;
  const MAX_IMAGES = plan === "free" ? 1 : plan === "pro" ? 4 : 20;
  const isEditing = !!productId;


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(
        `Solo puedes subir hasta ${MAX_IMAGES} imágenes con el plan ${getPlanName(
          session?.user?.plan?.name
        )}.`
      );
      return;
    }

    setImages([...images, ...files].slice(0, MAX_IMAGES));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/")
    );

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(
        `Solo puedes subir hasta ${MAX_IMAGES} imágenes con el plan ${getPlanName(
          session?.user?.plan?.name
        )}.`
      );
      //return;
    }

    setImages([...images, ...files].slice(0, MAX_IMAGES));
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const removed = images[index];
    
    if (isEditing && typeof removed === "string") {
      // addRemovedImage(removed);
      console.log("Marcada para eliminar:", removed);
    }

    setImages(images.filter((_, i) => i !== index));
    if (index === thumb) setThumb(0);
  };

  const handleMark = (index: number) => {
    setThumb(index);
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
        {"DEL"}
        {JSON.stringify(removedImages)}
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
      {images.length > 0 && (
        //  grid grid-cols-8
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((file, index) => (
            <div
              key={index}
              className={clsx(
                "relative border rounded-md overflow-hidden size-22 md:size-28 group",
                index === thumb && "ring-2 ring-blue-500"
              )}
            >
              <img
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="object-cover w-full h-full"
              />

              <div className="absolute top-0 right-0 flex gap-1 p-1 opacity-40 transition-opacity duration-200 group-hover:opacity-100">
                {index !== thumb && (
                  <Button
                    variant="circle"
                    className="!"
                    title="Marcar como imagen principal"
                    onClick={() => handleMark(index)}
                  >
                    <Star className="size-4" />
                  </Button>
                )}

                <Button
                  variant="circle"
                  title="Eliminar imagen"
                  className=""
                  onClick={() => handleRemove(index)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
