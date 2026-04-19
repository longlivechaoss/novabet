"use client";

import BannerPromocional from "@/components/home/BannerPromocional";
import BannerSection from "@/components/home/BannerSection";
import CarrosselJogos from "@/components/home/CarrosselJogos";
import EsportesSection from "@/components/home/EsportesSection";
import Provedores from "@/components/home/Provedores";
import CheckInDiario from "@/components/engagement/CheckInDiario";
import SiteShell from "@/components/layout/SiteShell";
import MobileSearchBar from "@/components/home/MobileSearchBar";
import WinnersTicker from "@/components/layout/WinnersTicker";

const recomendados = [
  {
    id: 1,
    nome: "Fortune Tiger",
    imagem: "/images/jogos/ftg.webp",
    badge: "HOT" as const,
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 2,
    nome: "Crazy Time",
    imagem: "/images/jogos/crazy-time.webp",
    badge: "NOVO" as const,
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 3,
    nome: "Lightning Roulette",
    imagem: "/images/jogos/lightning-roulette.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 4,
    nome: "Monopoly Live",
    imagem: "/images/jogos/monopoly-live.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 5,
    nome: "Mega Ball",
    imagem: "/images/jogos/mega-ball.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 6,
    nome: "Dream Catcher",
    imagem: "/images/jogos/dream-catcher.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 7,
    nome: "Funky Time",
    imagem: "/images/jogos/funky-time.webp",
    badge: "TOP" as const,
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 8,
    nome: "Lightning Storm",
    imagem: "/images/jogos/lightning-storm.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 9,
    nome: "Crazy Balls",
    imagem: "/images/jogos/crazy-balls.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 10,
    nome: "Football Studio",
    imagem: "/images/jogos/football-studio.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 11,
    nome: "Lightning Blackjack",
    imagem: "/images/jogos/lightning-blackjack.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 12,
    nome: "Double Ball Roulette",
    imagem: "/images/jogos/double-ball-roulette.webp",
    gradient: "from-nova-card to-nova-elevated"
  }
];

const emAlta = [
  {
    id: 1,
    nome: "Aviator",
    imagem: "/images/jogos/aviatrix.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 2,
    nome: "Gravity Plinko",
    imagem: "/images/jogos/gravity-plinko.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 3,
    nome: "Crash Live",
    imagem: "/images/jogos/crash-live.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 4,
    nome: "Big Cash Strike",
    imagem: "/images/jogos/big-cash-strike.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 5,
    nome: "Extra Chilli",
    imagem: "/images/jogos/extra-chilli.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 6,
    nome: "Red Door Roulette",
    imagem: "/images/jogos/red-door-roulette.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 7,
    nome: "Stock Market",
    imagem: "/images/jogos/stock-market.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 8,
    nome: "War",
    imagem: "/images/jogos/war.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 9,
    nome: "Balloon Race",
    imagem: "/images/jogos/balloon-race.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 10,
    nome: "Gravity Roulette",
    imagem: "/images/jogos/gravity-roulette.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 11,
    nome: "Hot Slot Magic Pearls",
    imagem: "/images/jogos/hot-slot-magic-pearls.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 12,
    nome: "Mice and Magic",
    imagem: "/images/jogos/mice-and-magic.webp",
    gradient: "from-nova-card to-nova-elevated"
  }
];

const cpGames = [
  {
    id: 1,
    nome: "Dork Unit",
    imagem: "/images/jogos/dork-unit.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 2,
    nome: "Le Bandit",
    imagem: "/images/jogos/le-bandit.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 3,
    nome: "Donny Dough",
    imagem: "/images/jogos/donny-dough.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 4,
    nome: "Rip City",
    imagem: "/images/jogos/rip-city.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 5,
    nome: "Dead or Alive",
    imagem: "/images/jogos/dead-or-alive.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 6,
    nome: "Money Cart 2",
    imagem: "/images/jogos/money-cart-2.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 7,
    nome: "Money Train 4",
    imagem: "/images/jogos/money-train-4.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 8,
    nome: "Speed Winner",
    imagem: "/images/jogos/speed-winner.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 9,
    nome: "Book of Ra",
    imagem: "/images/jogos/book-of-ra.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 10,
    nome: "Luxor Gold",
    imagem: "/images/jogos/luxor-gold.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 11,
    nome: "Coin Strike",
    imagem: "/images/jogos/coin-strike.webp",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 12,
    nome: "Thunder Coins",
    imagem: "/images/jogos/thunder-coins.webp",
    gradient: "from-nova-card to-nova-elevated"
  }
];

export default function HomePage() {
  return (
    <SiteShell
      withFooter
      autoOpenCadastro
      contentClassName="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 lg:px-8"
    >
      {({ isLogado }) => (
        <>
          <WinnersTicker />
          {isLogado ? <CheckInDiario /> : null}
          <BannerSection />
          <MobileSearchBar />
          <Provedores />
          <CarrosselJogos titulo="Recomendados" jogos={recomendados} mostrarBadges />
          <CarrosselJogos titulo="Em Alta" jogos={emAlta} />
          <CarrosselJogos titulo="Jogos CP Games" jogos={cpGames} />
          <BannerPromocional />
          <EsportesSection />
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-nova-blue/50 to-transparent" />
        </>
      )}
    </SiteShell>
  );
}
