"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import SiteShell from "@/components/layout/SiteShell";
import { slugifyGameName } from "@/lib/gameSlug";

const categories = [
  "Todos",
  "Slots",
  "Ao Vivo",
  "Crash",
  "Mines",
  "Roleta",
  "Blackjack",
  "Favoritos"
];

const jogos = [
  {
    id: 1,
    nome: "Fortune Tiger",
    emoji: "🐯",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/ftg.webp",
    categoria: "Slots",
    favorito: true
  },
  {
    id: 2,
    nome: "Crazy Time",
    emoji: "🎪",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/crazy-time.webp",
    categoria: "Ao Vivo",
    favorito: true
  },
  {
    id: 3,
    nome: "Lightning Roulette",
    emoji: "⚡",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/lightning-roulette.webp",
    categoria: "Roleta"
  },
  {
    id: 4,
    nome: "Monopoly Live",
    emoji: "🎩",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/monopoly-live.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 5,
    nome: "Mega Ball",
    emoji: "🎱",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/mega-ball.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 6,
    nome: "Dream Catcher",
    emoji: "🎡",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/dream-catcher.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 7,
    nome: "Aviator",
    emoji: "✈️",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/aviatrix.webp",
    categoria: "Crash",
    favorito: true
  },
  {
    id: 8,
    nome: "Gravity Plinko",
    emoji: "🎯",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/gravity-plinko.webp",
    categoria: "Crash"
  },
  {
    id: 9,
    nome: "Crash Live",
    emoji: "📈",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/crash-live.webp",
    categoria: "Crash"
  },
  {
    id: 10,
    nome: "Stock Market",
    emoji: "📊",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/stock-market.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 11,
    nome: "Crazy Balls",
    emoji: "🎱",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/crazy-balls.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 12,
    nome: "Football Studio",
    emoji: "⚽",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/football-studio.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 13,
    nome: "Funky Time",
    emoji: "🎨",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/funky-time.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 14,
    nome: "Lightning Storm",
    emoji: "⚡",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/lightning-storm.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 15,
    nome: "Big Cash Strike",
    emoji: "💰",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/big-cash-strike.webp",
    categoria: "Slots"
  },
  {
    id: 16,
    nome: "Lightning Blackjack",
    emoji: "🂡",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/lightning-blackjack.webp",
    categoria: "Blackjack"
  },
  {
    id: 17,
    nome: "Double Ball Roulette",
    emoji: "🎲",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/double-ball-roulette.webp",
    categoria: "Roleta"
  },
  {
    id: 18,
    nome: "Red Door Roulette",
    emoji: "🚪",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/red-door-roulette.webp",
    categoria: "Roleta"
  },
  {
    id: 19,
    nome: "Extra Chilli",
    emoji: "🌶️",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/extra-chilli.webp",
    categoria: "Slots"
  },
  {
    id: 20,
    nome: "Money Cart 2",
    emoji: "🚃",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/money-cart-2.webp",
    categoria: "Slots"
  },
  {
    id: 21,
    nome: "Queen of Sirens",
    emoji: "🧜",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/queen-of-sirens.webp",
    categoria: "Ao Vivo"
  },
  {
    id: 22,
    nome: "Dead or Alive",
    emoji: "💀",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/dead-or-alive.webp",
    categoria: "Slots"
  },
  {
    id: 23,
    nome: "Book of Ra",
    emoji: "📖",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/book-of-ra.webp",
    categoria: "Slots"
  },
  {
    id: 24,
    nome: "Luxor Gold",
    emoji: "🏺",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/luxor-gold.webp",
    categoria: "Slots",
    favorito: true
  }
];

export default function JogosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [busca, setBusca] = useState("");

  const jogosFiltrados = jogos
    .filter((jogo) => jogo.nome.toLowerCase().includes(busca.toLowerCase()))
    .filter((jogo) => {
      if (categoriaAtiva === "Todos") {
        return true;
      }

      if (categoriaAtiva === "Favoritos") {
        return Boolean(jogo.favorito);
      }

      return jogo.categoria === categoriaAtiva;
    });

  return (
    <SiteShell contentClassName="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Todos os Jogos</h1>
        <p className="mt-2 text-sm text-nova-textMuted">Explore nossa coleção completa</p>
      </div>

      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-3">
          {categories.map((category) => {
            const isActive = categoriaAtiva === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setCategoriaAtiva(category)}
                className={`cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-nova-blue text-white"
                    : "bg-nova-card text-nova-textMuted hover:bg-nova-card/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-6 gradient-border rounded-2xl bg-nova-card/80 p-[1px]">
        <div className="flex items-center gap-3 rounded-2xl bg-nova-card px-4 py-3">
          <span className="text-lg text-nova-textMuted">🔍</span>
          <input
            type="text"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Buscar jogo..."
            className="w-full rounded-xl border border-transparent bg-transparent text-sm text-nova-text outline-none transition-all duration-300 placeholder:text-nova-textMuted focus:border-nova-blueBright focus:ring-2 focus:ring-nova-blue"
          />
        </div>
      </div>

      {jogosFiltrados.length === 0 ? (
        <div className="py-12 text-center text-nova-textMuted">
          😞 Nenhum jogo encontrado para &quot;{busca}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          {jogosFiltrados.map((game, index) => (
            <motion.div
              key={game.id}
              className="game-card-glow group relative cursor-pointer overflow-hidden rounded-xl"
              style={{ aspectRatio: "368 / 496" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href={`/jogos/${slugifyGameName(game.nome)}`} className="block h-full w-full">
                {game.imagem ? (
                  <Image src={game.imagem} alt={game.nome} fill className="object-cover" />
                ) : (
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${game.gradient}`}
                  >
                    <span className="text-5xl">{game.emoji}</span>
                  </div>
                )}

                <div className="absolute inset-0 z-20 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="relative z-30 p-3 pb-4">
                    <span className="flex w-full items-center justify-center rounded-lg bg-nova-blue py-2 text-sm font-bold text-white shadow-lg shadow-nova-blue/30 transition-colors duration-200 group-hover:bg-nova-blueLight">
                      Jogar Agora
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-2 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="rounded-lg bg-black/60 px-2 py-1">
                    <p className="truncate text-center text-xs font-semibold text-white">
                      {game.nome}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-card px-3 py-2 text-sm text-nova-textMuted"
        >
          {"<"} Anterior
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-blue px-3 py-2 text-sm text-white"
        >
          1
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-card px-3 py-2 text-sm text-nova-textMuted"
        >
          2
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-card px-3 py-2 text-sm text-nova-textMuted"
        >
          3
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-card px-3 py-2 text-sm text-nova-textMuted"
        >
          ...
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-card px-3 py-2 text-sm text-nova-textMuted"
        >
          8
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-nova-card px-3 py-2 text-sm text-nova-textMuted"
        >
          Próximo {">"}
        </button>
      </div>
    </SiteShell>
  );
}

