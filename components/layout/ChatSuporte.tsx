"use client";

import { useState } from "react";

const mensagens = [
  { id: 1, autor: "bot", texto: "Olá! Como posso te ajudar hoje?" },
  { id: 2, autor: "bot", texto: "Você pode escolher uma opção abaixo ou digitar sua dúvida" }
];

export default function ChatSuporte() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-24 left-6 z-50 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-nova-border bg-nova-card shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-nova-blue px-4 py-3">
            <div>
              <p className="font-semibold text-white">💬 Suporte ao vivo</p>
              <span className="mt-1 inline-flex rounded-full bg-nova-blue/20 px-2 py-0.5 text-[10px] font-bold text-nova-blueBright">
                Online
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {mensagens.map((item) => (
                <div key={item.id} className="rounded-2xl bg-nova-elevated px-3 py-2 text-sm text-nova-text">
                  {item.texto}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="rounded-full border border-nova-border bg-nova-elevated px-3 py-2 text-left text-xs text-nova-text transition hover:border-nova-blue"
              >
                💰 Problema com depósito
              </button>
              <button
                type="button"
                className="rounded-full border border-nova-border bg-nova-elevated px-3 py-2 text-left text-xs text-nova-text transition hover:border-nova-blue"
              >
                🎁 Dúvida sobre bônus
              </button>
              <button
                type="button"
                className="rounded-full border border-nova-border bg-nova-elevated px-3 py-2 text-left text-xs text-nova-text transition hover:border-nova-blue"
              >
                📞 Falar com atendente
              </button>
            </div>
          </div>

          <div className="border-t border-nova-border p-4">
            <div className="flex items-center gap-2 rounded-full border border-nova-border bg-nova-elevated px-3 py-2">
              <input
                type="text"
                value={mensagem}
                onChange={(event) => setMensagem(event.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-nova-textMuted"
              />
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-nova-blue text-white transition-colors hover:bg-nova-blueLight"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-nova-blue text-2xl text-white shadow-lg shadow-nova-blue/30 transition hover:scale-110 hover:bg-nova-blueLight"
      >
        💬
      </button>
    </>
  );
}

