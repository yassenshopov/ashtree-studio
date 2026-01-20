"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const images = [
  {
    src: "/hero_img_4.png",
    alt: "GitHub contribution chart print layout",
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/hero_img_3.png",
    alt: "GitHub contribution chart print texture",
  },
  {
    src: "/hero_img_2.png",
    alt: "GitHub contribution chart print detail",
  },
  {
    src: "/hero_img_1.png",
    alt: "GitHub contribution chart print close-up",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    src: "/hero_img_6.png",
    alt: "GitHub contribution chart print angle",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    src: "/hero_img_5.png",
    alt: "GitHub contribution chart print frame detail",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

export default function BentoGallery() {
  const [activeImage, setActiveImage] = useState<(typeof images)[number] | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            className={`relative overflow-hidden rounded-lg border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${image.className ?? ""}`}
            onClick={() => setActiveImage(image)}
            aria-label="Open image in full screen"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </button>
        ))}
      </div>

      <Dialog open={!!activeImage} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent className="max-w-none w-[95vw] h-[90vh] border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Image preview</DialogTitle>
          {activeImage && (
            <div className="relative h-full w-full">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
