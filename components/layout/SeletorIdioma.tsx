"use client";

import { useEffect, useRef, useState } from "react";

const idiomas = [
  { id: "pt-BR", flag: "🇧🇷", label: "Português" },
  { id: "en-US", flag: "🇺🇸", label: "English" },
  { id: "es-ES", flag: "🇪🇸", label: "Español" }
];

export default function SeletorIdioma() {
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(idiomas[0]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setAberto(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setAberto((current) => !current)}
        className="flex items-center gap-2 rounded-xl border border-nova-blue/20 bg-nova-card px-3 py-2 text-xs font-semibold text-nova-text transition hover:border-nova-blueBright/50 hover:text-white"
      >
        <span>{ativo.flag}</span>
        <span className="hidden sm:inline">{ativo.id === "pt-BR" ? "PT-BR" : ativo.label}</span>
      </button>

      {aberto ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-nova-card bg-nova-card p-2 shadow-2xl">
          {idiomas.map((idioma) => {
            const ativoAtual = idioma.id === ativo.id;

            return (
              <button
                key={idioma.id}
                type="button"
                onClick={() => {
                  setAtivo(idioma);
                  setAberto(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                  ativoAtual
                    ? "bg-nova-blue/20 text-white"
                    : "text-nova-textMuted hover:bg-nova-card/20 hover:text-white"
                }`}
              >
                <span>{idioma.flag}</span>
                <span>{idioma.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

