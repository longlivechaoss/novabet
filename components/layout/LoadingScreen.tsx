"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setLoading(false), 2000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-nova-bg"
        >
          <div className="flex flex-col items-center">
            <motion.img
              animate={{ opacity: [0.7, 1, 0.7], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              src="/images/logo-novabet.webp"
              alt="NovaBet"
              className="h-14 w-auto"
            />

            <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-nova-card">
              <motion.div
                className="h-full rounded-full bg-nova-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>

            <p className="mt-4 text-sm text-nova-textMuted">Carregando...</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

