"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top Navbar (Desktop) */}
      <motion.nav
        role="navigation"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl 
                   bg-gradient-to-r from-black/70 via-black/60 to-black/70 
                   dark:from-black/80 dark:via-black/75 dark:to-black/80
                   border-b border-white/10 shadow-lg transition-colors duration-300 
                   pt-[env(safe-area-inset-top)]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/dgovernorsplaceLogo.png"
              alt="D'Governor’sPlace Logo"
              width={36}
              height={36}
              priority
              className="rounded-full w-8 sm:w-9 md:w-10"
              sizes="(max-width: 768px) 32px, 36px"
            />
            <h1
              className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide 
                         bg-gradient-to-r from-[#f3ce00] via-yellow-400 to-[#f3ce00] 
                         text-transparent bg-clip-text drop-shadow-lg"
            >
              D&apos;Governor’sPlace
            </h1>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative font-semibold text-[clamp(0.85rem,1vw,1rem)] tracking-wide transition-all duration-500
                      ${
                        isActive
                          ? "text-[#f3ce00]"
                          : "text-white hover:text-[#f3ce00]"
                      }
                      hover:scale-105
                      after:content-[''] after:absolute after:left-0 after:-bottom-1
                      after:w-0 hover:after:w-full after:h-[2px] after:bg-[#f3ce00]
                      after:transition-[width,transform] after:duration-500 after:origin-left
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3ce00] focus-visible:ring-offset-2`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Bottom Navigation (Mobile) */}
      <motion.div
        className="lg:hidden fixed bottom-0 left-0 w-full 
                   bg-black/70 backdrop-blur-lg border-t border-white/10 
                   shadow-[0_-4px_12px_rgba(0,0,0,0.4)] rounded-t-2xl z-50"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center py-2 relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center gap-1 px-3 py-2 flex-1 transition-transform active:scale-90"
              >
                <Icon
                  icon={link.icon}
                  className={`text-2xl sm:text-[26px] transition-colors duration-300 ${
                    isActive ? "text-[#f3ce00]" : "text-gray-300"
                  }`}
                />
                <span
                  className={`text-[11px] sm:text-xs font-medium hidden xs:block ${
                    isActive ? "text-[#f3ce00]" : "text-gray-300"
                  }`}
                >
                  {link.name}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 w-1.5 h-1.5 bg-[#f3ce00] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

