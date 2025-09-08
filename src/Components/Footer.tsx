"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function Footer() {

  
  return (
    <footer className="relative bg-black/90 backdrop-blur-lg border-t border-white/10 text-gray-300 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-14">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Logo & Brand Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="flex items-center gap-3 cursor-pointer mb-4"
            >
              <Image
                src="/dgovernorsplaceLogo.png"
                alt="D'Governor’s Place Logo"
                width={40}
                height={40}
                priority
                quality={75}
                className="rounded-full w-9 sm:w-10 md:w-11"
                sizes="(max-width: 768px) 32px, 36px"
              />
              <h1 className="text-lg sm:text-lg md:text-[14px] lg:text-lg font-extrabold tracking-wide bg-gradient-to-r from-[#f3ce00] via-yellow-400 to-[#f3ce00] text-transparent bg-clip-text drop-shadow-lg">
                D&apos;Governor’s Place
              </h1>
            </Link>
          </motion.div>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
            Your all-in-one destination for music entertainment live-online
            karaoke delicious small chops & drinks premium short-let apartments
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm sm:text-base">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Gallery", path: "/studio" },
              { name: "Bookings", path: "/bookings" },
              { name: "Contact", path: "/contact" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="hover:text-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>

          <ul className="space-y-4 text-xs sm:text-sm">
            {/* Address */}
            <li className="flex items-start gap-3">
              <Icon
                icon="mdi:map-marker"
                className="text-yellow-400 text-xl flex-shrink-0"
              />
              <span className="leading-relaxed">
                No3. Okereke Close, Off Trans-Woji Road, Peace Valley Estate,
                Port Harcourt, Rivers State, Nigeria.
              </span>
            </li>

            {/* Phone Number */}
            <li className="flex items-center gap-3">
              <Icon icon="mdi:phone" className="text-yellow-400 text-xl" />
              <a
                href="tel:+2348026393322"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                +234 802 639 3322
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <Icon icon="mdi:email" className="text-yellow-400 text-xl" />
              <a
                href="mailto:dgovernorsplace@gmail.com"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                dgovernorsplace@gmail.com
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 sm:gap-5">
            {[
              {
                icon: "mdi:instagram",
                url: "https://www.instagram.com/dgovenorsplace/",
              },
              {
                icon: "mdi:facebook",
                url: "https://web.facebook.com/profile.php?id=61557429192984",
              },
              { icon: "mdi:whatsapp", url: "https://wa.me/2348026393322" }, // Replace with your WhatsApp number
            ].map((social, index) => (
              <Link
                key={index}
                href={social.url}
                aria-label={social.icon.split(":")[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md hover:shadow-yellow-400/40 transform hover:scale-110"
              >
                <Icon icon={social.icon} className="text-xl sm:text-2xl" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Bottom Footer */}
      <div
        className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 
             py-6 pb-20 flex flex-col sm:flex-row items-center 
             justify-between gap-3 text-gray-400 text-xs sm:text-sm"
      >
        <p>
          &copy; {new Date().getFullYear()} D&apos;Governor’s Place. All rights
          reserved.
        </p>
        <div className="flex gap-5">
          <Link
            href="/privacy-policy"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
