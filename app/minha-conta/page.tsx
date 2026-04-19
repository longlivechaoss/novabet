"use client";

import Image from "next/image";
import { useState } from "react";

import SiteShell from "@/components/layout/SiteShell";

const historicoSubAbas = ["Depósitos", "Saques", "Apostas"];

const historicoLinhas = [
  ["16/04/2026", "Depósito", "R$ 100,00", "✅ Concluído"],
  ["15/04/2026", "Aviator", "R$ 45,00", "🎉 Ganho"],
  ["14/04/2026", "Saque", "R$ 250,00", "✅ Concluído"],
  ["13/04/2026", "Fortune Tiger", "R$ 32,00", "🕒 Em análise"],
  ["12/04/2026", "Depósito", "R$ 500,00", "✅ Concluído"]
];

const favoritos = [
  "Fortune Tiger",
  "Aviator",
  "Spaceman",
  "Mines",
  "Sweet Bonanza",
  "Crash"
];

const abas = ["Perfil", "Histórico", "Favoritos", "Segurança"] as const;

export default function MinhaContaPage() {
  const [abaAtiva, setAbaAtiva] = useState<(typeof abas)[number]>("Perfil");
  const [historicoAtivo, setHistoricoAtivo] = useState("Depósitos");
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <SiteShell initialLoggedIn contentClassName="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-nova-card p-6 md:flex-row md:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-nova-blue text-3xl font-bold text-white">
          T
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Thiago</h1>
          <p className="mt-1 text-nova-textMuted">thiago@exemplo.com</p>
        </div>
        <div className="w-fit rounded-full border border-nova-blue/40 bg-nova-blue/15 px-3 py-1 text-xs text-nova-blueBright">
          🏆 VIP PRATA
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Saldo", "R$ 1.250,00", "text-nova-green"],
          ["Total Apostado", "R$ 8.420,00", "text-white"],
          ["Total Ganho", "R$ 6.890,00", "text-white"],
          ["Bônus Ativos", "2 ativos", "text-white"]
        ].map(([titulo, valor, color]) => (
          <div
            key={titulo}
            className="rounded-xl border border-nova-card bg-nova-card p-5"
          >
            <p className="text-sm text-nova-textMuted">{titulo}</p>
            <p className={`mt-3 text-2xl font-bold ${color}`}>{valor}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-b border-nova-border">
        <div className="flex flex-wrap gap-6">
          {abas.map((aba) => (
            <button
              key={aba}
              type="button"
              onClick={() => setAbaAtiva(aba)}
              className={`border-b-2 pb-3 text-sm font-semibold transition ${
                abaAtiva === aba
                  ? "border-nova-blue text-white"
                  : "border-transparent text-nova-textMuted hover:text-white"
              }`}
            >
              {aba}
            </button>
          ))}
        </div>
      </div>

      {abaAtiva === "Perfil" ? (
        <div className="mt-8">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Nome completo",
              "E-mail",
              "CPF",
              "Telefone",
              "Data de nascimento",
              "Cidade",
              "Estado"
            ].map((campo) => (
              <input
                key={campo}
                type="text"
                placeholder={campo}
                className="rounded-xl border border-nova-card bg-nova-elevated px-4 py-3 text-sm text-white placeholder:text-nova-textMuted focus:border-nova-blue focus:outline-none"
              />
            ))}
          </div>
          <button
            type="button"
            className="mt-6 rounded-xl bg-nova-blue px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
          >
            SALVAR ALTERAÇÕES
          </button>
        </div>
      ) : null}

      {abaAtiva === "Histórico" ? (
        <div className="mt-8">
          <div className="mb-4 flex gap-3">
            {historicoSubAbas.map((aba) => (
              <button
                key={aba}
                type="button"
                onClick={() => setHistoricoAtivo(aba)}
                className={`rounded-xl px-4 py-2 text-sm ${
                  historicoAtivo === aba
                    ? "bg-nova-blue text-white"
                    : "bg-nova-card text-nova-textMuted"
                }`}
              >
                {aba}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border border-nova-card bg-nova-card">
            <div className="grid grid-cols-4 border-b border-nova-border px-4 py-3 text-xs uppercase tracking-wide text-nova-textMuted">
              <span>Data</span>
              <span>Tipo</span>
              <span>Valor</span>
              <span>Status</span>
            </div>
            {historicoLinhas.map((linha) => (
              <div
                key={`${historicoAtivo}-${linha[0]}-${linha[1]}`}
                className="grid grid-cols-4 px-4 py-3 text-sm text-nova-text border-b border-nova-border/50"
              >
                {linha.map((coluna) => (
                  <span key={coluna}>{coluna}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {abaAtiva === "Favoritos" ? (
        <div className="mt-8 grid grid-cols-6 gap-4">
          {favoritos.map((nome) => (
            <div
              key={nome}
              className="game-card-glow group relative overflow-hidden rounded-xl"
              style={{ aspectRatio: "368 / 496" }}
            >
              <Image src="/images/jogos/ftg.webp" alt={nome} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="rounded-xl bg-black/60 px-2 py-1 text-center text-xs font-semibold text-white">
                  {nome}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {abaAtiva === "Segurança" ? (
        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-nova-card bg-nova-card p-5">
            <h3 className="text-lg font-semibold text-white">Alterar senha</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {["Senha atual", "Nova senha", "Confirmar senha"].map((campo) => (
                <input
                  key={campo}
                  type="password"
                  placeholder={campo}
                  className="rounded-xl border border-nova-card bg-nova-elevated px-4 py-3 text-sm text-white placeholder:text-nova-textMuted"
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-4 rounded-xl bg-nova-blue px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
            >
              Salvar senha
            </button>
          </section>

          <section className="rounded-2xl border border-nova-card bg-nova-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Autenticação em 2 fatores</h3>
                <p className="mt-1 text-sm text-nova-textMuted">Adicione uma camada extra de segurança</p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactor((current) => !current)}
                className={`flex h-8 w-16 items-center !rounded-full px-1 transition ${
                  twoFactor ? "bg-nova-blue" : "bg-nova-border"
                }`}
              >
                <span
                  className={`h-6 w-6 !rounded-full bg-white transition ${
                    twoFactor ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-nova-card bg-nova-card p-5">
            <h3 className="text-lg font-semibold text-white">Limites de jogo</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {["Limite diário", "Limite semanal", "Limite mensal"].map((campo) => (
                <input
                  key={campo}
                  type="text"
                  placeholder={campo}
                  className="rounded-xl border border-nova-card bg-nova-elevated px-4 py-3 text-sm text-white placeholder:text-nova-textMuted"
                />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-red-500/20 bg-nova-card p-5">
            <h3 className="text-lg font-semibold text-white">Autoexclusão</h3>
            <p className="mt-2 text-sm text-nova-textMuted">
              Precisa de uma pausa? Nossa equipe pode ajudar a restringir o acesso temporariamente.
            </p>
            <button
              type="button"
              className="mt-4 rounded-xl bg-nova-ruby px-5 py-3 text-sm font-bold text-white transition hover:bg-red-400"
            >
              SOLICITAR AUTOEXCLUSÃO
            </button>
          </section>
        </div>
      ) : null}
    </SiteShell>
  );
}

