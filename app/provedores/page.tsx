"use client";

import { motion } from "framer-motion";

import SiteShell from "@/components/layout/SiteShell";

const provedores = [
  { nome: "PG Soft", jogos: "340 jogos" },
  { nome: "Pragmatic Play", jogos: "520 jogos" },
  { nome: "Hacksaw", jogos: "180 jogos" },
  { nome: "Evolution", jogos: "290 jogos" },
  { nome: "BGaming", jogos: "210 jogos" },
  { nome: "Aviatrix", jogos: "12 jogos" },
  { nome: "Spribe", jogos: "15 jogos" },
  { nome: "Ezugi", jogos: "140 jogos" },
  { nome: "SmartSoft", jogos: "45 jogos" },
  { nome: "Tada Games", jogos: "90 jogos" },
  { nome: "Turbo Games", jogos: "30 jogos" },
  { nome: "Playtech", jogos: "480 jogos" },
  { nome: "NetEnt", jogos: "350 jogos" },
  { nome: "Relax Gaming", jogos: "120 jogos" },
  { nome: "Push Gaming", jogos: "80 jogos" },
  { nome: "Nolimit City", jogos: "65 jogos" }
];

export default function ProvedoresPage() {
  return (
    <SiteShell contentClassName="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-nova-card to-nova-blue/60 px-8 py-10">
        <h1 className="text-4xl font-black text-white">🏭 Provedores</h1>
        <p className="mt-3 text-nova-textMuted">Todos os provedores disponíveis</p>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {provedores.map((provedor, index) => (
          <motion.div
            key={provedor.nome}
            className="card-surface flex h-[100px] cursor-pointer flex-col items-center justify-center rounded-xl border border-nova-card bg-nova-card p-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            style={{ boxShadow: "0 0 18px rgba(244, 184, 66, 0.14)" }}
          >
            <h2 className="text-lg font-bold text-white">{provedor.nome}</h2>
            <p className="mt-1 text-xs text-nova-textMuted">{provedor.jogos}</p>
          </motion.div>
        ))}
      </div>
    </SiteShell>
  );
}

