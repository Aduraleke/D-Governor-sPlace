"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] backdrop-blur-md"
        >
          <motion.div
            className="w-12 h-12 border-4 border-[#f3ce00] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
