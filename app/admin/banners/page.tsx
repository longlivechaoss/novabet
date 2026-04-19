"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

type Banner = {
  id: string;
  label: string;
  url: string;
  tipo: "principal" | "lateral" | "mobile";
  ordem: number;
};

const tipoCores = {
  principal: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  lateral: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  mobile: "bg-green-500/20 text-green-400 border-green-500/30"
};

const tipoLabels = {
  principal: "🖥️ Desktop Principal",
  lateral: "🖥️ Desktop Lateral",
  mobile: "📱 Mobile"
};

const tipoSizes = {
  principal: "1720 × 720px",
  lateral: "760 × 340px",
  mobile: "750 × 380px"
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [filtro, setFiltro] = useState<"todos" | "principal" | "lateral" | "mobile">("todos");
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    loadBanners();
  }, []);

  async function loadBanners() {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("banners")
      .select("*")
      .order("tipo")
      .order("ordem");
    if (!fetchError && data) setBanners(data as Banner[]);
    setLoading(false);
  }

  async function handleUpload(bannerId: string, file: File) {
    setUploading((prev) => ({ ...prev, [bannerId]: true }));
    setError((prev) => ({ ...prev, [bannerId]: "" }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bannerId", bannerId);

    try {
      const res = await fetch("/api/banners/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setBanners((prev) =>
        prev.map((b) =>
          b.id === bannerId ? { ...b, url: data.url + "?t=" + Date.now() } : b
        )
      );
      setSuccess((prev) => ({ ...prev, [bannerId]: true }));
      setTimeout(() => setSuccess((prev) => ({ ...prev, [bannerId]: false })), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao fazer upload";
      setError((prev) => ({ ...prev, [bannerId]: msg }));
    } finally {
      setUploading((prev) => ({ ...prev, [bannerId]: false }));
    }
  }

  const bannersFiltrados =
    filtro === "todos" ? banners : banners.filter((b) => b.tipo === filtro);

  return (
    <div className="min-h-screen bg-nova-bg p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">🖼️ Gerenciar Banners</h1>
            <p className="mt-1 text-sm text-gray-400">
              Clique em &quot;Trocar imagem&quot; para fazer upload direto pelo painel.
            </p>
          </div>
          <a
            href="/admin"
            className="rounded-lg bg-nova-card px-4 py-2 text-sm text-gray-400 transition hover:text-white"
          >
            ← Voltar ao Admin
          </a>
        </div>

        {/* Guia de tamanhos */}
        <div className="mb-6 rounded-xl border border-nova-border bg-nova-card p-4">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
            📐 Tamanhos recomendados
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {(["principal", "lateral", "mobile"] as const).map((tipo) => (
              <div key={tipo} className={`rounded-lg border p-3 ${tipoCores[tipo]}`}>
                <p className="text-xs font-bold">{tipoLabels[tipo]}</p>
                <p className="mt-1 text-lg font-bold text-white">{tipoSizes[tipo]}</p>
                <p className="text-xs opacity-70">Formato: WebP ou PNG</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["todos", "principal", "lateral", "mobile"] as const).map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setFiltro(tipo)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filtro === tipo
                  ? "bg-nova-blue text-white"
                  : "bg-nova-card text-gray-400 hover:text-white"
              }`}
            >
              {tipo === "todos" ? "Todos" : tipoLabels[tipo]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-nova-blue border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {bannersFiltrados.map((banner) => (
              <div
                key={banner.id}
                className="overflow-hidden rounded-xl border border-nova-border bg-nova-card"
              >
                <div
                  className="relative w-full bg-nova-elevated"
                  style={{
                    aspectRatio:
                      banner.tipo === "principal"
                        ? "1720/720"
                        : banner.tipo === "lateral"
                          ? "760/340"
                          : "750/380"
                  }}
                >
                  {banner.url ? (
                    <img
                      src={banner.url}
                      alt={banner.label}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span className="text-4xl">🖼️</span>
                      <p className="text-sm text-gray-500">Sem imagem</p>
                    </div>
                  )}
                  {uploading[banner.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nova-blue border-t-transparent" />
                        <p className="text-sm text-white">Enviando...</p>
                      </div>
                    </div>
                  )}
                  {success[banner.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-900/60">
                      <p className="text-lg font-bold text-green-400">✅ Atualizado!</p>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{banner.label}</h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${tipoCores[banner.tipo]}`}
                    >
                      {tipoLabels[banner.tipo]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    📐 <span className="text-white">{tipoSizes[banner.tipo]}</span>
                  </p>
                  {error[banner.id] && (
                    <p className="mt-2 rounded bg-red-900/30 p-2 text-xs text-red-400">
                      ❌ {error[banner.id]}
                    </p>
                  )}
                  <input
                    ref={(el) => {
                      fileInputRefs.current[banner.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(banner.id, file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[banner.id]?.click()}
                    disabled={uploading[banner.id]}
                    className="mt-3 w-full rounded-lg bg-nova-blue py-2 text-sm font-semibold text-white transition hover:bg-nova-blueLight disabled:opacity-50"
                  >
                    {uploading[banner.id] ? "Enviando..." : "🔄 Trocar imagem"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
