"use client";

import React from "react";
import { motion,  } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import MapPreview from "./MapPreview";



export default function ContactSection() {




  return (
    <section
      id="contact"
      className="relative w-full bg-gradient-to-b from-black via-black/95 to-black text-white overflow-hidden"
    >
      {/* Decorative glowing blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 lg:py-28">
       <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.9 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-start"
        >
          <ContactInfo />
          <div className="space-y-6">
            <ContactForm />
            <MapPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
