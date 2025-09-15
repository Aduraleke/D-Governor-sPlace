"use client";

import { FC, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const studioSlides = [
  "/photostudio/studio.jpg",
  "/photostudio/studio1.jpg",
  "/photostudio/studio2.jpg",
  "/photostudio/studio4.jpg",
];

const studioPerks = [
  {
    icon: "mdi:lightbulb-on-outline",
    title: "Professional Lighting",
    desc: "Softboxes, LED panels, and ring lights included.",
  },
  {
    icon: "mdi:microphone-variant",
    title: "Audio Equipment",
    desc: "High-quality microphones and soundproof setup.",
  },
  {
    icon: "mdi:camera-outline",
    title: "Studio Gear",
    desc: "Camera stands, tripods, and backdrops available.",
  },
  {
    icon: "mdi:account-group",
    title: "Creative Space",
    desc: "Perfect for teams, artists, and content creators.",
  },
];

const StudioPreview: FC<{ summary: string }> = ({ summary }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % studioSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <div className="relative aspect-[4/3] w-full">
        {/* Background images slideshow */}
        <AnimatePresence>
          <motion.div
            key={studioSlides[current]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={studioSlides[current]}
              alt="Studio preview"
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
          <Icon icon="mdi:sparkles" className="h-4 w-4 text-[#f3ce00]" />
          Live Preview
        </div>

        {/* Summary Card */}
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f3ce00]">
                Studio Session
              </p>
              <p className="mt-1 text-sm text-gray-100">{summary}</p>
            </div>
            <Icon
              icon="mdi:bookmark-check-outline"
              className="h-6 w-6 text-[#f3ce00]"
            />
          </div>
        </div>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 gap-4 bg-white/5 p-5 sm:grid-cols-2">
        {studioPerks.map((f, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <div className="flex items-start gap-3">
              <Icon icon={f.icon} className="h-6 w-6 text-[#f3ce00]" />
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

export default StudioPreview;
