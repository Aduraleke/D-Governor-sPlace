"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/data/navLinks";
import { motion } from "framer-motion";
import { useTransition } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (href: string) => {
    if (href !== pathname) {
      startTransition(() => {
        router.push(href);
      });
    }
  };

  return (
    <>
      {/* Top Navbar (Desktop) */}
      <motion.nav
        role="navigation"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl 
                   bg-gradient-to-r from-black/70 via-black/60 to-black/70 
                   border-b border-white/10 shadow-lg transition-colors duration-300 
                   pt-[env(safe-area-inset-top)]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            onClick={() => handleClick("/")}
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
              quality={75}
              className="rounded-full w-8 sm:w-9 md:w-10"
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
                  <button
                    onClick={() => handleClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative font-semibold text-[clamp(0.85rem,1vw,1rem)] tracking-wide transition-all duration-500
                      ${
                        isActive
                          ? "text-[#f3ce00]"
                          : "text-white hover:text-[#f3ce00]"
                      }
                      hover:scale-105
                      ${isPending && !isActive ? "opacity-50" : ""}
                      after:content-[''] after:absolute after:left-0 after:-bottom-1
                      ${
                        isActive
                          ? "after:w-full"
                          : "after:w-0 hover:after:w-full"
                      }
                      after:h-[2px] after:bg-[#f3ce00]
                      after:transition-[width,transform] after:duration-500 after:origin-left`}
                  >
                    {link.name}
                  </button>
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
              <button
                key={link.name}
                onClick={() => handleClick(link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 flex-1 transition-transform active:scale-90 ${
                  isPending && !isActive ? "opacity-50" : ""
                }`}
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

                {/* Active dot indicator */}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-500
                    ${
                      isActive
                        ? "w-2 h-2 bg-[#f3ce00]"
                        : "w-0 h-0 bg-transparent"
                    }`}
                />
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
