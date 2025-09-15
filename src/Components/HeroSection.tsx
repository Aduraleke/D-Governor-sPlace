"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion,  } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { herofeatures } from "@/data/AboutData";


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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight sm:leading-[1.1] md:leading-[1.05] drop-shadow-lg mt-3 sm:mt-4 text-center md:text-left"
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
              href="/bookings"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-black font-semibold shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all flex items-center gap-2"
            >
              <Icon icon="mdi:calendar-star" className="w-5 h-5" />
              Reserve Now
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - Redesigned */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-[350px] md:max-w-[420px] mx-auto md:mx-0 flex flex-col"
        >
          {/* Features */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {herofeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="group relative rounded-2xl p-5 flex flex-col items-center text-center bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/25 mb-3 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <Icon
                    icon={feature.icon}
                    className="h-6 w-6 text-yellow-400 group-hover:text-black"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white truncate">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs text-gray-300 line-clamp-3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button as Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/studio"
              className="w-full block rounded-2xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 p-[2px] shadow-lg hover:shadow-yellow-400/50 transition-all"
            >
              <div className="rounded-2xl bg-black text-center px-6 py-4 flex items-center justify-center gap-2">
                <Icon
                  icon="mdi:camera-outline"
                  className="w-5 h-5 text-yellow-400"
                />
                <span className="font-semibold text-white">
                  Visit Our Photo Studio
                </span>
              </div>
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
