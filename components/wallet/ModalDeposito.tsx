"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type ModalDepositoProps = {
  onClose: () => void;
};

const valoresRapidos = [50, 100, 200, 500];

type MetodoDeposito = {
  id: "pix" | "cartao" | "boleto";
  icon: string;
  nome: string;
  subtitulo: string;
  badge?: string;
  activeClass: string;
  subtitleClass: string;
};

const metodos: MetodoDeposito[] = [
  {
    id: "pix",
    icon: "⚡",
    nome: "PIX",
    subtitulo: "Aprovação instantânea",
    badge: "RECOMENDADO",
    activeClass: "border-nova-blue/50 bg-nova-blue/10",
    subtitleClass: "text-nova-blueBright"
  },
  {
    id: "cartao",
    icon: "💳",
    nome: "Cartão",
    subtitulo: "Crédito/Débito",
    activeClass: "border-nova-blue/40 bg-nova-card/20",
    subtitleClass: "text-nova-textMuted"
  },
  {
    id: "boleto",
    icon: "📄",
    nome: "Boleto",
    subtitulo: "2 dias úteis",
    activeClass: "border-nova-blue/40 bg-nova-card/20",
    subtitleClass: "text-nova-textMuted"
  }
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export default function ModalDeposito({ onClose }: ModalDepositoProps) {
  const [valor, setValor] = useState(0);
  const [metodoAtivo, setMetodoAtivo] = useState<MetodoDeposito["id"]>("pix");
  const [bonus, setBonus] = useState("Nenhum");

  const valorFormatado = useMemo(() => formatarMoeda(valor), [valor]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backdropFilter: "blur(14px)", backgroundColor: "rgba(0,0,0,0.65)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-nova-card p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center !rounded-full bg-white/10 text-sm text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          <h2 className="mb-6 text-2xl font-bold text-white">💰 Depositar</h2>

          <div>
            <p className="mb-2 text-sm text-nova-textMuted">Valor do depósito</p>
            <input
              type="text"
              value={valorFormatado}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "");
                setValor(digits ? Number(digits) / 100 : 0);
              }}
              className="w-full rounded-xl border border-nova-border bg-nova-elevated px-4 py-4 text-center text-3xl font-bold text-white focus:border-nova-blue focus:outline-none"
            />

            <div className="mt-4 grid grid-cols-4 gap-3">
              {valoresRapidos.map((valorRapido) => (
                <button
                  key={valorRapido}
                  type="button"
                  onClick={() => setValor(valorRapido)}
                  className="rounded-xl border border-nova-border bg-nova-card py-2 text-sm text-white transition hover:border-nova-blue"
                >
                  {formatarMoeda(valorRapido)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-nova-textMuted">Escolha o método</p>
            <div className="grid grid-cols-3 gap-3">
              {metodos.map((metodo) => {
                const ativo = metodo.id === metodoAtivo;

                return (
                  <button
                    key={metodo.id}
                    type="button"
                    onClick={() => setMetodoAtivo(metodo.id)}
                    className={`relative rounded-2xl border p-4 text-center transition ${
                      ativo
                        ? metodo.activeClass
                        : "border-nova-border bg-nova-card hover:border-nova-blue/30"
                    }`}
                  >
                    {metodo.badge && ativo ? (
                      <span className="absolute right-2 top-2 rounded-full bg-nova-blue px-2 py-0.5 text-[10px] font-bold text-white">
                        {metodo.badge}
                      </span>
                    ) : null}
                    <div className="text-4xl">{metodo.icon}</div>
                    <p className="mt-2 font-bold text-white">{metodo.nome}</p>
                    <p className={`mt-1 text-xs ${metodo.subtitleClass}`}>{metodo.subtitulo}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-nova-textMuted">Aplicar bônus</p>
            <select
              value={bonus}
              onChange={(event) => setBonus(event.target.value)}
              className="w-full rounded-xl border border-nova-border bg-nova-elevated px-4 py-3 text-sm text-white focus:border-nova-blue focus:outline-none"
            >
              <option>Nenhum</option>
              <option>Bônus Boas-vindas 200%</option>
              <option>Cashback 10%</option>
            </select>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-nova-blue py-4 text-lg font-bold text-white shadow-lg shadow-nova-blue/25 transition-colors hover:bg-nova-blueLight"
          >
            DEPOSITAR {valorFormatado}
          </button>

          <p className="mt-3 text-center text-xs text-nova-textMuted">
            🔒 Transação 100% segura e criptografada
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
