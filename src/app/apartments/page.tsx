"use client";

import React, { useReducer, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import BookingForm from "./ApartmentBookingForm";
import BookingPreview from "./ApartmentBookingPreview";
import BookingToasts from "./ApartmentBookingToast";
import { Icon } from "@iconify/react";
import { COMPOSE_EMAIL } from "@/services/mail.service";
import Image from "next/image";

// Apartments Data
const apartments = [
  {
    id: 1,
    src: "/Apartment5.jpeg",
    name: "Luxury Studio",
    desc: "Perfect for solo travelers.",
  },
  {
    id: 2,
    src: "/Apartment9.jpeg",
    name: "Modern Apartment",
    desc: "Spacious and elegant.",
  },
  {
    id: 3,
    src: "/apartment1.webp",
    name: "Elegant Suite",
    desc: "For couples and comfort.",
  },
  {
    id: 4,
    src: "/Apartment2.jpeg",
    name: "Premium Loft",
    desc: "Open space with views.",
  },
  {
    id: 5,
    src: "/Apartment6.jpeg",
    name: "Urban Comfort",
    desc: "Relax in the city center.",
  },
  {
    id: 6,
    src: "/Apartment4.jpeg",
    name: "Classic Apartment",
    desc: "Timeless design feel.",
  },
];

// Form State
export type FormState = {
  date: string;
  nights: number;
  apartment: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
};

const initialForm: FormState = {
  date: "",
  nights: 1,
  apartment: "Studio",
  name: "",
  email: "",
  phone: "",
  requests: "",
};

type Action =
  | { type: "set"; field: keyof FormState; value: string | number }
  | { type: "reset" };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "set":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialForm;
    default:
      return state;
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const summary = useMemo(
    () =>
      `${state.apartment} · ${state.nights} night${
        state.nights > 1 ? "s" : ""
      } · Booking For ${state.date || ""}`,
    [state]
  );

  const setField = useCallback(
    (field: keyof FormState, value: string | number) =>
      dispatch({ type: "set", field, value }),
    []
  );

  function validate(f: FormState) {
    if (!f.date) return "Please select a date.";
    if (!f.name.trim()) return "Name is required.";
    if (!f.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      return "Please enter a valid email.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const err = validate(state);
    if (err) return setError(err);

    setError(null);
    setSubmitting(true);

    try {
      // 📨 Format booking details for the email
      const emailContent = `
      📅 Date: ${state.date}
      🌙 Nights: ${state.nights}
      🏨 Apartment: ${state.apartment}
      🙍 Name: ${state.name}
      ✉️ Email: ${state.email}
      📞 Phone: ${state.phone}
      📝 Requests: ${state.requests || "None"}
    `;

      // 🔥 Send to backend mailer
      const result = await COMPOSE_EMAIL({
        to: "bookings@yourstudio.com", // change to your receiving email
        subject: `New Apartment Booking - ${state.apartment}`,
        content: emailContent,
      });

      if (result.isOk) {
        setSuccess(true);
        dispatch({ type: "reset" }); // reset form
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="booking"
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-black/95 to-black text-white"
    >
      <BookingToasts
        success={success}
        error={error}
        onDismiss={() => setError(null)}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#f3ce00] to-yellow-200 bg-clip-text text-transparent">
            Explore Our Apartments
          </h2>

          <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {apartments.map((apt) => (
              <motion.div
                key={apt.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => setField("apartment", apt.name)}
                className="relative min-w-[90%] sm:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] snap-center rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
              >
                {/* Apartment Image */}
                <Image
                  src={apt.src}
                  alt={apt.name}
                  width={600}
                  height={400}
                  className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Glass Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-yellow-300">
                    {apt.name}
                  </h3>
                  <p className="text-sm text-gray-200 mt-1">{apt.desc}</p>
                </div>

                {/* Selected badge */}
                {state.apartment === apt.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-5 right-5 bg-[#f3ce00] text-black text-xs font-bold px-3 py-1 rounded-full shadow-md"
                  >
                    Selected
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Booking Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16"
        >
          <BookingForm
            state={state}
            setField={setField}
            onSubmit={handleSubmit}
            onReset={() => dispatch({ type: "reset" })}
            submitting={submitting}
          />

          <BookingPreview summary={summary} />
        </motion.div>

        {/* Concierge Assistance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex w-full justify-center px-4"
        >
          <div className="w-full max-w-3xl backdrop-blur-md rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <Icon icon="mdi:lifebuoy" className="h-7 w-7 text-[#f3ce00]" />
                <p className="text-sm sm:text-base text-gray-200">
                  Need help? Our concierge team is available 24/7.
                </p>
              </div>

              <a
                href="tel:+2348026393322"
                className="inline-flex items-center justify-center rounded-full border border-[#f3ce00] px-6 py-2 text-sm sm:text-base font-semibold text-[#f3ce00] hover:bg-[#f3ce00] hover:text-black transition hover:scale-105"
              >
                <Icon icon="mdi:phone" className="mr-2 h-5 w-5" />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
