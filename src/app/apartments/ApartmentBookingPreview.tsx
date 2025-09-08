"use client";

import { FC, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  "/Apartment2.jpeg",
  "/Apartment8.jpeg",
  "/Apartment4.jpeg",
  "/Apartment5.jpeg",
];

const perks = [
  {
    icon: "mdi:silverware-fork-knife",
    title: "Chef-crafted menus",
    desc: "Seasonal plates, curated wine list, and signature cocktails.",
  },
  {
    icon: "mdi:bed-king-outline",
    title: "Premium apartments",
    desc: "Modern interiors, city views, and 24/7 concierge support.",
  },
  {
    icon: "mdi:music",
    title: "Live entertainment",
    desc: "Weekend sessions with DJs and acoustic nights.",
  },
  {
    icon: "mdi:map-marker-radius-outline",
    title: "Central location",
    desc: "Easy access and secure parking for all guests.",
  },
];

const BookingPreview: FC<{ summary: string }> = ({ summary }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // change every 4s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <div className="relative aspect-[4/3] w-full">
        {/* Background images slideshow */}
        <AnimatePresence>
          <motion.div
            key={slides[current]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current]}
              alt="Apartment preview"
              fill
              className="object-cover rounded-t-2xl"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-200">
          <Icon icon="mdi:sparkles" className="h-4 w-4 text-yellow-400" />
          Live Preview
        </div>

        {/* Summary Card */}
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-yellow-400">
                Apartment
              </p>
              <p className="mt-1 text-sm text-gray-100">{summary}</p>
            </div>
            <Icon
              icon="mdi:bookmark-check-outline"
              className="h-6 w-6 text-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 gap-4 bg-white/5 p-5 sm:grid-cols-2">
        {perks.map((f, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <div className="flex items-start gap-3">
              <Icon icon={f.icon} className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-sm font-semibold text-gray-100">{f.title}</p>
                <p className="mt-1 text-xs text-gray-300">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPreview;
