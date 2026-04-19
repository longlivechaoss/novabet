"use client";

import { useMemo, useState } from "react";

import SiteShell from "@/components/layout/SiteShell";
import { formatGameNameFromSlug } from "@/lib/gameSlug";

type JogoPageProps = {
  params: {
    slug: string;
  };
};

const mensagensIniciais = [
  { id: 1, nome: "Car***", cor: "bg-[#3150A0]", texto: "acabei de ganhar R$340! 🔥" },
  { id: 2, nome: "Mar***", cor: "bg-nova-blue", texto: "Fortune Tiger pagando muito hoje" },
  { id: 3, nome: "Ana***", cor: "bg-nova-blue", texto: "Alguém pegou bônus agora?" },
  { id: 4, nome: "Ped***", cor: "bg-[#456BC5]", texto: "essa rodada veio insana" },
  { id: 5, nome: "Lui***", cor: "bg-[#3658AA]", texto: "partiu buscar o multiplicador" },
  { id: 6, nome: "Jul***", cor: "bg-nova-ruby", texto: "chat tá trazendo sorte hoje" },
  { id: 7, nome: "Bia***", cor: "bg-[#274185]", texto: "entrei com valor baixo e bateu" },
  { id: 8, nome: "Raf***", cor: "bg-[#3C60B5]", texto: "boa sorte pra geral 🍀" }
];

export default function JogoPage({ params }: JogoPageProps) {
  const [mensagem, setMensagem] = useState("");
  const nomeJogo = useMemo(() => formatGameNameFromSlug(params.slug), [params.slug]);

  return (
    <SiteShell
      withSidebar={false}
      rawContent
      mainClassName="min-h-screen px-4 pb-4 pt-4 lg:px-6"
      showSidebarToggle={false}
    >
      {({ abrirCadastro }) => (
        <div className="flex min-h-[calc(100vh-(var(--top-banner-height,36px)+76px))] flex-col overflow-hidden rounded-3xl border border-nova-blue/10 bg-nova-bg lg:flex-row">
          <section className="flex-1 p-4 lg:p-6">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl bg-black">
              <iframe title={nomeJogo} src="about:blank" className="h-full w-full rounded-xl bg-black" />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 px-6 text-center">
                <span className="text-6xl">🎮</span>
                <h1 className="mt-4 text-xl font-bold text-white">Conecte-se para jogar</h1>
                <button
                  type="button"
                  onClick={abrirCadastro}
                  className="mt-6 rounded-full bg-nova-blue px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
                >
                  REGISTRE-SE GRÁTIS
                </button>
              </div>
            </div>
          </section>

          <aside className="flex w-full flex-col border-l border-nova-blue/20 bg-nova-card lg:w-80">
            <div className="border-b border-nova-blue/10 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">{nomeJogo}</h2>
                  <p className="mt-1 text-xs text-nova-textMuted">Sala principal do jogo</p>
                </div>
                <span className="rounded-full bg-nova-ruby/20 px-3 py-1 text-xs font-bold text-white">
                  AO VIVO
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-3">
              <h3 className="mb-3 text-sm font-semibold text-white">Chat ao vivo</h3>
              <div className="space-y-1">
                {mensagensIniciais.map((mensagemItem) => (
                  <div
                    key={mensagemItem.id}
                    className="flex gap-2 border-b border-nova-border/50 py-2 text-xs"
                  >
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${mensagemItem.cor}`}
                    >
                      {mensagemItem.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{mensagemItem.nome}</p>
                      <p className="mt-1 text-nova-textMuted">{mensagemItem.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-nova-blue/10 p-4">
              <div className="flex items-center gap-2 rounded-xl border border-nova-blue/30 bg-nova-card p-2">
                <input
                  type="text"
                  value={mensagem}
                  onChange={(event) => setMensagem(event.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="w-full bg-transparent px-2 text-sm text-white outline-none placeholder:text-nova-textMuted"
                />
                <button
                  type="button"
                  className="rounded-lg bg-nova-blue px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
                >
                  →
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </SiteShell>
  );
}

