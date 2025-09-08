"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { herofeatures } from "@/data/AboutData";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Heroimage.jpg"
          alt="D'Governor's Place Rooftop View"
          fill
          quality={75}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 backdrop-blur-sm" />
      </div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start max-w-xl"
        >
          {/* Tagline */}
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="uppercase tracking-[3px] text-yellow-400 text-[10px] sm:text-xs md:text-sm font-semibold mt-30 md:mt-0"
          >
            Luxury • Music • Lifestyle • Port Harcourt
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-lg mt-3 sm:mt-4 text-center md:text-left"
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 animate-gradient-shimmer">
              D&apos;Governor&apos;s Place
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 font-medium text-gray-200 text-base leading-relaxed md:text-left max-w-md text-justify"
          >
            Discover the ultimate spot for premium{" "}
            <span className="text-yellow-400 font-semibold">
              live entertainment,
            </span>{" "}
            <span className="text-yellow-400 font-semibold">
              exciting online karaoke,
            </span>{" "}
            <span className="text-yellow-400 font-semibold">
              mouth-watering small chops & cocktails,
            </span>{" "}
            and{" "}
            <span className="text-yellow-400 font-semibold">
              premium short-let apartments
            </span>{" "}
            all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/reservations"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black font-semibold shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all flex items-center gap-2"
            >
              <Icon icon="mdi:calendar-star" className="w-5 h-5" />
              Reserve Now
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3 rounded-full bg-white/10 border border-yellow-400/40 text-yellow-300 font-semibold backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all flex items-center gap-2"
            >
              <Icon icon="mdi:silverware-fork-knife" className="w-5 h-5" />
              Explore Menu
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[420px] mx-auto md:mx-0 flex flex-col justify-between"
        >
          <motion.div
            whileHover={reduceMotion ? {} : { scale: 1.01 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="rounded-3xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/10 to-transparent"
          >
            <div className="rounded-3xl bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xl">
              <div className="p-6 md:p-8 flex flex-col h-full">
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    What We <span className="text-yellow-400">Offer</span>
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    A quick glance at our highlights
                  </p>
                </div>

                {/* Mobile: scrollable cards */}
                <div className="md:hidden pb-4">
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-1">
                    {herofeatures.map((f, i) => (
                      <div
                        key={i}
                        className="snap-center min-w-[80%] sm:min-w-[220px] shrink-0 flex items-start gap-3 rounded-xl p-4 bg-white/10 border border-white/20 shadow-md backdrop-blur-lg"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/25">
                          <Icon
                            icon={f.icon}
                            className="h-5 w-5 text-yellow-400"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[12px] font-semibold text-white truncate">
                            {f.title}
                          </h3>
                          <p className="text-[10px] text-gray-300 mt-1 line-clamp-2">
                            {f.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: vertical list */}
                <motion.ul
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="hidden md:flex flex-col gap-4 max-h-[45vh] overflow-y-auto pr-1"
                >
                  {herofeatures.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                      className="group flex items-start gap-4 rounded-xl border border-white/20 bg-white/10 p-5 shadow-md backdrop-blur-lg transition-all hover:border-yellow-400/40 hover:bg-yellow-400/10"
                    >
                      <div className="shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/25 group-hover:bg-yellow-400 transition-colors">
                          <Icon
                            icon={feature.icon}
                            className="h-6 w-6 text-yellow-400 group-hover:text-black"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-white truncate">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                          {feature.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 flex justify-center md:justify-start mb-6"
          >
            <Link
              href="/studio"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black font-semibold shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all flex items-center gap-2"
            >
              <Icon icon="mdi:camera-outline" className="w-5 h-5" />
              Visit Our Photo Studio
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient shimmer */}
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
          animation: gradient-shimmer 5s ease infinite;
        }
      `}</style>
    </section>
  );
}
