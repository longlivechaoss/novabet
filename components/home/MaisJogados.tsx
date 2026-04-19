"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { jogosRecomendados } from "@/data/jogos";
import { slugifyGameName } from "@/lib/gameSlug";

type MaisJogadosProps = {
  titulo: string;
};

export default function MaisJogados({ titulo }: MaisJogadosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function goPrev() {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const gap = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 12;
    const step = first ? first.offsetWidth + gap : 150;
    el.scrollBy({ left: -step, behavior: "smooth" });
  }

  function goNext() {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const gap = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 12;
    const step = first ? first.offsetWidth + gap : 150;
    el.scrollBy({ left: step, behavior: "smooth" });
  }

  const badgeStyles = {
    HOT: {
      label: "🔥 HOT",
      className: "bg-nova-ruby"
    },
    NOVO: {
      label: "✨ NOVO",
      className: "bg-nova-blue"
    },
    TOP: {
      label: "👑 TOP",
      className: "bg-nova-blue"
    }
  } as const;

  return (
    <motion.div
      className="mb-2 space-y-2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-80px 0px 0px 0px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white md:text-base">{titulo}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-nova-card text-white transition hover:bg-nova-elevated"
            style={{ fontSize: "16px" }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-nova-card text-white transition hover:bg-nova-elevated"
            style={{ fontSize: "16px" }}
            aria-label="Próximo"
          >
            ›
          </button>
          <Link
            href="/jogos"
            className="flex items-center gap-1 rounded-lg bg-nova-blue px-3 py-1 text-xs font-semibold text-white transition hover:bg-nova-blueLight"
          >
            Ver todos <span>›</span>
          </Link>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 md:gap-3">
        {jogosRecomendados.map((jogo) => (
          <motion.div
            key={jogo.id}
            className="min-w-[90px] max-w-[90px] flex-shrink-0 overflow-hidden rounded-xl md:min-w-[118px] md:max-w-[118px] lg:min-w-[136px] lg:max-w-[136px]"
            whileHover={{ scale: 1.05 }}
          >
            <Link href={`/jogos/${slugifyGameName(jogo.nome)}`}>
              <div
                className="game-card-glow group relative block w-full cursor-pointer overflow-hidden rounded-xl"
                style={{ aspectRatio: "368 / 496" }}
              >
                {jogo.imagem ? (
                  <Image src={jogo.imagem} alt={jogo.nome} fill className="object-cover" />
                ) : (
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${jogo.gradient}`}
                  >
                    <span className="text-5xl">{jogo.emoji}</span>
                  </div>
                )}
                {jogo.badge ? (
                  <div
                    className={`absolute right-2 top-2 z-30 rounded-full px-2 py-0.5 text-xs text-white ${badgeStyles[jogo.badge].className}`}
                  >
                    {badgeStyles[jogo.badge].label}
                  </div>
                ) : null}
                <div className="absolute inset-0 z-20 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="relative z-30 flex items-center justify-center p-3 pb-4">
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#1652F0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 20px 8px rgba(22,82,240,0.6)"
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "16px", height: "16px", fill: "white", marginLeft: "3px" }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
