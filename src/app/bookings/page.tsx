"use client";

import React, { useReducer, useState, useMemo, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import BookingForm from "./BookingForm";
import StudioBookingForm from "./StudioBookingForm";
import BookingPreview from "./BookingPreview";
import BookingToasts from "./BookingToast";
import { Icon } from "@iconify/react";
import { COMPOSE_EMAIL } from "@/services/mail.service";
import StudioPreview from "./StudioPreview";

// ---- Shared Form state ----
export type FormState = {
  date: string;
  nights?: number;
  apartment?: string;
  sessionType?: string;
  duration?: number;
  participants?: number;
  name: string;
  email: string;
  phone: string;
  requests: string;
};

const initialForm: FormState = {
  date: "",
  nights: 1,
  apartment: "Studio",
  sessionType: "",
  duration: 1,
  participants: 1,
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

// ---- Animations ----


const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ---- Main Page ----
export default function Page() {
  const [tab, setTab] = useState<"apartments" | "studio">("apartments");

  const [aptState, aptDispatch] = useReducer(reducer, initialForm);
  const [studioState, studioDispatch] = useReducer(reducer, initialForm);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const activeState = tab === "apartments" ? aptState : studioState;
  const activeDispatch = tab === "apartments" ? aptDispatch : studioDispatch;

  const summary = useMemo(() => {
    if (tab === "apartments") {
      return `${activeState.apartment} · ${activeState.nights} night${
        activeState.nights && activeState.nights > 1 ? "s" : ""
      } · Booking For ${activeState.date || ""}`;
    } else {
      return `${activeState.sessionType || "Session"} · ${
        activeState.duration
      } hour(s) · Booking For ${activeState.date || ""}`;
    }
  }, [activeState, tab]);

  const setField = useCallback(
    (field: keyof FormState, value: string | number) =>
      activeDispatch({ type: "set", field, value }),
    [activeDispatch]
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

    const err = validate(activeState);
    if (err) return setError(err);

    setError(null);
    setSubmitting(true);

    try {
      // 📨 build email content
      const emailContent = `
      📅 Date: ${activeState.date}
      🏨 Apartment: ${activeState.apartment ?? "N/A"}
      🌙 Nights: ${activeState.nights ?? "N/A"}
      🎬 Session Type: ${activeState.sessionType ?? "N/A"}
      ⏳ Duration: ${activeState.duration ?? "N/A"} hours
      👥 Participants: ${activeState.participants ?? "N/A"}
      🙍 Name: ${activeState.name}
      ✉️ Email: ${activeState.email}
      📞 Phone: ${activeState.phone}
      📝 Requests: ${activeState.requests || "None"}
    `;

      // 🔥 send via backend mailer
      const result = await COMPOSE_EMAIL({
        to: "dgovernorsplace@gmail.com", // replace with your receiver email
        subject: `New ${tab === "apartments" ? "Apartment" : "Studio"} Booking`,
        content: emailContent,
      });

      if (result.isOk) {
        setSuccess(true);
        // reset form
        activeDispatch({ type: "reset" });
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
      {/* Blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl"
      />

      <BookingToasts
        success={success}
        error={error}
        onDismiss={() => setError(null)}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-20 lg:py-28">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-yellow-400">
            Book Your Experience
          </h2>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
            Whether you’re planning a stay in our luxury apartments or a
            creative studio session, fill in your details below and preview your
            booking instantly.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center gap-6">
          <button
            onClick={() => setTab("apartments")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm sm:text-base transition-all ${
              tab === "apartments"
                ? "bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105"
                : "border-white/20 text-gray-300 hover:text-white hover:border-yellow-400"
            }`}
          >
            <Icon icon="mdi:home-city" className="h-5 w-5" />
            Apartments
          </button>
          <button
            onClick={() => setTab("studio")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm sm:text-base transition-all ${
              tab === "studio"
                ? "bg-yellow-400 text-black border-yellow-400 shadow-lg scale-105"
                : "border-white/20 text-gray-300 hover:text-white hover:border-yellow-400"
            }`}
          >
            <Icon icon="mdi:camera-enhance" className="h-5 w-5" />
            Studio Session
          </button>
        </div>

        {/* Booking Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16"
        >
          {/* Form */}
          <motion.div variants={item}>
            {tab === "apartments" ? (
              <BookingForm
                state={aptState}
                setField={setField}
                onSubmit={handleSubmit}
                onReset={() => aptDispatch({ type: "reset" })}
                submitting={submitting}
              />
            ) : (
              <StudioBookingForm
                state={studioState}
                setField={setField}
                onSubmit={handleSubmit}
                onReset={() => studioDispatch({ type: "reset" })}
                submitting={submitting}
              />
            )}
          </motion.div>

          {/* Preview */}
          <motion.div variants={item}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg">
              {tab === "apartments" ? (
                <BookingPreview summary={summary} />
              ) : (
                <StudioPreview summary={summary} />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Notes */}
        <p className="mt-10 text-center text-xs text-gray-400">
          * Cancellations must be made at least{" "}
          <span className="text-yellow-400">24 hours</span> in advance.
        </p>

        {/* Assistance Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex w-full justify-center px-4"
        >
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-center sm:text-left">
                <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
                  <Icon
                    icon="mdi:lifebuoy"
                    className="h-7 w-7 text-yellow-400"
                  />
                </div>
                <p className="text-sm sm:text-base text-gray-200 max-w-xs sm:max-w-none">
                  Need assistance? Our concierge team is available 24/7.
                </p>
              </div>
              <a
                href="tel:+2348026393322"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-yellow-400 px-5 py-2 text-sm sm:text-base font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-black transition hover:scale-105"
              >
                <Icon icon="mdi:phone" className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Call us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
