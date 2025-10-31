"use client";
import clsx from "clsx";
import { ScanSearch } from "lucide-react";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import "yet-another-react-lightbox/styles.css";

interface StoreGalleryProps {
  images: string[];
  initialIndex?: number;
}

const StoreGallery: React.FC<StoreGalleryProps> = ({
  images,
  initialIndex = 0,
}) => {
  const [current, setCurrent] = useState(initialIndex);
  const [isOpen, setIsOpen] = useState(false);

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full h-full max-w-[780px]">
        {/* Miniaturas */}
        <div className="flex md:flex-col gap-2 order-2 md:order-1 p-1">
          {images.map((src, index) => (
            <div
              key={index}
              onMouseEnter={() => setCurrent(index)}
              className={`relative cursor-pointer overflow-hidden rounded-lg ring-2 border border-neutral-300 transition-all ${
                index === current ? "ring-blue-500 " : "ring-transparent"
              }`}
            >
              <img
                src={src}
                alt={`thumb-${index}`}
                className="w-20 h-20 object-cover hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Imagen principal */}
        <div
          className={clsx(
            "flex-1 relative order-1 md:order-2 bg-[#f7f7f7] rounded-lg overflow-hidden aspect-video ",
            images[current] && "cursor-zoom-in"
          )}
          onClick={() => images[current] && setIsOpen(true)}
        >
          {images[current] ? (
            <img
              src={images[current]}
              alt={`main-${current}`}
              className="w-full h-full object-contain bg-[#f7f7f7]"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center gap-2">
                <ScanSearch className="size-12 text-neutral-800" />
                <p>No hay imágenes que mostrar</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={current}
        className="pointer-events-auto"
        animation={{ fade: 300 }}
        plugins={[Counter, Slideshow]}
        on={{
          click: () => setIsOpen(false),
        }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />
    </>
  );
};

export default StoreGallery;
