"use client";

import { useState } from "react";

import SiteShell from "@/components/layout/SiteShell";

const categorias = [
  { icon: "💳", titulo: "Pagamentos", descricao: "Depósitos, saques, métodos" },
  { icon: "🎁", titulo: "Bônus", descricao: "Promoções, rollover, termos" },
  { icon: "🎮", titulo: "Jogos", descricao: "Regras, problemas técnicos" },
  { icon: "🔐", titulo: "Conta", descricao: "Cadastro, verificação, segurança" }
];

const perguntas = [
  "Como faço um depósito via PIX?",
  "Quanto tempo demora para sacar?",
  "O site é seguro?",
  "Como funciona o bônus de boas-vindas?",
  "Esqueci minha senha, o que fazer?",
  "Como verificar minha conta (KYC)?",
  "Qual o valor mínimo de saque?",
  "Como entrar em contato com o suporte?"
];

export default function SuportePage() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <SiteShell contentClassName="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-8 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-nova-card to-nova-blue/60 px-8 py-12 text-center">
        <h1 className="text-4xl font-black text-white">🆘 Central de Ajuda</h1>
        <p className="mt-3 text-xl text-nova-text">Como podemos te ajudar?</p>
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-black/20 p-1">
          <input
            type="text"
            placeholder="Pesquise na ajuda..."
            className="w-full rounded-2xl bg-nova-card px-5 py-4 text-white outline-none placeholder:text-nova-textMuted"
          />
        </div>
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categorias.map((categoria) => (
          <div
            key={categoria.titulo}
            className="cursor-pointer rounded-xl border border-nova-card bg-nova-card p-6 transition hover:border-nova-blue/50"
          >
            <div className="text-4xl">{categoria.icon}</div>
            <h2 className="mt-4 text-lg font-bold text-white">{categoria.titulo}</h2>
            <p className="mt-2 text-sm text-nova-textMuted">{categoria.descricao}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-white">Perguntas frequentes</h2>
        {perguntas.map((pergunta, index) => {
          const abertaAgora = aberta === index;

          return (
            <div
              key={pergunta}
              className="mb-3 rounded-xl border border-nova-card bg-nova-card"
            >
              <button
                type="button"
                onClick={() => setAberta(abertaAgora ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-white">{pergunta}</span>
                <span className="text-xl text-nova-blue">{abertaAgora ? "−" : "+"}</span>
              </button>
              {abertaAgora ? (
                <div className="px-5 pb-5 text-sm text-nova-textMuted">
                  Nossa equipe preparou uma resposta rápida para te ajudar com esse tema. Se
                  ainda restar alguma dúvida, use o chat ao vivo ou fale com um atendente.
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["WhatsApp", "Atendimento rápido 24h"],
          ["E-mail", "suporte@novabet.com"],
          ["Chat ao vivo", "Converse com nossa equipe"]
        ].map(([titulo, descricao]) => (
          <div
            key={titulo}
            className="rounded-xl border border-nova-card bg-nova-card p-6"
          >
            <h3 className="text-lg font-bold text-white">{titulo}</h3>
            <p className="mt-2 text-sm text-nova-textMuted">{descricao}</p>
          </div>
        ))}
      </div>
    </SiteShell>
  );
}

