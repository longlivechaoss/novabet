"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import SiteShell from "@/components/layout/SiteShell";

type Evento = {
  id: number;
  esporte: string;
  categoria: string;
  regiao: string;
  liga: string;
  status: "ao vivo" | "agendado";
  tempo: string;
  time1: { nome: string; placar: number | null };
  time2: { nome: string; placar: number | null };
  odds: { casa: number; empate: number | null; fora: number };
  mercados: number;
};

type SelecaoMercado = "casa" | "empate" | "fora";
type TipoBoletim = "SIMPLES" | "MÚLTIPLA" | "SISTEMA";

type ApostaSelecionada = {
  eventoId: number;
  jogo: string;
  mercado: string;
  odd: number;
  selecao: SelecaoMercado;
};

type IconeTopo = {
  id: string;
  icon: string;
  label: string;
  badge?: number;
  tipo: "atalho" | "esporte";
};

const iconesTopo: IconeTopo[] = [
  { id: "inicio", icon: "🏠", label: "Início", tipo: "atalho" },
  { id: "aovivo", icon: "🔴", label: "Ao Vivo", badge: 6, tipo: "atalho" },
  { id: "favoritos", icon: "⭐", label: "Favoritos", badge: 2, tipo: "atalho" },
  { id: "boletim", icon: "📋", label: "Boletim", tipo: "atalho" },
  { id: "Futebol", icon: "⚽", label: "Futebol", tipo: "esporte" },
  { id: "Basquetebol", icon: "🏀", label: "Basquetebol", tipo: "esporte" },
  { id: "Tênis", icon: "🎾", label: "Tênis", tipo: "esporte" },
  { id: "Hóquei no Gelo", icon: "🏒", label: "Hóquei", tipo: "esporte" },
  { id: "Basebol", icon: "⚾", label: "Basebol", tipo: "esporte" },
  { id: "eFutebol", icon: "🎮", label: "eFutebol", tipo: "esporte" },
  { id: "eBasquetebol", icon: "🕹️", label: "eBasquete", tipo: "esporte" },
  { id: "Counter-Strike", icon: "🔫", label: "CS", tipo: "esporte" },
  { id: "Dota 2", icon: "⚔️", label: "Dota 2", tipo: "esporte" },
  { id: "League of Legends", icon: "🏆", label: "LoL", tipo: "esporte" },
  { id: "Turfe", icon: "🐎", label: "Turfe", tipo: "esporte" },
  { id: "MMA", icon: "🥋", label: "MMA", tipo: "esporte" },
  { id: "Futebol Americano", icon: "🏈", label: "Futebol Americano", tipo: "esporte" },
  { id: "Críquete", icon: "🏏", label: "Críquete", tipo: "esporte" },
  { id: "Vôlei", icon: "🏐", label: "Vôlei", tipo: "esporte" },
  { id: "Fórmula 1", icon: "🏎️", label: "F1", tipo: "esporte" },
  { id: "Tênis de Mesa", icon: "🏓", label: "Tênis de Mesa", tipo: "esporte" },
  { id: "Handebol", icon: "🤾", label: "Handebol", tipo: "esporte" },
  { id: "Boxe", icon: "🥊", label: "Boxe", tipo: "esporte" },
  { id: "Rugby", icon: "🏉", label: "Rugby", tipo: "esporte" },
  { id: "Dardos", icon: "🎯", label: "Dardos", tipo: "esporte" }
];

const abasSecundarias = [
  "🎯 Jogos em Destaque",
  "🔮 Predictions",
  "🏗️ Criador de Eventos"
];

const banners = [
  {
    id: 1,
    title: "FIRST BET BONUS",
    subtitle: "Aposte e ganhe um FreeBet",
    gradient: "from-nova-bg via-nova-card to-nova-elevated",
    emoji: "⚽🏈"
  },
  {
    id: 2,
    title: "PAYBACK MONDAY",
    subtitle: "Receba seu FreeBet toda segunda",
    gradient: "from-nova-bg via-nova-card to-nova-elevated",
    emoji: "🏆"
  },
  {
    id: 3,
    title: "3+1 E-SPORTS",
    subtitle: "PROMO",
    gradient: "from-nova-card via-nova-elevated to-nova-blue/50",
    emoji: "🎮🔫"
  },
  {
    id: 4,
    title: "CLOSE TO WIN",
    subtitle: "COMBO CASHBACK",
    gradient: "from-nova-bg via-nova-card to-nova-blue/60",
    emoji: "✅✅✅❌"
  }
];

