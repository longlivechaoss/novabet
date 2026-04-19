"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const provedores = [
  { id: 1, nome: "Provedor 1", logo: "/images/provedores/provedor-1.avif" },
  { id: 2, nome: "Provedor 2", logo: "/images/provedores/provedor-2.avif" },
  { id: 3, nome: "Provedor 3", logo: "/images/provedores/provedor-3.avif" },
  { id: 4, nome: "Provedor 4", logo: "/images/provedores/provedor-4.avif" },
  { id: 5, nome: "Provedor 5", logo: "/images/provedores/provedor-5.avif" },
  { id: 6, nome: "Provedor 6", logo: "/images/provedores/provedor-6.avif" },
  { id: 7, nome: "Provedor 7", logo: "/images/provedores/provedor-7.avif" },
  { id: 8, nome: "Provedor 8", logo: "/images/provedores/provedor-8.avif" },
  { id: 9, nome: "Provedor 9", logo: "/images/provedores/provedor-9.avif" },
  { id: 10, nome: "Provedor 10", logo: "/images/provedores/provedor-10.avif" },
  { id: 11, nome: "Provedor 11", logo: "/images/provedores/provedor-11.avif" },
  { id: 12, nome: "Provedor 12", logo: "/images/provedores/provedor-12.avif" },
  { id: 13, nome: "Provedor 13", logo: "/images/provedores/provedor-13.avif" }
];

export default function Provedores() {
  return (
    <div className="mb-3 mt-3">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-nova-blue" />
          <h2 className="text-base font-bold text-white md:text-lg">Provedores de Jogos</h2>
        </div>
        <Link href="/provedores" className="text-sm text-nova-blue transition-colors hover:text-nova-blueLight">
          Ver todos
        </Link>
      </div>

      {/* Marquee infinito */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-2 md:gap-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity
          }}
          style={{ width: "max-content" }}
        >
          {/* Duplicar array para loop contínuo */}
          {[...provedores, ...provedores].map((prov, i) => (
            <div
              key={`${prov.id}-${i}`}
              className="group flex h-[52px] min-w-[100px] w-[100px] flex-shrink-0 cursor-pointer items-center justify-center rounded-xl border border-nova-border bg-nova-card transition-all hover:border-nova-blue hover:bg-nova-elevated md:h-[80px] md:min-w-[150px] md:w-[150px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prov.logo}
                alt={prov.nome}
                className="max-h-[28px] max-w-[72px] object-contain opacity-60 transition-opacity filter brightness-0 invert group-hover:opacity-100 md:max-h-[45px] md:max-w-[100px]"
                onError={(e) => {
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-nova-textMuted text-xs font-semibold">${prov.nome}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
