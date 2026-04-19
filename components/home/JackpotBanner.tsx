"use client";

import { useEffect, useMemo, useState } from "react";

const INITIAL_JACKPOT = 1284492;
const INITIAL_COUNTDOWN = 2 * 3600 + 14 * 60 + 38;

function formatCountdown(seconds: number) {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${remainingSeconds}`;
}

export default function JackpotBanner() {
  const [jackpot, setJackpot] = useState(INITIAL_JACKPOT);
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);

  useEffect(() => {
    const jackpotInterval = window.setInterval(() => {
      const increase = Math.floor(Math.random() * (97 - 13 + 1)) + 13;
      setJackpot((current) => current + increase);
    }, 3000);

    return () => window.clearInterval(jackpotInterval);
  }, []);

  useEffect(() => {
    const countdownInterval = window.setInterval(() => {
      setCountdown((current) => (current <= 1 ? INITIAL_COUNTDOWN : current - 1));
    }, 1000);

    return () => window.clearInterval(countdownInterval);
  }, []);

  const formattedJackpot = useMemo(() => {
    return `R$ ${jackpot.toLocaleString("pt-BR")}`;
  }, [jackpot]);

  return (
    <section className="flex items-center justify-between rounded-xl border border-nova-blue/30 bg-gradient-to-r from-nova-bg via-nova-card to-nova-elevated px-8 py-4">
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-widest text-nova-blueBright">
          🏆 JACKPOT ACUMULADO
        </div>
        <div className="bg-gradient-to-r from-nova-blue to-nova-blueBright bg-clip-text text-4xl font-black text-transparent">
          {formattedJackpot}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          className="rounded-full bg-nova-blue px-8 py-3 font-bold text-white transition-colors hover:bg-nova-blueLight"
        >
          PARTICIPAR
        </button>
        <div className="text-sm text-nova-textMuted">
          Próximo sorteio em {formatCountdown(countdown)}
        </div>
      </div>
    </section>
  );
}
