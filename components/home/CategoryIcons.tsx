"use client";

import { motion } from "framer-motion";

const categories = [
  { icon: "⚽", label: "Esportes" },
  { icon: "🎁", label: "Promoções" },
  { icon: "🏆", label: "Torneios" },
  { icon: "✈️", label: "Aviatrix" },
  { icon: "📅", label: "Check-in diário" },
  { icon: "🎰", label: "Cassino" },
  { icon: "🎮", label: "E-Sports" },
  { icon: "💣", label: "Mines" }
];

export default function CategoryIcons() {
  return (
    <section className="overflow-x-auto rounded-3xl border border-nova-blue/10 bg-nova-card/60 px-4 py-5">
      <div className="flex min-w-max items-start justify-center gap-6">
        {categories.map((category, index) => {
          const ativo = index === 0;

          return (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <button type="button" className="group flex min-w-[88px] flex-col items-center gap-2">
                <div
                  className={`flex h-14 w-14 items-center justify-center !rounded-full border text-2xl transition duration-300 group-hover:scale-105 group-hover:border-nova-blue ${
                    ativo
                      ? "border-nova-blue bg-nova-elevated"
                      : "border-nova-border bg-nova-card"
                  }`}
                >
                  {category.icon}
                </div>
                <span className="text-center text-xs text-nova-textMuted transition group-hover:text-nova-text">
                  {category.label}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
