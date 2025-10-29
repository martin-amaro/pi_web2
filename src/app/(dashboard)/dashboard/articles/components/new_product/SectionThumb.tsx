import React from 'react'
import { useProductStore } from '../../../../../stores/product';
import { Label } from '@/components/ui/label';
import Button from '@/app/ui/Button';

export const SectionThumb = () => {
  const { images, thumb, setThumb } = useProductStore();
  
    return (
      <div className="w-[30%] grid gap-3">
        <Label htmlFor="pass-3">Presentación</Label>
        <div className="border border-[#d1d5dc] rounded-sm w-full h-32 overflow-hidden">
          <div className="w-full h-[80%] ">
            {images.length > 0 && (
              <img
                
                src={
                  typeof images[thumb] === "string" ? images[thumb] : URL.createObjectURL(images[thumb])
                }
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="w-full h-[20%]">
            <Button variant="text">Cambiar</Button>
          </div>
        </div>
      </div>
    );
}
