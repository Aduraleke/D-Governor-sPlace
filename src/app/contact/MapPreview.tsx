import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, Variants } from "framer-motion";

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function MapPreview() {
    const address =
      "No3. Okereke Close, Off Trans-Woji Road, Peace Valley Estate, Port Harcourt, Rivers State, Nigeria";
    const mapQuery = encodeURIComponent(address);

  
  return (
    <motion.div
      variants={item}
      className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="aspect-[16/9] w-full bg-white/5">
        <iframe
          title="D'Governor's Place Map"
          src="https://www.google.com/maps?q=123+Rooftop+Avenue,+Port+Harcourt,+Nigeria&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/30 via-transparent to-black/20" />
      <div className="absolute bottom-4 right-4">
        <Link
          href={`https://www.google.com/maps?q=${mapQuery}`}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-4 py-2 text-sm hover:bg-black/60 transition"
        >
          <Icon
            icon="mdi:navigation-variant-outline"
            className="w-4 h-4 text-yellow-400"
          />
          Open in Maps
        </Link>
      </div>
    </motion.div>
  );
}
