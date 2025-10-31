import React from 'react'
import { useProductStore } from '../../../../../stores/product';
import { Label } from '@/components/ui/label';
import Button from '@/app/ui/Button';
import { ScanSearch } from 'lucide-react';

export const SectionThumb = () => {
  const { images, thumb, setThumb } = useProductStore();

  const handleClick = () => {
    setThumb((thumb + 1) % images.length);
  }
  
    return (
      <div className="w-[30%] grid gap-3">
        <Label htmlFor="pass-3">Presentación</Label>
        <div className="border border-[#d1d5dc] rounded-sm w-full h-40 overflow-hidden">
          <div className="w-full h-[75%] ">
            {images.length > 0 ? (
              <img
                src={
                  typeof images[thumb] === "string"
                    ? images[thumb]
                    : URL.createObjectURL(images[thumb])
                }
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="size-full bg-[#f7f7f7] flex justify-center items-center">
                <ScanSearch className="size-8 text-neutral-800" />
              </div>
            )}
          </div>
          <div className="w-full h-[25%] flex justify-center items-center border-t ">
            <Button
              variant="secondary"
              className="py-1! rounded-sm!"
              onClick={handleClick}
              disabled={images.length <= 1}
            >
              Cambiar
            </Button>
          </div>
        </div>
      </div>
    );
}
