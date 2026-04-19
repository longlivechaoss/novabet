"use client";

import { useEffect, useState } from "react";

/** Mesmas sugestões que `SidebarSearch` em `components/layout/Sidebar.tsx` */
const SUGESTOES = [
  "Fortune Tiger",
  "Aviator",
  "Spaceman",
  "Fortune Ox",
  "Sweet Bonanza",
  "PG Soft",
  "Pragmatic Play",
  "Gates of Olympus",
  "Big Bass Bonanza",
  "Evolution",
  "Mines",
  "Roleta Ao Vivo"
];

export default function MobileSearchBar() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [sugestaoIndex, setSugestaoIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    const sugestaoAtual = SUGESTOES[sugestaoIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!apagando) {
      if (charIndex < sugestaoAtual.length) {
        timeoutId = setTimeout(() => {
          setPlaceholderText(sugestaoAtual.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
      } else {
        timeoutId = setTimeout(() => {
          setApagando(true);
        }, 1500);
      }
    } else if (charIndex > 0) {
      timeoutId = setTimeout(() => {
        setPlaceholderText(sugestaoAtual.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else {
      timeoutId = setTimeout(() => {
        setApagando(false);
        setSugestaoIndex((i) => (i + 1) % SUGESTOES.length);
      }, 0);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, apagando, sugestaoIndex]);

  return (
    <div className="block px-4 pb-2 pt-1 md:hidden">
      <div className="flex items-center gap-3 rounded-xl border border-nova-border bg-nova-card px-4 py-2.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-nova-textMuted"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-sm text-nova-textMuted">
          Buscar {placeholderText}
          <span className="animate-pulse">|</span>
        </span>
      </div>
    </div>
  );
}
