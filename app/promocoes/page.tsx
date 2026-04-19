"use client";

import { useState } from "react";

import SiteShell from "@/components/layout/SiteShell";

const filtros = ["Todas", "Bônus de Depósito", "Rodadas Grátis", "Cashback", "Torneios"];

const promocoes = [
  {
    id: 1,
    emoji: "🎰",
    titulo: "Bônus de Boas-vindas",
    subtitulo: "200% até R$2.000",
    gradient: "from-nova-bg to-nova-card",
    badge: "POPULAR",
    badgeClass: "bg-nova-blue/90"
  },
  {
    id: 2,
    emoji: "✈️",
    titulo: "Bônus Aviator",
    subtitulo: "Aposte e ganhe 50 rodadas",
    gradient: "from-nova-card to-nova-elevated",
    badge: "NOVO",
    badgeClass: "bg-nova-blue/90"
  },
  {
    id: 3,
    emoji: "💰",
    titulo: "Cashback Semanal",
    subtitulo: "10% de volta todo domingo",
    gradient: "from-nova-card to-nova-elevated",
    badge: "POPULAR",
    badgeClass: "bg-nova-blue/90"
  },
  {
    id: 4,
    emoji: "🏆",
    titulo: "Torneio Fortune Tiger",
    subtitulo: "Prêmio de R$80.000",
    gradient: "from-nova-card to-nova-elevated",
    badge: "LIMITADO",
    badgeClass: "bg-nova-ruby/90"
  },
  {
    id: 5,
    emoji: "👥",
    titulo: "Indique e Ganhe",
    subtitulo: "R$50 por amigo indicado",
    gradient: "from-nova-card to-nova-elevated",
    badge: "POPULAR",
    badgeClass: "bg-nova-blue/90"
  },
  {
    id: 6,
    emoji: "🎡",
    titulo: "Rodadas VIP",
    subtitulo: "500 rodadas grátis no fim de semana",
    gradient: "from-nova-card to-nova-elevated",
    badge: "NOVO",
    badgeClass: "bg-nova-blue/90"
  }
];

export default function PromocoesPage() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");

  return (
    <SiteShell
      withFooter
      contentClassName="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8"
    >
      <section className="rounded-3xl bg-gradient-to-r from-nova-bg via-nova-card to-nova-elevated px-8 py-10">
        <h1 className="text-4xl font-black text-white">🎁 Promoções</h1>
        <p className="mt-3 text-nova-textMuted">Aproveite nossas ofertas exclusivas</p>
      </section>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-max gap-3">
          {filtros.map((filtro) => {
            const ativo = filtro === filtroAtivo;

            return (
              <button
                key={filtro}
                type="button"
                onClick={() => setFiltroAtivo(filtro)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${
                  ativo
                    ? "bg-nova-blue text-white"
                    : "bg-nova-card text-nova-textMuted hover:bg-nova-card/40 hover:text-white"
                }`}
              >
                {filtro}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {promocoes.map((promocao) => (
          <article
            key={promocao.id}
            className={`relative flex h-[200px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${promocao.gradient} p-5`}
          >
            <div
              className={`w-fit rounded-full px-2 py-0.5 text-xs font-bold text-white ${promocao.badgeClass}`}
            >
              {promocao.badge}
            </div>

            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="text-[80px] leading-none">{promocao.emoji}</span>
              <h2 className="mt-4 text-xl font-bold text-white">{promocao.titulo}</h2>
              <p className="mt-1 text-sm text-nova-textMuted">{promocao.subtitulo}</p>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-nova-blue py-2.5 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
            >
              RESGATAR
            </button>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
