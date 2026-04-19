"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-[calc(58px+1rem)] right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-nova-blue text-xl text-white shadow-lg shadow-nova-blue/30 transition-transform hover:scale-110 hover:bg-nova-blueLight md:bottom-6"
        >
          ↑
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