const esportesPopulares = [
  { id: "Futebol", icon: "⚽", label: "Futebol" },
  { id: "Basquetebol", icon: "🏀", label: "Basquetebol" },
  { id: "Tênis", icon: "🎾", label: "Tênis" },
  { id: "Hóquei no Gelo", icon: "🏒", label: "Hóquei no Gelo" },
  { id: "Basebol", icon: "⚾", label: "Basebol" },
  { id: "eFutebol", icon: "🎮", label: "eFutebol" },
  { id: "eBasquetebol", icon: "🕹️", label: "eBasquetebol" },
  { id: "Counter-Strike", icon: "🔫", label: "Counter-Strike" },
  { id: "Dota 2", icon: "⚔️", label: "Dota 2" },
  { id: "League of Legends", icon: "🏆", label: "League of Legends" },
  { id: "Boxe", icon: "🥊", label: "Boxe" },
  { id: "Dardos", icon: "🎯", label: "Dardos" }
];

const eventos: Evento[] = [
  {
    id: 1,
    esporte: "⚽",
    categoria: "Futebol",
    regiao: "Internacional",
    liga: "Liga Europa UEFA",
    status: "ao vivo",
    tempo: "48' 2ª parte",
    time1: { nome: "Real Bétis", placar: 2 },
    time2: { nome: "SC Braga", placar: 1 },
    odds: { casa: 1.25, empate: 5.0, fora: 17.0 },
    mercados: 42
  },
  {
    id: 2,
    esporte: "⚽",
    categoria: "Futebol",
    regiao: "Internacional",
    liga: "Liga Conferência",
    status: "ao vivo",
    tempo: "48' 2ª parte",
    time1: { nome: "AEK Atenas", placar: 2 },
    time2: { nome: "Rayo Vallecano", placar: 0 },
    odds: { casa: 1.05, empate: 10.0, fora: 40.0 },
    mercados: 38
  },
  {
    id: 3,
    esporte: "⚽",
    categoria: "Futebol",
    regiao: "Inglaterra",
    liga: "Premier League",
    status: "agendado",
    tempo: "Hoje 20:30",
    time1: { nome: "Manchester United", placar: null },
    time2: { nome: "Liverpool", placar: null },
    odds: { casa: 2.8, empate: 3.4, fora: 2.45 },
    mercados: 156
  },
  {
    id: 4,
    esporte: "⚽",
    categoria: "Futebol",
    regiao: "Brasil",
    liga: "Brasileirão",
    status: "agendado",
    tempo: "Hoje 21:00",
    time1: { nome: "Flamengo", placar: null },
    time2: { nome: "Palmeiras", placar: null },
    odds: { casa: 2.15, empate: 3.2, fora: 3.5 },
    mercados: 128
  },
  {
    id: 5,
    esporte: "🏀",
    categoria: "Basquetebol",
    regiao: "Estados Unidos",
    liga: "NBA",
    status: "ao vivo",
    tempo: "48' 2ª parte",
    time1: { nome: "Lakers", placar: 87 },
    time2: { nome: "Warriors", placar: 92 },
    odds: { casa: 2.1, empate: null, fora: 1.75 },
    mercados: 64
  },
  {
    id: 6,
    esporte: "🎾",
    categoria: "Tênis",
    regiao: "Internacional",
    liga: "ATP Masters",
    status: "ao vivo",
    tempo: "48' 2ª parte",
    time1: { nome: "Carlos Alcaraz", placar: 1 },
    time2: { nome: "Novak Djokovic", placar: 0 },
    odds: { casa: 1.65, empate: null, fora: 2.25 },
    mercados: 28
  },
  {
    id: 7,
    esporte: "⚽",
    categoria: "Futebol",
    regiao: "Internacional",
    liga: "Liga dos Campeões",
    status: "agendado",
    tempo: "Amanhã 17:00",
    time1: { nome: "Real Madrid", placar: null },
    time2: { nome: "Bayern Munich", placar: null },
    odds: { casa: 2.3, empate: 3.5, fora: 2.85 },
    mercados: 184
  },
  {
    id: 8,
    esporte: "⚽",
    categoria: "Futebol",
    regiao: "Espanha",
    liga: "La Liga",
    status: "agendado",
    tempo: "Amanhã 16:30",
    time1: { nome: "Barcelona", placar: null },
    time2: { nome: "Atlético Madrid", placar: null },
    odds: { casa: 1.85, empate: 3.6, fora: 4.2 },
    mercados: 142
  },
  {
    id: 9,
    esporte: "🎮",
    categoria: "eFutebol",
    regiao: "eSports",
    liga: "eFutebol Pro",
    status: "agendado",
    tempo: "Hoje 22:15",
    time1: { nome: "Alpha FC", placar: null },
    time2: { nome: "Phoenix Club", placar: null },
    odds: { casa: 1.9, empate: 3.9, fora: 3.3 },
    mercados: 24
  }
];

