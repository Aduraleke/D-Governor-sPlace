"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Heroimage.jpg"
          alt="D'Governor's Place Rooftop View"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 backdrop-blur-sm" />
      </div>

      {/* Content Wrapper */}
      <div className=" relative flex flex-col md:flex-row items-center justify-center text-center md:text-left max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 min-h-screen gap-8 md:gap-12">
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
            className="uppercase tracking-[3px] text-yellow-400 text-[10px] sm:text-xs md:text-sm font-semibold"
          >
            Luxury • Music • Lifestyle • Port Harcourt
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-snug sm:leading-tight drop-shadow-lg mt-3 sm:mt-4"
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 animate-gradient-shimmer">
              D&apos;Governor&apos;s Place
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-3 sm:mt-4 font-semibold text-gray-200 text-sm sm:text-base md:text-[15px] leading-relaxed max-w-md"
          >
            Your all-in-one destination for{" "}
            <span className="text-yellow-400 font-semibold">
              music entertainment
            </span>
            ,{" "}
            <span className="text-yellow-400 font-semibold">
              live-online karaoke
            </span>
            ,{" "}
            <span className="text-yellow-400 font-semibold">
              delicious small chops & drinks
            </span>
            , and{" "}
            <span className="text-yellow-400 font-semibold">
              premium short-let apartments
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Link
              href="/reservations"
              className="px-5 py-3 sm:px-7 sm:py-3 rounded-full bg-yellow-400 text-black text-sm sm:text-base md:text-sm font-semibold shadow-lg hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Reserve Now
            </Link>
            <Link
              href="/menu"
              className="px-5 py-3 sm:px-7 sm:py-3 rounded-full bg-transparent border-2 border-yellow-400 text-yellow-400 text-sm sm:text-base md:text-sm font-semibold backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Explore Menu
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side Feature Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-full md:w-[380px] lg:w-[420px] rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 mx-auto md:mx-0 mr-4"
        >
          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6">
            {/* Entertainment */}
            <div className="flex flex-col items-center text-center">
              <Icon
                icon="mdi:music"
                className="w-7 h-7 sm:w-10 sm:h-10 md:w-9 md:h-9 text-yellow-400 mb-1 sm:mb-2"
              />
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Entertainment
              </h3>
              <p className="text-[11px] font-bold sm:text-xs md:text-sm text-gray-300">
                Live bands & DJ nights
              </p>
            </div>

            {/* Karaoke */}
            <div className="flex flex-col items-center text-center">
              <Icon
                icon="mdi:microphone-variant"
                className="w-7 h-7 sm:w-10 sm:h-10 md:w-9 md:h-9 text-yellow-400 mb-1 sm:mb-2"
              />
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Karaoke
              </h3>
              <p className="text-[11px] font-bold sm:text-xs md:text-sm text-gray-300">
                Sing live & stream online
              </p>
            </div>

            {/* Food & Drinks */}
            <div className="flex flex-col items-center text-center">
              <Icon
                icon="mdi:glass-cocktail"
                className="w-7 h-7 sm:w-10 sm:h-10 md:w-9 md:h-9 text-yellow-400 mb-1 sm:mb-2"
              />
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Food & Drinks
              </h3>
              <p className="text-[11px] font-bold sm:text-xs md:text-sm text-gray-300">
                Small chops & cocktails
              </p>
            </div>

            {/* Accommodation */}
            <div className="flex flex-col items-center text-center">
              <Icon
                icon="mdi:bed"
                className="w-7 h-7 sm:w-10 sm:h-10 md:w-9 md:h-9 text-yellow-400 mb-1 sm:mb-2"
              />
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Stay With Us
              </h3>
              <p className="text-[11px] font-bold sm:text-xs md:text-sm text-gray-300">
                Luxury short-let apartments
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <Icon
          icon="mdi:chevron-down"
          className="text-yellow-400 w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6"
        />
      </motion.div>

      {/* Gradient Animation */}
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
          animation: gradient-shimmer 4s ease infinite;
        }
      `}</style>
    </section>
  );
}
