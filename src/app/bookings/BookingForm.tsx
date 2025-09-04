"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";
import { FormState } from "./page";

// shared input style
const inputCls =
  "w-full rounded-xl border border-white/10 bg-black/40 px-10 py-3 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-yellow-400/40 focus:ring focus:ring-yellow-400/30";

// -----------------------------
// Inline field components
// -----------------------------
const IconInput: FC<{
  id: string;
  label: string;
  icon: string;
  type?: string;
  value: string | number;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  required?: boolean;
}> = ({
  id,
  label,
  icon,
  type = "text",
  value,
  onChange,
  min,
  max,
  required,
}) => (
  <div className="col-span-1">
    <label htmlFor={id} className="mb-1 block text-xs text-gray-300">
      {label}
    </label>
    <div className="relative">
      <Icon
        icon={icon}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
      />
      <input
        id={id}
        name={id}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        min={min}
        max={max}
        required={required}
        className={inputCls}
      />
    </div>
  </div>
);

const IconSelect: FC<{
  id: string;
  label: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}> = ({ id, label, icon, value, onChange, options }) => (
  <div className="col-span-1">
    <label htmlFor={id} className="mb-1 block text-xs text-gray-300">
      {label}
    </label>
    <div className="relative">
      <Icon
        icon={icon}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
      />
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const IconTextarea: FC<{
  id: string;
  label: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ id, label, icon, value, onChange }) => (
  <div className="col-span-1 sm:col-span-2">
    <label htmlFor={id} className="mb-1 block text-xs text-gray-300">
      {label}
    </label>
    <div className="relative">
      <Icon
        icon={icon}
        className="absolute left-3 top-3 h-5 w-5 text-gray-400"
      />
      <textarea
        id={id}
        name={id}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  </div>
);

// -----------------------------
// BookingForm
// -----------------------------
const apartments = ["Studio", "1 Bedrooms", "2 Bedrooms", "Larger-multi Bedrooms"];

const BookingForm: FC<{
  state: FormState;
  setField: (field: keyof FormState, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  submitting: boolean;
}> = ({ state, setField, onSubmit, onReset, submitting }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
    <div className="mb-6 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-yellow-400" />
      <span className="text-xs font-extrabold uppercase tracking-[3px] text-yellow-400">
        Apartment Booking
      </span>
    </div>

    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <IconInput
        id="date"
        label="Date"
        icon="mi:calendar"
        type="date"
        value={state.date}
        onChange={(v) => setField("date", v)}
        required
      />

      <IconSelect
        id="apartment"
        label="Apartment Type"
        icon="mdi:home-city-outline"
        value={state.apartment}
        onChange={(v) => setField("apartment", v)}
        options={apartments}
      />

      <IconInput
        id="nights"
        label="Nights"
        icon="mdi:moon-waning-crescent"
        type="number"
        value={state.nights}
        onChange={(v) => setField("nights", Number(v))}
        min={1}
        max={60}
      />

      <IconInput
        id="name"
        label="Full Name"
        icon="mdi:account"
        value={state.name}
        onChange={(v) => setField("name", v)}
        required
      />

      <IconInput
        id="email"
        label="Email"
        icon="mdi:email-outline"
        type="email"
        value={state.email}
        onChange={(v) => setField("email", v)}
        required
      />

      <div className="col-span-1 sm:col-span-2">
        <label htmlFor="phone" className="mb-1 block text-xs text-gray-300">
          Phone
        </label>
        <div className="relative">
          <Icon
            icon="mdi:phone"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={state.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <IconTextarea
        id="requests"
        label="Special Requests"
        icon="mdi:message-text-outline"
        value={state.requests}
        onChange={(v) => setField("requests", v)}
      />

      <div className="col-span-1 sm:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          disabled={submitting}
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-lg hover:scale-105 transition disabled:opacity-60"
        >
          <Icon icon="mdi:send" className="mr-2 h-5 w-5" />
          {submitting ? "Sending..." : "Confirm Booking"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 px-6 py-3 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
        >
          <Icon icon="mdi:restart" className="mr-2 h-5 w-5" /> Reset
        </button>
      </div>
    </form>
  </div>
);

export default BookingForm;
