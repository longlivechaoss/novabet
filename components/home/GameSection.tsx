"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { slugifyGameName } from "@/lib/gameSlug";

type Game = {
  id?: number;
  nome?: string;
  name?: string;
  emoji: string;
  gradient: string;
  imagem?: string;
};

type GameSectionProps = {
  title: string;
  games: Game[];
  showRanking?: boolean;
};

export default function GameSection({ title, games, showRanking = false }: GameSectionProps) {
  void showRanking;

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

  return (
    <motion.section
      className="mb-2 space-y-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white md:text-base">{title}</span>
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
        {games.map((game, index) => (
          <motion.div
            key={game.id ?? index}
            className="game-card-glow group relative w-[90px] min-w-[90px] shrink-0 cursor-pointer overflow-hidden rounded-xl md:min-w-[118px] md:w-[118px] lg:min-w-[136px] lg:w-[136px]"
            style={{ aspectRatio: "368 / 496" }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href={`/jogos/${slugifyGameName(game.nome ?? game.name ?? "jogo")}`}
              className="block h-full w-full"
            >
              {game.imagem ? (
                <Image
                  src={game.imagem}
                  alt={game.nome ?? game.name ?? "Jogo"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${game.gradient}`}
                >
                  <span className="text-5xl">{game.emoji}</span>
                </div>
              )}

              <div className="absolute inset-0 z-20 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="relative z-30 flex items-center justify-center p-3 pb-4">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      background: "#1652F0",
                      boxShadow: "0 0 18px 6px rgba(22,82,240,0.55)",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px"
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
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
