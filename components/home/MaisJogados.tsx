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

const arrowBtnStyle = {
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 30,
  background: "#1652F0",
  boxShadow: "0 0 16px 6px rgba(22,82,240,0.55)",
  borderRadius: "50%",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer"
};

export default function MaisJogados({ titulo }: MaisJogadosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollCards(dir: -1 | 1) {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const gap = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 12;
    const step = first ? first.offsetWidth + gap : 166;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
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
      className="space-y-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-80px 0px 0px 0px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-nova-blue/40 bg-nova-blue/20 px-4 py-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-nova-blueBright" />
          <span className="text-base font-bold text-white md:text-lg">{titulo}</span>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollCards(-1)}
          aria-label="Anterior"
          className="h-7 w-7 md:h-9 md:w-9"
          style={{ ...arrowBtnStyle, left: "12px" }}
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => scrollCards(1)}
          aria-label="Próximo"
          className="h-7 w-7 md:h-9 md:w-9"
          style={{ ...arrowBtnStyle, right: "12px" }}
        >
          ▶
        </button>
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 md:gap-3">
        {jogosRecomendados.map((jogo) => (
          <motion.div
            key={jogo.id}
            className="min-w-[100px] max-w-[100px] flex-shrink-0 overflow-hidden rounded-xl md:min-w-[130px] md:max-w-[130px] lg:min-w-[150px] lg:max-w-[150px]"
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
      </div>
    </motion.div>
  );
}
