"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { features, stats } from "@/data/AboutData";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function AboutSection() {
  const [featureIndex, setFeatureIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? "show" : "hidden";
  const whileInViewState = reduceMotion ? undefined : "show";

  const timeAutoNext = 2000;

  useEffect(() => {
    const id = setInterval(() => {
      const currentFeature = features[featureIndex];
      if (slideIndex < currentFeature.slides.length - 1) {
        setSlideIndex((prev) => prev + 1);
      } else {
        setFeatureIndex((prev) => (prev + 1) % features.length);
        setSlideIndex(0);
      }
    }, timeAutoNext);

    return () => clearInterval(id);
  }, [featureIndex, slideIndex]);

  const feature = features[featureIndex];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-black via-black/95 to-black text-white min-h-screen">
      {/* Decorative glowing blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-20 lg:py-28">
        <motion.div
          variants={container}
          initial={initialState}
          whileInView={whileInViewState}
          viewport={{ amount: 0.3, once: true }}
          className="
            grid grid-cols-1 
            lg:grid-cols-2 
            gap-14 lg:gap-24 items-center
            max-[1252px]:grid-cols-1
          "
        >
          {/* LEFT: Images */}
          <motion.div variants={item} className="relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={feature.slides[slideIndex]}
                alt={feature.title}
                fill
                quality={75}
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/30" />
            </div>

            {/* Floating Card (next slide preview) */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.3,
              }}
              viewport={{ once: true }}
              className="hidden sm:block absolute -bottom-8 -right-4 md:-right-10 w-[60%] sm:w-[35%] mr-2 rounded-2xl overflow-hidden border border-white/20 shadow-lg backdrop-blur-md bg-white/5"
            >
              <div className="relative w-full aspect-[5/3]">
                <Image
                  src={feature.slides[(slideIndex + 1) % feature.slides.length]}
                  alt="Preview"
                  fill
                  quality={75}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/10 backdrop-blur-sm">
                <Icon icon={feature.icon} className="w-6 h-6 text-[#f3ce00]" />
                <p className="text-[12px] text-gray-100">
                  Experience more of {feature.title}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Details */}
          <div className="relative">
            {/* Section label */}
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 uppercase tracking-[3px] 
              text-[#f3ce00] text-sm sm:text-base md:text-lg font-extrabold"
            >
              <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#f3ce00] animate-pulse" />
              About D&apos;Governor&apos;s Place
            </motion.span>

            {/* Title */}
            <motion.h2
              variants={item}
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            >
              {feature.title}
            </motion.h2>

            {/* Tagline with underline accent */}
            <motion.p
              variants={item}
              className="mt-3 text-[#f3ce00] text-base sm:text-lg md:text-xl italic font-medium relative inline-block"
            >
              {feature.tagline}
              <span className="block w-12 h-1 mt-1 bg-gradient-to-r from-[#f3ce00] to-transparent rounded-full" />
            </motion.p>

            {/* Description */}
            <motion.p
              variants={item}
              className="mt-5 text-gray-300 text-sm sm:text-base md:text-[15px] leading-relaxed max-w-xl"
            >
              {feature.desc}
            </motion.p>

            {/* Feature Details */}
            <motion.ul
              variants={item}
              className="mt-6 space-y-4"
              aria-label="Feature highlights"
            >
              {feature.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 group hover:translate-x-2 hover:scale-[1.01] transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f3ce00]/10 flex items-center justify-center group-hover:bg-[#f3ce00]/20 transition-colors">
                    <Icon
                      icon={detail.icon}
                      className="w-5 h-5 text-[#f3ce00] group-hover:scale-110 transition-transform"
                    />
                  </span>
                  <p className="text-sm sm:text-base text-gray-300">
                    {detail.text}
                  </p>
                </li>
              ))}
            </motion.ul>

            {/* Stats */}
            <motion.div
              variants={item}
              className="mt-10 mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-gradient-to-tr from-white/5 to-white/0 
      backdrop-blur-lg p-6 text-center shadow-lg hover:shadow-[#f3ce00]/20 
      hover:scale-105 transition-all duration-300 flex flex-col items-center"
                >
                  <Icon
                    icon={stat.icon}
                    className="w-7 h-7 text-[#f3ce00] mb-3"
                  />
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#f3ce00]">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-row justify-center xl:justify-start gap-4"
            >
              <Link
                href="/bookings"
                className="flex items-center justify-center gap-2 px-7 py-3 min-h-[38px] rounded-full 
    bg-[#f3ce00] text-black text-sm lg:text-[12px] sm:text-base font-semibold shadow-lg 
    hover:shadow-yellow-500/40 hover:scale-105 transition-transform duration-300"
              >
                <Icon icon="mdi:calendar-clock" className="w-5 h-5" />
                Book a Table
              </Link>
              <Link
                href="/apartments"
                className="flex items-center justify-center gap-2 px-7 py-3 min-h-[38px] rounded-full 
    bg-transparent border-2 border-[#f3ce00] text-[#f3ce00] text-sm lg:text-[12px] sm:text-base font-semibold 
    hover:bg-[#f3ce00] hover:text-black hover:scale-105 transition-transform duration-300"
              >
                <Icon icon="mdi:door-open" className="w-5 h-5" />
                View Apartments
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
