"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

type ImageObject = { src: string; width?: number; height?: number };
type ImageInput = string | ImageObject;

interface PhotoStudioProps {
  images: ImageInput[];
  initialIndex?: number | null;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const normalizeSrc = (img: ImageInput) =>
  typeof img === "string" ? img : img.src;
const normalizeWidth = (img: ImageInput) =>
  typeof img === "string" ? 500 : img.width ?? 500;
const normalizeHeight = (img: ImageInput) =>
  typeof img === "string" ? 350 : img.height ?? 350;

const PhotoStudio: React.FC<PhotoStudioProps> = ({
  images,
  initialIndex = null,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    initialIndex ?? null
  );
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);

  // Body scroll lock + focus management + keyboard nav
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((p) =>
          p !== null ? (p - 1 + images.length) % images.length : 0
        );
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((p) => (p !== null ? (p + 1) % images.length : 0));
      }
    }

    if (selectedIndex !== null) {
      // lock scroll
      prevActiveRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);

      // focus close button for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);

      // restore focus
      if (
        prevActiveRef.current &&
        typeof prevActiveRef.current.focus === "function"
      ) {
        prevActiveRef.current.focus();
      }
    };
  }, [selectedIndex, images.length]);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : 0
    );
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + images.length) % images.length
        : images.length - 1
    );
  };

  // Handle keyboard for gallery thumbnails
  const handleThumbnailKey = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedIndex(index);
    }
  };

  return (
    <section className="relative w-full bg-black py-12 px-3 overflow-hidden sm:px-5 md:px-12">
      {/* Ambient gradient highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-[#f3ce00]/10 blur-3xl top-[-100px] left-[-100px]" />
        <div className="absolute w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full bg-yellow-500/5 blur-3xl bottom-[-80px] right-[-120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto mt-6">
        {/* Title Section */}
        <motion.div
          className="text-center px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="uppercase tracking-[4px] sm:tracking-[6px] text-[#f3ce00] text-xs sm:text-sm font-semibold">
            Our Creative Space
          </span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-[#f3ce00] to-yellow-600 animate-gradient-shimmer">
            Capturing Timeless Elegance
          </h2>
          <p className="mt-4 text-gray-300 text-xs sm:text-sm md:text-lg max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Step into our world of artistry a curated gallery showcasing
            cinematic portraits, breathtaking moments, and luxurious details.
          </p>
        </motion.div>

        {/* Responsive Masonry Gallery */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-10 columns-1 sm:columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
        >
          {images.map((img, index) => {
            const src = normalizeSrc(img);
            return (
              <motion.div
                key={src + "-" + index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-lg mb-3"
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(e) => handleThumbnailKey(e, index)}
                role="button"
                tabIndex={0}
                aria-label={`Open Photo Studio ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`Photo Studio ${index + 1}`}
                  width={normalizeWidth(img)}
                  height={normalizeHeight(img)}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index < 3}
                />

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3 sm:p-4">
                  <h3 className="text-white font-semibold text-sm sm:text-lg">
                    Luxury Capture
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28 }}
              className="relative w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Smart Image Sizing */}
              <div className="relative w-full h-[80vh] max-h-[80vh] flex justify-center items-center">
                <Image
                  src={normalizeSrc(images[selectedIndex])}
                  alt={`Expanded view ${selectedIndex + 1}`}
                  fill
                  className="object-contain rounded-lg sm:rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              {/* Close Button */}
              <button
                ref={closeBtnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(null);
                }}
                aria-label="Close image viewer"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 hover:bg-black/80 transition-colors p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-lg"
              >
                <Icon
                  icon="mdi:close"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#f3ce00]"
                />
              </button>

              {/* Previous Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-lg"
              >
                <Icon
                  icon="mdi:chevron-left"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#f3ce00]"
                />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 sm:p-3 rounded-full shadow-lg backdrop-blur-lg"
              >
                <Icon
                  icon="mdi:chevron-right"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#f3ce00]"
                />
              </button>

              {/* Caption */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg text-white text-xs sm:text-sm backdrop-blur-lg">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient shimmer effect */}
      <style jsx>{`
        @keyframes gradient-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-shimmer {
          background-size: 200% 200%;
          animation: gradient-shimmer 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default PhotoStudio;
