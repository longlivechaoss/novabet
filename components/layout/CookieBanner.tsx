"use client";

import { useState } from "react";

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-start justify-between gap-4 border-t border-nova-border bg-nova-card px-6 py-4 md:flex-row md:items-center">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🍪</span>
        <p className="text-sm text-nova-textMuted">
          Usamos cookies para melhorar sua experiência. Ao continuar navegando, você aceita
          nossa Política de Cookies.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setVisivel(false)}
          className="rounded-full border border-nova-border px-5 py-2 text-sm text-nova-textMuted transition hover:text-white"
        >
          RECUSAR
        </button>
        <button
          type="button"
          onClick={() => setVisivel(false)}
          className="rounded-full bg-nova-blue px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
        >
          ACEITAR
        </button>
      </div>
    </div>
  );
}
