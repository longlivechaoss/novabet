"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Notificacao = {
  id: number;
  icon: string;
  titulo: string;
  descricao: string;
  tempo: string;
  lida: boolean;
};

const notificacoesIniciais: Notificacao[] = [
  {
    id: 1,
    icon: "🎁",
    titulo: "Bônus recebido!",
    descricao: "Seu bônus de R$ 50 está disponível",
    tempo: "há 5 minutos",
    lida: false
  },
  {
    id: 2,
    icon: "💰",
    titulo: "Depósito confirmado",
    descricao: "R$ 100,00 via PIX",
    tempo: "há 2 horas",
    lida: false
  },
  {
    id: 3,
    icon: "🏆",
    titulo: "Novo torneio",
    descricao: "Fortune Tiger Showdown começou!",
    tempo: "ontem",
    lida: false
  }
];

export default function Notificacoes() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const naoLidas = useMemo(
    () => notificacoes.filter((notificacao) => !notificacao.lida).length,
    [notificacoes]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function marcarTodasComoLidas() {
    setNotificacoes((atual) => atual.map((item) => ({ ...item, lida: true })));
  }

  function marcarComoLida(id: number) {
    setNotificacoes((atual) =>
      atual.map((item) => (item.id === id ? { ...item, lida: true } : item))
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-nova-border bg-nova-card text-lg text-white transition hover:border-nova-blue hover:bg-nova-elevated"
        aria-label="Abrir notificações"
      >
        🔔
        {naoLidas > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-nova-ruby px-1 text-[10px] font-bold text-white">
            {naoLidas}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-nova-border bg-nova-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-nova-border px-4 py-3">
            <span className="font-bold text-white">Notificações</span>
            <button
              type="button"
              onClick={marcarTodasComoLidas}
              className="text-xs text-nova-blue transition hover:text-nova-blueBright"
            >
              Marcar todas como lidas
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notificacoes.map((notificacao) => (
              <button
                key={notificacao.id}
                type="button"
                onClick={() => marcarComoLida(notificacao.id)}
                className="flex w-full items-start gap-3 border-b border-nova-border p-4 text-left transition hover:bg-nova-elevated/60"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-nova-card/40 text-lg">
                  {notificacao.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{notificacao.titulo}</p>
                  <p className="mt-1 text-xs text-nova-textMuted">{notificacao.descricao}</p>
                  <p className="mt-2 text-xs text-nova-textMuted">{notificacao.tempo}</p>
                </div>
                {!notificacao.lida ? (
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-nova-blue" />
                ) : null}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="w-full py-3 text-center text-sm text-nova-blue transition hover:text-nova-blueBright"
          >
            Ver todas
          </button>
        </div>
      ) : null}
    </div>
  );
}