const coresBrasao: Record<string, string> = {
  "Real Bétis": "bg-[#304C98]",
  "SC Braga": "bg-[#223A77]",
  "AEK Atenas": "bg-[#3A5EAF]",
  "Rayo Vallecano": "bg-[#2B4A9A]",
  "Manchester United": "bg-[#3658AA]",
  Liverpool: "bg-[#243A78]",
  Flamengo: "bg-[#3150A0]",
  Palmeiras: "bg-[#274185]",
  Lakers: "bg-[#456BC5]",
  Warriors: "bg-[#3656A8]",
  "Carlos Alcaraz": "bg-[#2C4B95]",
  "Novak Djokovic": "bg-[#223567]",
  "Real Madrid": "bg-[#5B82DB]",
  "Bayern Munich": "bg-[#3658AA]",
  Barcelona: "bg-[#3C60B5]",
  "Atlético Madrid": "bg-nova-border",
  "Alpha FC": "bg-nova-card",
  "Phoenix Club": "bg-[#2F4E9D]"
};

function formatarOdd(odd: number) {
  return odd.toFixed(2);
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function obterMercadoLabel(evento: Evento, selecao: SelecaoMercado) {
  if (selecao === "casa") {
    return evento.odds.empate === null ? `Vencedor — ${evento.time1.nome}` : `1x2 — ${evento.time1.nome}`;
  }

  if (selecao === "empate") {
    return "1x2 — Empate";
  }

  return evento.odds.empate === null ? `Vencedor — ${evento.time2.nome}` : `1x2 — ${evento.time2.nome}`;
}

function obterIniciais(nome: string) {
  const partes = nome.split(" ");

  if (partes.length === 1) {
    return nome.slice(0, 2).toUpperCase();
  }

  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
}

export default function EsportesPage() {
  const [topoAtivo, setTopoAtivo] = useState("Futebol");
  const [abaAtiva, setAbaAtiva] = useState("🎯 Jogos em Destaque");
  const [esporteAtivo, setEsporteAtivo] = useState("Futebol");
  const [favoritos, setFavoritos] = useState<number[]>([1, 3]);
  const [apostas, setApostas] = useState<ApostaSelecionada[]>([]);
  const [tipoBoletim, setTipoBoletim] = useState<TipoBoletim>("SIMPLES");
  const [valorAposta, setValorAposta] = useState(0);
  const [painelAberto, setPainelAberto] = useState(false);
  const painelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("filtro") === "aovivo") {
      setTopoAtivo("aovivo");
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        painelAberto &&
        painelRef.current &&
        event.target instanceof Node &&
        !painelRef.current.contains(event.target)
      ) {
        setPainelAberto(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [painelAberto]);

  const eventosFiltrados = useMemo(() => {
    if (topoAtivo === "favoritos") {
      return eventos.filter((evento) => favoritos.includes(evento.id));
    }

    if (topoAtivo === "aovivo") {
      return eventos.filter((evento) => evento.status === "ao vivo");
    }

    return eventos.filter((evento) => evento.categoria === esporteAtivo);
  }, [esporteAtivo, favoritos, topoAtivo]);

  const oddTotal = useMemo(() => {
    if (apostas.length === 0) {
      return 0;
    }

    return apostas.reduce((total, aposta) => total * aposta.odd, 1);
  }, [apostas]);

  const retornoTotal = useMemo(() => {
    if (!valorAposta || !oddTotal) {
      return 0;
    }

    return valorAposta * oddTotal;
  }, [oddTotal, valorAposta]);

  function toggleFavorito(eventoId: number) {
    setFavoritos((atual) =>
      atual.includes(eventoId) ? atual.filter((id) => id !== eventoId) : [...atual, eventoId]
    );
  }

  function handleTopoClick(item: IconeTopo) {
    if (item.id === "boletim") {
      setPainelAberto(true);
      return;
    }

    if (item.id === "inicio") {
      setTopoAtivo("Futebol");
      setEsporteAtivo("Futebol");
      return;
    }

    if (item.id === "aovivo" || item.id === "favoritos") {
      setTopoAtivo(item.id);
      return;
    }

    if (item.tipo === "esporte") {
      setTopoAtivo(item.id);
      setEsporteAtivo(item.id);
    }
  }

  function selecionarOdd(evento: Evento, selecao: SelecaoMercado, odd: number | null) {
    if (!odd) {
      return;
    }

    setApostas((atual) => {
      const existente = atual.find((item) => item.eventoId === evento.id);

      if (existente?.selecao === selecao) {
        return atual.filter((item) => !(item.eventoId === evento.id && item.selecao === selecao));
      }

      const novaAposta: ApostaSelecionada = {
        eventoId: evento.id,
        jogo: `${evento.time1.nome} x ${evento.time2.nome}`,
        mercado: obterMercadoLabel(evento, selecao),
        odd,
        selecao
      };

      if (existente) {
        return atual.map((item) => (item.eventoId === evento.id ? novaAposta : item));
      }

      return [...atual, novaAposta];
    });
  }

  function removerAposta(eventoId: number) {
    setApostas((atual) => atual.filter((item) => item.eventoId !== eventoId));
  }

  function renderBoletimContent() {
    return (
      <div className="flex max-h-[70vh] flex-col">
        <div className="flex items-center justify-between border-b border-nova-card px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">🎟️ Boletim</h2>
            <p className="mt-1 text-xs text-nova-textMuted">
              {apostas.length} {apostas.length === 1 ? "seleção" : "seleções"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPainelAberto(false)}
            className="flex h-8 w-8 items-center justify-center !rounded-full bg-white/10 text-sm text-white transition hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {apostas.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <span className="text-6xl opacity-20">🎯</span>
              <p className="mt-4 text-sm text-nova-textMuted">Nenhuma aposta selecionada</p>
              <p className="mt-2 text-xs text-nova-textMuted">
                Clique nas odds para adicionar apostas
              </p>
            </div>
          ) : (
            apostas.map((aposta) => (
              <div key={aposta.eventoId} className="mb-2 rounded-xl bg-nova-elevated p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-nova-textMuted">{aposta.jogo}</p>
                    <p className="mt-1 text-sm text-white">{aposta.mercado}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerAposta(aposta.eventoId)}
                    className="text-sm text-nova-textMuted transition hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-3 text-right text-lg font-bold text-nova-green">
                  {formatarOdd(aposta.odd)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-nova-card px-5 py-4">
          <div className="rounded-xl bg-nova-card p-1">
            <div className="flex gap-1">
              {(["SIMPLES", "MÚLTIPLA", "SISTEMA"] as TipoBoletim[]).map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setTipoBoletim(tipo)}
                  className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition ${
                    tipoBoletim === tipo
                      ? "bg-nova-blue text-white"
                      : "text-nova-textMuted hover:text-white"
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs text-nova-textMuted">Valor da aposta</label>
            <input
              type="text"
              value={formatarMoeda(valorAposta)}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "");
                setValorAposta(digits ? Number(digits) / 100 : 0);
              }}
              className="mt-2 w-full rounded-xl border border-nova-card bg-nova-elevated px-3 py-2 text-sm text-white focus:border-nova-blue focus:outline-none"
            />
            <div className="mt-2 flex gap-2">
              {[10, 50, 100].map((valor) => (
                <button
                  key={valor}
                  type="button"
                  onClick={() => setValorAposta(valor)}
                  className="flex-1 rounded-xl border border-nova-card bg-nova-card py-2 text-xs font-semibold text-white transition hover:border-nova-blue"
                >
                  {formatarMoeda(valor)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-nova-textMuted">Odd total:</span>
              <span className="font-bold text-white">{oddTotal ? formatarOdd(oddTotal) : "-"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-nova-textMuted">Retorno:</span>
              <span className="text-lg font-bold text-nova-green">{formatarMoeda(retornoTotal)}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={apostas.length === 0}
            className={`mt-4 w-full rounded-xl py-3 font-bold transition ${
              apostas.length === 0
                ? "cursor-not-allowed bg-nova-border text-nova-textMuted"
                : "bg-nova-blue text-white hover:bg-nova-blueLight"
            }`}
          >
            APOSTAR AGORA
          </button>
        </div>
      </div>
    );
  }

  return (
    <SiteShell
      rawContent
      mainClassName="min-h-screen pb-24 transition-all duration-300"
      withFooter={false}
    >
      <div className="min-h-screen bg-nova-bg">
        <div className="mb-6 border-b border-nova-card py-3">
          <div className="flex items-center gap-3 px-4">
            <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
              {iconesTopo.map((item) => {
                const ativo = topoAtivo === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTopoClick(item)}
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-b-2 text-2xl transition-all ${
                      ativo
                        ? "border-nova-blue bg-nova-blue/30 opacity-100"
                        : "border-transparent opacity-60 hover:bg-nova-card/30 hover:opacity-100"
                    }`}
                    title={item.label}
                  >
                    <span>{item.icon}</span>
                    {item.badge ? (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-nova-ruby text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl opacity-60 transition-all hover:bg-nova-card/30 hover:opacity-100"
            >
              🔍
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-3 px-6">
          {abasSecundarias.map((aba) => {
            const ativa = aba === abaAtiva;

            return (
              <button
                key={aba}
                type="button"
                onClick={() => setAbaAtiva(aba)}
                className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all ${
                  ativa
                    ? "border-nova-blue/50 bg-nova-blue/30 text-white"
                    : "border-nova-card bg-nova-card text-nova-textMuted hover:text-white"
                }`}
              >
                {aba}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 px-6 py-6 md:grid-cols-2 2xl:grid-cols-4">
          {banners.map((banner) => (
            <button
              key={banner.id}
              type="button"
              className={`relative h-40 overflow-hidden rounded-xl bg-gradient-to-br ${banner.gradient} p-5 text-left transition-transform hover:scale-[1.02]`}
            >
              <div className="relative z-10 max-w-[70%]">
                <h2 className="text-2xl font-black text-white">{banner.title}</h2>
                <p className="mt-2 text-xs text-nova-blueBright">{banner.subtitle}</p>
              </div>
              <div className="absolute bottom-3 right-4 text-4xl opacity-90">{banner.emoji}</div>
            </button>
          ))}
        </div>

        <h2 className="mb-4 px-6 text-xl font-bold text-white">👑 Popular</h2>
        <div className="mb-6 flex gap-2 overflow-x-auto px-6 pb-2">
          {esportesPopulares.map((item) => {
            const ativo = esporteAtivo === item.id && topoAtivo !== "favoritos" && topoAtivo !== "aovivo";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setEsporteAtivo(item.id);
                  setTopoAtivo(item.id);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  ativo
                    ? "bg-nova-blue text-white"
                    : "border border-nova-card bg-nova-card text-nova-textMuted hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 px-6 pb-24 md:grid-cols-2 2xl:grid-cols-3">
          {eventosFiltrados.map((evento) => {
            const oddsDisponiveis = [
              { chave: "casa" as const, label: "1", odd: evento.odds.casa },
              ...(evento.odds.empate !== null
                ? [{ chave: "empate" as const, label: "X", odd: evento.odds.empate }]
                : []),
              { chave: "fora" as const, label: "2", odd: evento.odds.fora }
            ];

            const apostaAtual = apostas.find((item) => item.eventoId === evento.id);

            return (
              <article
                key={evento.id}
                className="overflow-hidden rounded-xl border border-nova-card bg-nova-card p-4 transition-all hover:border-nova-blue/50"
              >
                <div className="mb-3 flex items-center justify-between border-b border-nova-card pb-3">
                  <div className="flex items-center gap-2 text-xs text-nova-textMuted">
                    <span>{evento.esporte}</span>
                    <span>{evento.regiao} · {evento.liga}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-nova-blue">
                    <span>👤</span>
                    <span>💰</span>
                    {evento.status === "ao vivo" ? <span className="text-nova-ruby">🔴</span> : null}
                  </div>
                </div>

                {evento.status === "ao vivo" ? (
                  <p className="mb-2 text-xs font-semibold text-nova-blue">{evento.tempo}</p>
                ) : null}

                <div className="mb-3 flex flex-col gap-2">
                  {[evento.time1, evento.time2].map((time) => (
                    <div key={time.nome} className="flex items-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center !rounded-full text-[10px] font-bold text-white ${coresBrasao[time.nome] ?? "bg-nova-card"}`}
                      >
                        {obterIniciais(time.nome)}
                      </div>
                      <span className="flex-1 text-sm text-white">{time.nome}</span>
                      {evento.status === "ao vivo" && time.placar !== null ? (
                        <span className="text-base font-bold text-white">{time.placar}</span>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div>
                  <p className="mb-2 text-xs text-nova-textMuted">1x2</p>
                  <div className="flex gap-2">
                    <div
                      className={`grid flex-1 gap-2 ${
                        oddsDisponiveis.length === 3 ? "grid-cols-3" : "grid-cols-2"
                      }`}
                    >
                      {oddsDisponiveis.map((odd) => {
                        const selecionado = apostaAtual?.selecao === odd.chave;

                        return (
                          <button
                            key={odd.chave}
                            type="button"
                            onClick={() => selecionarOdd(evento, odd.chave, odd.odd)}
                            className={`rounded-xl border py-2 transition ${
                              selecionado
                                ? "border-nova-blueBright bg-nova-blue"
                                : "border-transparent bg-nova-card hover:border-nova-blue hover:bg-nova-card/30"
                            }`}
                          >
                            <div className="text-xs text-nova-textMuted">{odd.label}</div>
                            <div className="mt-1 text-base font-bold text-white">
                              {formatarOdd(odd.odd)}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorito(evento.id)}
                      className="flex w-8 shrink-0 items-center justify-center rounded-r-lg border-l border-nova-card bg-nova-card text-nova-textMuted transition hover:text-white"
                      title={favoritos.includes(evento.id) ? "Remover dos favoritos" : "Favoritar"}
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <AnimatePresence>
          {painelAberto ? (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPainelAberto(false)}
              />
              <motion.div
                ref={painelRef}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.22 }}
                className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] max-w-96 overflow-hidden rounded-2xl border border-nova-card bg-nova-card shadow-2xl"
              >
                {renderBoletimContent()}
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          onClick={() => setPainelAberto((current) => !current)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-nova-blue px-6 py-3 text-white shadow-xl shadow-nova-blue/30 transition-colors hover:bg-nova-blueLight"
        >
          <span className="font-bold">🎟️ Boletim</span>
          <span className="h-6 w-px bg-white/20" />
          <span className="text-xs font-semibold opacity-80">APOSTA RÁPIDA</span>
          <span className="text-sm">▲</span>
          {apostas.length > 0 ? (
            <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-nova-ruby px-1 text-xs font-bold">
              {apostas.length}
            </span>
          ) : null}
        </motion.button>
      </div>
    </SiteShell>
  );
}

