"use client";

import { useState } from "react";

export default function AgeVerification() {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <div className="w-full max-w-md rounded-2xl border border-nova-blue/30 bg-nova-card p-10 shadow-2xl shadow-nova-blue/20">
        <div className="text-center text-6xl">🔞</div>
        <h2 className="mt-4 text-center text-2xl font-bold text-white">Verificação de Idade</h2>
        <p className="mt-2 text-center text-sm text-nova-textMuted">
          Este site é destinado apenas para maiores de 18 anos. Confirme sua idade para
          continuar.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setVisivel(false)}
            className="flex-1 rounded-lg bg-nova-blue py-3 font-bold text-white transition-colors hover:bg-nova-blueLight"
          >
            TENHO 18+
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "https://google.com";
            }}
            className="flex-1 rounded-lg border border-nova-border py-3 font-bold text-nova-text transition hover:bg-white/5"
          >
            SOU MENOR
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-nova-textMuted">Jogue com responsabilidade 🎲</p>
      </div>
    </div>
  );
}

