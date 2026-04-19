"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { slugifyGameName } from "@/lib/gameSlug";

interface Jogo {
  id: number;
  nome: string;
  emoji?: string;
  gradient: string;
  imagem?: string;
  badge?: "HOT" | "NOVO" | "TOP";
}

interface Props {
  titulo: string;
  jogos: Jogo[];
  mostrarBadges?: boolean;
}

function slugIcone(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function CarrosselJogos({ titulo, jogos, mostrarBadges = false }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getLarguraCard = () => {
    if (!scrollRef.current) return 176;
    const primeiroCard = scrollRef.current.children[0] as HTMLElement;
    if (!primeiroCard) return 176;
    const gap = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 12;
    return primeiroCard.offsetWidth + gap;
  };

  const rolarEsquerda = () => {
    if (!scrollRef.current) return;
    const larguraCard = getLarguraCard();
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (scrollLeft <= 5) {
      scrollRef.current.scrollTo({
        left: maxScroll,
        behavior: "smooth"
      });
    } else {
      const novoScroll = Math.floor(scrollLeft / larguraCard) * larguraCard - larguraCard;
      scrollRef.current.scrollTo({
        left: Math.max(0, novoScroll),
        behavior: "smooth"
      });
    }
  };

  const rolarDireita = () => {
    if (!scrollRef.current) return;
    const larguraCard = getLarguraCard();
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (scrollLeft >= maxScroll - 5) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const novoScroll = Math.ceil(scrollLeft / larguraCard) * larguraCard + larguraCard;
      scrollRef.current.scrollTo({
        left: Math.min(maxScroll, novoScroll),
        behavior: "smooth"
      });
    }
  };

  const corDoBadge = (badge?: string) => {
    if (badge === "HOT") return "bg-nova-ruby";
    if (badge === "NOVO") return "bg-nova-blue";
    if (badge === "TOP") return "bg-nova-blue";
    return "bg-nova-blue";
  };

  const iconeDoBadge = (badge?: string) => {
    if (badge === "HOT") return "🔥 HOT";
    if (badge === "NOVO") return "✨ NOVO";
    if (badge === "TOP") return "👑 TOP";
    return "🔥 HOT";
  };

  return (
    <div className="mb-3 mt-3 w-full">
      <div
        className="flex items-center justify-between mb-3"
        style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/icons/${slugIcone(titulo)}.webp`}
            alt=""
            className="h-7 w-7 shrink-0 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="text-base font-bold text-white md:text-lg">{titulo}</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={rolarEsquerda}
            className="flex h-7 w-7 items-center justify-center !rounded-full bg-nova-card text-white transition hover:bg-nova-elevated"
            style={{ fontSize: "16px" }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={rolarDireita}
            className="flex h-7 w-7 items-center justify-center !rounded-full bg-nova-card text-white transition hover:bg-nova-elevated"
            style={{ fontSize: "16px" }}
            aria-label="Próximo"
          >
            ›
          </button>
          <Link
            href="/jogos"
            className="flex items-center gap-1 rounded-xl bg-nova-blue px-3 py-1 text-xs font-semibold text-white transition hover:bg-nova-blueLight"
          >
            Ver todos <span>›</span>
          </Link>
        </div>
      </div>

      <div className="relative -mr-6 overflow-visible lg:-mr-8">
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(to left, #141420 0%, rgba(20, 20, 32, 0.8) 40%, transparent 100%)"
          }}
        />

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto pb-4 pt-3 pr-6 md:gap-3 lg:pr-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            overflowY: "visible"
          }}
        >
          {jogos.map((jogo, index) => {
            const slug = slugifyGameName(jogo.nome);
            const badgeAtivo = mostrarBadges && jogo.badge;

            return (
              <motion.div
                key={jogo.id}
                className="w-[100px] min-w-[100px] shrink-0 md:min-w-[130px] md:w-[130px] lg:min-w-[150px] lg:w-[150px]"
                style={{
                  scrollSnapAlign: "start"
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/jogos/${slug}`}>
                  <div
                    className="group/card relative cursor-pointer overflow-hidden rounded-xl"
                    style={{ aspectRatio: "368 / 496" }}
                  >
                    {jogo.imagem ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={jogo.imagem}
                        alt={jogo.nome}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${jogo.gradient}`}
                      >
                        <span className="text-5xl">{jogo.emoji}</span>
                      </div>
                    )}

                    {badgeAtivo && (
                      <div
                        className={`absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-xs font-bold text-white ${corDoBadge(jogo.badge)}`}
                      >
                        {iconeDoBadge(jogo.badge)}
                      </div>
                    )}

                    <div className="absolute inset-0 z-10 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="relative z-20 p-3 pb-4">
                        <span className="flex w-full items-center justify-center rounded-xl bg-nova-blue py-2 text-sm font-bold text-white shadow-lg shadow-nova-blue/30 transition-colors hover:bg-nova-blueLight">
                          Jogar Agora
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
