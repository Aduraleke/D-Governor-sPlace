"use client";

import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface BookingToastsProps {
  success: boolean;
  successMessage?: string; // <-- success message prop
  error: string | null;
  onDismiss: () => void;
}

const BookingToasts: FC<BookingToastsProps> = ({
  success,
  successMessage = "Booking request sent!", // default message
  error,
  onDismiss,
}) => (
  <div className="fixed top-6 right-6 z-50">
    <AnimatePresence>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-3 rounded-2xl border border-yellow-400/40 bg-black/70 px-4 py-3 shadow-xl"
        >
          <Icon icon="ph:check-circle" className="h-6 w-6 text-yellow-400" />
          <p className="text-sm text-yellow-100">{successMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 flex items-center gap-3 rounded-2xl border border-red-400/40 bg-black/70 px-4 py-3 shadow-xl"
        >
          <Icon icon="ph:x-circle" className="h-6 w-6 text-red-400" />
          <p className="text-sm text-red-200">{error}</p>
          <button
            onClick={onDismiss}
            className="ml-2 rounded-full border border-white/10 p-1 text-xs text-gray-300 hover:bg-white/10"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default BookingToasts;
