"use client";

import React, { useReducer, useState, useMemo, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import BookingForm from "./BookingForm";
import StudioBookingForm from "./StudioBookingForm"; // ✅ import
import BookingPreview from "./BookingPreview";
import BookingToasts from "./BookingToast";
import { Icon } from "@iconify/react";
import StudioPreview from "./StudioPreview";



// ---- Shared Form state ----
export type FormState = {
  date: string;
  nights?: number; // ✅ optional for studio
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
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ---- Main Page ----
export default function Page() {
  // Tab state
  const [tab, setTab] = useState<"apartments" | "studio">("apartments");

  // Separate reducers for each form
  const [aptState, aptDispatch] = useReducer(reducer, initialForm);
  const [studioState, studioDispatch] = useReducer(reducer, initialForm);

  // Shared UI state
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
      // TODO: replace with API call
      await new Promise((r) => setTimeout(r, 800));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
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
        {/* Tabs */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setTab("apartments")}
            className={`px-4 py-2 rounded-full border ${
              tab === "apartments"
                ? "bg-yellow-400 text-black border-yellow-400"
                : "border-white/20 text-gray-300 hover:text-white"
            }`}
          >
            Apartments
          </button>
          <button
            onClick={() => setTab("studio")}
            className={`px-4 py-2 rounded-full border ${
              tab === "studio"
                ? "bg-yellow-400 text-black border-yellow-400"
                : "border-white/20 text-gray-300 hover:text-white"
            }`}
          >
            Studio Session
          </button>
        </div>

        {/* Booking Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
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
            {tab === "apartments" ? (
              <BookingPreview summary={summary} />
            ) : (
              <StudioPreview summary={summary}/>
            )}
          </motion.div>
        </motion.div>

        {/* Assistance Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex w-full justify-center px-4"
        >
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-lg">
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
