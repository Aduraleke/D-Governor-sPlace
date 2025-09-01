"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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

const BookingPreview: FC<{ summary: string }> = ({ summary }) => (
  <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
    <div className="relative aspect-[4/3] w-full bg-gradient-to-tr from-yellow-500/20 via-white/5 to-yellow-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_10%_10%,rgba(250,204,21,0.12),transparent)]" />
      <motion.div
        aria-hidden
        initial={{ x: "-30%" }}
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-200">
        <Icon icon="mdi:sparkles" className="h-4 w-4 text-yellow-400" />
        Live Preview
      </div>

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

export default BookingPreview;
