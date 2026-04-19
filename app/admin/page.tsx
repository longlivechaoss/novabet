"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { banners, jogosRecomendados } from "@/data/jogos";

type AdminTab = "jogos" | "banners";
type BannerState = (typeof banners)[number];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("jogos");
  const [jogosState, setJogosState] = useState(jogosRecomendados);
  const [bannersState, setBannersState] = useState(banners);

  const jogoInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const bannerInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const jogoFileNames = useMemo(() => {
    return Object.fromEntries(
      jogosState.map((jogo) => [
        jogo.id,
        `${jogo.nome.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.webp`
      ])
    );
  }, [jogosState]);

  const updateJogoImagem = (jogoId: number, file?: File) => {
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setJogosState((current) =>
      current.map((jogo) => (jogo.id === jogoId ? { ...jogo, imagem: previewUrl } : jogo))
    );

    const nomeArquivo = jogoFileNames[jogoId] ?? `jogo-${jogoId}.webp`;
    window.alert(
      `Imagem atualizada! Copie o arquivo para public/images/jogos/ com o nome: ${nomeArquivo}`
    );
  };

  const updateBannerImagem = (bannerId: number, file?: File) => {
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setBannersState((current) =>
      current.map((banner) => (banner.id === bannerId ? { ...banner, imagem: previewUrl } : banner))
    );
  };

  const updateBannerField = (bannerId: number, field: keyof BannerState, value: string) => {
    setBannersState((current) =>
      current.map((banner) => (banner.id === bannerId ? { ...banner, [field]: value } : banner))
    );
  };

  return (
    <div className="min-h-screen bg-nova-bg text-white">
      <header className="border-b border-nova-blue/20 bg-nova-bg">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <img src="/images/logo-novabet.webp" alt="NovaBet" className="h-8 w-auto" />
            <span className="rounded-xl bg-nova-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Admin
            </span>
          </div>
          <div className="text-sm text-nova-textMuted">Painel de Administração</div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/banners"
            className="flex flex-col gap-2 rounded-xl border border-nova-border bg-nova-card p-4 transition hover:border-nova-blue"
          >
            <span className="text-2xl">🖼️</span>
            <span className="font-semibold text-white">Gerenciar Banners</span>
            <span className="text-xs text-gray-400">Troque os banners do site pelo painel</span>
          </a>
        </div>

        <div className="mb-8 flex gap-8 border-b border-nova-blue/10">
          <button
            type="button"
            onClick={() => setActiveTab("jogos")}
            className={`border-b-2 px-1 pb-3 text-sm transition ${
              activeTab === "jogos"
                ? "border-nova-blue text-white"
                : "border-transparent text-nova-textMuted"
            }`}
          >
            🎮 Jogos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("banners")}
            className={`border-b-2 px-1 pb-3 text-sm transition ${
              activeTab === "banners"
                ? "border-nova-blue text-white"
                : "border-transparent text-nova-textMuted"
            }`}
          >
            🖼️ Banners
          </button>
        </div>

        {activeTab === "jogos" ? (
          <section>
            <h1 className="text-2xl font-bold text-white">Imagens dos Jogos Recomendados</h1>
            <p className="mt-2 text-sm text-nova-textMuted">
              Clique em um jogo para alterar a imagem
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jogosState.map((jogo) => (
                <div
                  key={jogo.id}
                  className="rounded-xl border border-nova-blue/20 bg-nova-card p-4"
                >
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-xl">
                    {jogo.imagem ? (
                      <Image src={jogo.imagem} alt={jogo.nome} fill className="object-cover" />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${jogo.gradient}`}
                      >
                        <span className="text-6xl">{jogo.emoji}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm font-semibold text-white">{jogo.nome}</div>
                  <div className="mt-1 text-xs text-nova-textMuted">
                    {jogo.imagem || "Sem imagem"}
                  </div>

                  <input
                    ref={(element) => {
                      jogoInputRefs.current[jogo.id] = element;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => updateJogoImagem(jogo.id, event.target.files?.[0])}
                  />

                  <button
                    type="button"
                    onClick={() => jogoInputRefs.current[jogo.id]?.click()}
                    className="mt-3 w-full rounded-xl bg-nova-blue py-2 text-sm text-white transition hover:bg-nova-blue"
                  >
                    📁 Trocar Imagem
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h1 className="text-2xl font-bold text-white">Banners do Carrossel Principal</h1>

            <div className="mt-6 space-y-4">
              {bannersState.map((banner) => (
                <div
                  key={banner.id}
                  className="rounded-xl border border-nova-blue/20 bg-nova-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-nova-card px-3 py-1 text-xs text-nova-blueBright">
                      {banner.tag}
                    </span>
                  </div>

                  <div className="relative my-3 h-32 overflow-hidden rounded-xl">
                    {banner.imagem ? (
                      <Image src={banner.imagem} alt={banner.tag} fill className="object-cover" />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${banner.gradient}`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold text-white/75">{banner.titulo}</div>
                          <div className="text-2xl font-black text-white">{banner.destaque}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <label className="mb-1 block text-sm text-nova-text">Título:</label>
                  <input
                    value={banner.titulo}
                    onChange={(event) =>
                      updateBannerField(banner.id, "titulo", event.target.value)
                    }
                    className="mb-2 w-full rounded-xl border border-nova-blue/30 bg-nova-card px-3 py-2 text-sm text-white"
                  />

                  <label className="mb-1 block text-sm text-nova-text">Destaque:</label>
                  <input
                    value={banner.destaque}
                    onChange={(event) =>
                      updateBannerField(banner.id, "destaque", event.target.value)
                    }
                    className="mb-2 w-full rounded-xl border border-nova-blue/30 bg-nova-card px-3 py-2 text-sm text-white"
                  />

                  <label className="mb-1 block text-sm text-nova-text">Subtítulo:</label>
                  <input
                    value={banner.subtitulo}
                    onChange={(event) =>
                      updateBannerField(banner.id, "subtitulo", event.target.value)
                    }
                    className="mb-2 w-full rounded-xl border border-nova-blue/30 bg-nova-card px-3 py-2 text-sm text-white"
                  />

                  <label className="mb-1 block text-sm text-nova-text">Botão:</label>
                  <input
                    value={banner.botao}
                    onChange={(event) => updateBannerField(banner.id, "botao", event.target.value)}
                    className="mb-2 w-full rounded-xl border border-nova-blue/30 bg-nova-card px-3 py-2 text-sm text-white"
                  />

                  <input
                    ref={(element) => {
                      bannerInputRefs.current[banner.id] = element;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => updateBannerImagem(banner.id, event.target.files?.[0])}
                  />

                  <button
                    type="button"
                    onClick={() => bannerInputRefs.current[banner.id]?.click()}
                    className="mt-3 rounded-xl bg-nova-blue px-4 py-2 text-sm text-white transition hover:bg-nova-blue"
                  >
                    📁 Imagem de Fundo
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

