"use client";

import React, { useState, } from "react";
import Link from "next/link";
import BookingToasts from "../bookings/BookingToast";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      // simulate request
      await new Promise((resolve) => setTimeout(resolve, 600));

      // fake success
      setStatus("sent");

      // auto-hide toast after 3s
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }

  }

  return (
    <>
      {/* Toasts */}
      <BookingToasts
        success={status === "sent"}
        successMessage="Your Message was successfully sent"
        error={status === "error" ? error : null}
        onDismiss={() => {
          setError(null);
          setStatus("idle");
        }}
      />

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-2xl backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" name="name" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="Phone" name="phone" />
          <Input label="Subject" name="subject" />
          <Textarea label="Message" name="message" rows={5} required />
        </div>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-3 rounded-full bg-yellow-400 text-black text-sm sm:text-base font-semibold shadow-lg hover:shadow-yellow-500/40 hover:scale-[1.02] transition-transform disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          <Link
            href="tel:+2340000000000"
            className="px-6 py-3 rounded-full bg-transparent border-2 border-yellow-400 text-yellow-400 text-sm sm:text-base font-semibold hover:bg-yellow-400 hover:text-black hover:scale-[1.02] transition-transform text-center"
          >
            Call Front Desk
          </Link>
        </div>
      </form>
    </>
  );
}

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    <input
      {...props}
      className="w-full rounded-xl bg-transparent border border-white/15 px-4 py-3 text-sm outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-400/70 focus:border-yellow-400/70"
    />
  </div>
);

const Textarea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="sm:col-span-2">
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    <textarea
      {...props}
      className="w-full rounded-xl bg-transparent border border-white/15 px-4 py-3 text-sm outline-none resize-y placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-400/70 focus:border-yellow-400/70"
    />
  </div>
);
