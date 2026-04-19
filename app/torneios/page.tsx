"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/SiteShell";

const abas = ["Ativos", "Em breve", "Finalizados", "Meus torneios"];

const torneios = [
  {
    id: 1,
    nome: "Aviator Masters",
    premio: "R$ 15.000",
    tempo: "3d 4h",
    participantes: "1.240 participantes",
    progresso: 68,
    gradient: "from-nova-card to-nova-elevated",
    status: "Ativos"
  },
  {
    id: 2,
    nome: "Spaceman Tournament",
    premio: "R$ 8.500",
    tempo: "5d 12h",
    participantes: "860 participantes",
    progresso: 45,
    gradient: "from-nova-bg to-nova-card",
    status: "Em breve"
  },
  {
    id: 3,
    nome: "Mines Challenge",
    premio: "R$ 5.200",
    tempo: "1d 6h",
    participantes: "2.100 participantes",
    progresso: 92,
    gradient: "from-nova-card to-nova-elevated",
    status: "Ativos"
  },
  {
    id: 4,
    nome: "Sweet Bonanza Rush",
    premio: "R$ 12.000",
    tempo: "7d",
    participantes: "540 participantes",
    progresso: 28,
    gradient: "from-nova-card to-nova-elevated",
    status: "Meus torneios"
  },
  {
    id: 5,
    nome: "Crash Royale",
    premio: "R$ 25.000",
    tempo: "2d 18h",
    participantes: "1.780 participantes",
    progresso: 75,
    gradient: "from-nova-card to-nova-elevated",
    status: "Ativos"
  },
  {
    id: 6,
    nome: "Roleta Dourada",
    premio: "R$ 10.000",
    tempo: "4d 8h",
    participantes: "920 participantes",
    progresso: 55,
    gradient: "from-nova-card to-nova-elevated",
    status: "Finalizados"
  }
];

const leaderboard = [
  { posicao: 1, jogador: "Car***", pontos: "12.840", premio: "R$ 18.000" },
  { posicao: 2, jogador: "Ana***", pontos: "11.920", premio: "R$ 10.000" },
  { posicao: 3, jogador: "Ped***", pontos: "10.880", premio: "R$ 6.000" },
  { posicao: 4, jogador: "Mar***", pontos: "9.750", premio: "R$ 4.500" },
  { posicao: 5, jogador: "Gui***", pontos: "9.320", premio: "R$ 3.000" },
  { posicao: 6, jogador: "Lui***", pontos: "8.910", premio: "R$ 2.500" },
  { posicao: 7, jogador: "Bia***", pontos: "8.440", premio: "R$ 2.000" },
  { posicao: 8, jogador: "Raf***", pontos: "7.980", premio: "R$ 1.500" },
  { posicao: 9, jogador: "Jul***", pontos: "7.560", premio: "R$ 1.000" },
  { posicao: 10, jogador: "Thi***", pontos: "7.210", premio: "R$ 800" }
];

