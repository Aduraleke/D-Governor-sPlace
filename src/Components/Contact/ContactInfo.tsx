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

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 uppercase tracking-[3px] text-yellow-400 text-sm sm:text-base md:text-lg lg:text-xl font-extrabold"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
        Contact D&apos;Governor&apos;s Place
      </motion.span>

      <motion.h2
        variants={item}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
      >
        We’d love to hear from you
      </motion.h2>

      <motion.p
        variants={item}
        className="text-gray-300 text-sm sm:text-base md:text-[15px] max-w-xl"
      >
        Reservations, apartment enquiries, private dining or general questions
        reach out and our team will get back to you shortly.
      </motion.p>
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Phone */}
        <ContactCard
          icon="solar:phone-calling-linear"
          title="Phone"
          description="Call our front desk for instant assistance."
          content={
            <>
              <a
                href="tel:+2340000000000"
                className="text-yellow-400 hover:underline text-sm break-all"
              >
                +234 (0) 00 000 00000
              </a>
              <div className="text-gray-400 text-xs mt-1">
                09:00–22:00 (daily)
              </div>
            </>
          }
        />

        {/* WhatsApp */}
        <ContactCard
          icon="mdi:whatsapp"
          title="WhatsApp"
          description="Quick chats for bookings & questions."
          content={
            <Link
              href="https://wa.me/2340000000000"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:underline"
            >
              Start a chat{" "}
              <Icon icon="mdi:arrow-top-right" className="w-4 h-4" />
            </Link>
          }
        />

        {/* Email */}
        <ContactCard
          icon="mdi:email-outline"
          title="Email"
          description="Prefer writing? We’ll respond within 24 hours."
          content={
            <a
              href="mailto:info@dgovernorsplace.com"
              className="text-yellow-400 hover:underline text-sm break-words max-w-full block"
            >
              info@dgovernorsplace.com
            </a>
          }
        />

        {/* Address */}
        <ContactCard
          icon="mdi:map-marker-outline"
          title="Address"
          description="123 Rooftop Avenue, Port Harcourt, Nigeria"
          content={
            <Link
              href="https://www.google.com/maps?q=123+Rooftop+Avenue,+Port+Harcourt,+Nigeria"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:underline"
            >
              Get directions{" "}
              <Icon icon="mdi:arrow-top-right" className="w-4 h-4" />
            </Link>
          }
        />
      </motion.div>
    </div>
  );
}

const ContactCard = ({
  icon,
  title,
  description,
  content,
}: {
  icon: string;
  title: string;
  description: string;
  content: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-yellow-400/30 group">
    <div className="flex items-center gap-3">
      <Icon
        icon={icon}
        className="w-7 h-7 text-yellow-400 transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="font-semibold text-base sm:text-lg text-white">{title}</h3>
    </div>
    <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
      {description}
    </p>
    <div className="mt-4 space-y-1">{content}</div>
  </div>
);

