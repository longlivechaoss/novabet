"use client";

import { useMemo, useState } from "react";

const recompensas = ["R$ 5", "R$ 10", "R$ 20", "R$ 50", "R$ 100", "R$ 200", "R$ 500"];

export default function CheckInDiario() {
  const [ultimoDiaConcluido, setUltimoDiaConcluido] = useState(3);

  const diaDisponivel = useMemo(() => Math.min(ultimoDiaConcluido + 1, 7), [ultimoDiaConcluido]);

  function handleCheckIn() {
    setUltimoDiaConcluido((atual) => Math.min(atual + 1, 7));
  }

  return (
    <section className="rounded-2xl border border-nova-blue/30 bg-gradient-to-r from-nova-card/70 to-nova-elevated/70 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">🎁 Check-in Diário</h2>
            <span className="rounded-full bg-nova-blue/20 px-3 py-1 text-xs font-bold text-nova-blueBright">
              DISPONÍVEL
            </span>
          </div>
          <p className="mt-2 text-sm text-nova-textMuted">
            Faça check-in por 7 dias e ganhe prêmios incríveis!
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckIn}
          disabled={ultimoDiaConcluido >= 7}
          className="rounded-xl bg-nova-blue px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight disabled:cursor-not-allowed disabled:opacity-60"
        >
          {ultimoDiaConcluido >= 7 ? "SÉRIE COMPLETA" : "FAZER CHECK-IN"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-7">
        {recompensas.map((recompensa, index) => {
          const dia = index + 1;
          const concluido = dia <= ultimoDiaConcluido;
          const disponivel = dia === diaDisponivel && ultimoDiaConcluido < 7;

          return (
            <div key={dia} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-14 w-14 items-center justify-center !rounded-full text-sm font-bold transition ${
                  concluido
                    ? "bg-nova-blue text-white"
                    : disponivel
                      ? "animate-pulse bg-nova-blue text-white"
                      : "border border-dashed border-nova-border bg-nova-elevated text-nova-textMuted"
                }`}
              >
                {concluido ? "✓" : `D${dia}`}
              </div>
              <span className="text-xs text-nova-textMuted">{recompensa}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