export default function TorneiosPage() {
  const [abaAtiva, setAbaAtiva] = useState("Ativos");

  const torneiosFiltrados = useMemo(() => {
    if (abaAtiva === "Ativos") {
      return torneios.filter((torneio) => torneio.status === "Ativos");
    }

    return torneios.filter((torneio) => torneio.status === abaAtiva);
  }, [abaAtiva]);

  return (
    <SiteShell
      withFooter
      contentClassName="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8"
    >
      <section className="rounded-3xl bg-gradient-to-r from-nova-bg via-nova-card to-nova-elevated px-8 py-10">
        <h1 className="text-4xl font-black text-white">🏆 Torneios</h1>
        <p className="mt-3 text-nova-textMuted">Compita e ganhe prêmios gigantes</p>
        <p className="mt-4 text-xl font-bold text-nova-blueBright">R$ 420.000 em prêmios disponíveis</p>
      </section>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-max gap-3">
          {abas.map((aba) => (
            <button
              key={aba}
              type="button"
              onClick={() => setAbaAtiva(aba)}
              className={`rounded-xl px-5 py-2 text-sm transition-colors ${
                abaAtiva === aba
                  ? "bg-nova-blue text-white"
                  : "bg-nova-card text-nova-textMuted hover:bg-nova-card/40 hover:text-white"
              }`}
            >
              {aba}
            </button>
          ))}
        </div>
      </div>

      <section className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-nova-bg via-nova-card to-nova-elevated">
        <div className="flex flex-col justify-between gap-6 p-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-nova-blueBright">
              🔥 TORNEIO EM DESTAQUE
            </span>
            <h2 className="mt-4 text-4xl font-black text-white">FORTUNE TIGER SHOWDOWN</h2>
            <p className="mt-4 bg-gradient-to-r from-nova-blue to-nova-blueBright bg-clip-text text-5xl font-black text-transparent">
              R$ 80.000
            </p>
            <p className="mt-3 text-sm font-semibold text-nova-blueBright">Termina em 02d 14h 38m</p>
            <button
              type="button"
              className="mt-6 rounded-xl bg-nova-blue px-8 py-3 font-bold text-white transition-colors hover:bg-nova-blueLight"
            >
              PARTICIPAR AGORA
            </button>
          </div>

          <div className="text-center text-[200px] leading-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]">
            🐯
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {torneiosFiltrados.map((torneio) => (
          <article
            key={torneio.id}
            className="overflow-hidden rounded-xl border border-nova-card bg-nova-card"
          >
            <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${torneio.gradient}`}>
              <span className="text-6xl">
                {torneio.nome.includes("Aviator")
                  ? "✈️"
                  : torneio.nome.includes("Spaceman")
                    ? "🚀"
                    : torneio.nome.includes("Mines")
                      ? "💣"
                      : torneio.nome.includes("Sweet")
                        ? "🍬"
                        : torneio.nome.includes("Crash")
                          ? "📈"
                          : "🎡"}
              </span>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <h3 className="text-lg font-bold text-white">{torneio.nome}</h3>
                <p className="mt-1 text-sm text-nova-textMuted">{torneio.participantes}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-nova-card p-3">
                  <p className="text-xs text-nova-textMuted">Prêmio</p>
                  <p className="mt-1 font-bold text-nova-blueBright">{torneio.premio}</p>
                </div>
                <div className="rounded-xl bg-nova-card p-3">
                  <p className="text-xs text-nova-textMuted">Tempo restante</p>
                  <p className="mt-1 font-bold text-white">{torneio.tempo}</p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs text-nova-textMuted">
                  <span>Participação</span>
                  <span>{torneio.progresso}%</span>
                </div>
                <div className="h-2 rounded-full bg-nova-card">
                  <div
                    className="h-full rounded-full bg-nova-blue"
                    style={{ width: `${torneio.progresso}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-nova-blue py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
              >
                Participar
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-nova-card bg-nova-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Leaderboard do Torneio</h2>
            <p className="mt-1 text-sm text-nova-textMuted">
              Top 10 jogadores do Fortune Tiger Showdown
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-nova-border">
          <div className="grid grid-cols-4 bg-nova-card px-4 py-3 text-xs uppercase tracking-widest text-nova-textMuted">
            <span>Posição</span>
            <span>Jogador</span>
            <span>Pontos</span>
            <span>Prêmio</span>
          </div>

          {leaderboard.map((linha) => {
            const destaque =
              linha.posicao === 1
                ? "bg-nova-blue/12"
                : linha.posicao === 2
                  ? "bg-nova-blue/8"
                  : linha.posicao === 3
                    ? "bg-nova-elevated/80"
                    : "bg-transparent";

            return (
              <div
                key={linha.posicao}
                className={`grid grid-cols-4 border-t border-nova-border px-4 py-3 text-sm ${destaque}`}
              >
                <span className="font-bold text-white">{linha.posicao}</span>
                <span className="text-nova-text">{linha.jogador}</span>
                <span className="text-nova-text">{linha.pontos}</span>
                <span className="font-semibold text-nova-blueBright">{linha.premio}</span>
              </div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}

