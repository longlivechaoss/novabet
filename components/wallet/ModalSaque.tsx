"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type ModalSaqueProps = {
  onClose: () => void;
};

type MetodoSaque = "pix" | "transferencia";

const saldoDisponivel = 1250;
const saldoBonus = 150;
const valoresRapidos = [
  { label: "R$ 100", value: 100 },
  { label: "R$ 500", value: 500 },
  { label: "Tudo (R$ 1.250)", value: saldoDisponivel }
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export default function ModalSaque({ onClose }: ModalSaqueProps) {
  const [valor, setValor] = useState(0);
  const [metodo, setMetodo] = useState<MetodoSaque>("pix");
  const [tipoChave, setTipoChave] = useState("CPF");
  const [chavePix, setChavePix] = useState("");

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
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          <h2 className="mb-6 text-2xl font-bold text-white">💸 Sacar</h2>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-nova-elevated p-4">
            <div>
              <p className="text-xs text-nova-textMuted">Saldo disponível</p>
              <p className="mt-1 text-2xl font-bold text-nova-green">
                {formatarMoeda(saldoDisponivel)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-nova-textMuted">Saldo em bônus</p>
              <p className="mt-1 text-sm text-nova-blueBright">{formatarMoeda(saldoBonus)}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-nova-textMuted">Quanto deseja sacar?</p>
            <input
              type="text"
              value={valorFormatado}
              onChange={(event) => {
                const digits = event.target.value.replace(/\D/g, "");
                setValor(digits ? Number(digits) / 100 : 0);
              }}
              className="w-full rounded-xl border border-nova-border bg-nova-elevated px-4 py-4 text-center text-3xl font-bold text-white focus:border-nova-blue focus:outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              {valoresRapidos.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setValor(item.value)}
                  className="rounded-lg border border-nova-border bg-nova-card px-4 py-2 text-sm text-white transition hover:border-nova-blue"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-nova-textMuted">Valor mínimo: R$ 30,00</p>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-nova-textMuted">Método de saque</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMetodo("pix")}
                className={`relative rounded-2xl border p-4 text-left transition ${
                  metodo === "pix"
                    ? "border-nova-blue/50 bg-nova-blue/10"
                    : "border-nova-border bg-nova-card hover:border-nova-blue/30"
                }`}
              >
                <span className="absolute right-3 top-3 rounded-full bg-nova-blue px-2 py-0.5 text-[10px] font-bold text-white">
                  INSTANTÂNEO
                </span>
                <div className="text-4xl">⚡</div>
                <p className="mt-2 font-bold text-white">PIX</p>
                <p className="mt-1 text-xs text-nova-blueBright">Até 5 minutos</p>
              </button>

              <button
                type="button"
                onClick={() => setMetodo("transferencia")}
                className={`rounded-2xl border p-4 text-left transition ${
                  metodo === "transferencia"
                    ? "border-nova-blue/50 bg-nova-blue/10"
                    : "border-nova-border bg-nova-card hover:border-nova-blue/30"
                }`}
              >
                <div className="text-4xl">🏦</div>
                <p className="mt-2 font-bold text-white">TED/Transferência</p>
                <p className="mt-1 text-xs text-nova-textMuted">1 dia útil</p>
              </button>
            </div>
          </div>

          {metodo === "pix" ? (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-nova-textMuted">Chave PIX</p>
              <select
                value={tipoChave}
                onChange={(event) => setTipoChave(event.target.value)}
                className="w-full rounded-lg border border-nova-border bg-nova-elevated px-4 py-3 text-sm text-white focus:border-nova-blue focus:outline-none"
              >
                <option>CPF</option>
                <option>E-mail</option>
                <option>Telefone</option>
                <option>Aleatória</option>
              </select>
              <input
                type="text"
                value={chavePix}
                onChange={(event) => setChavePix(event.target.value)}
                placeholder="Digite sua chave PIX"
                className="w-full rounded-lg border border-nova-border bg-nova-elevated px-4 py-3 text-sm text-white placeholder:text-nova-textMuted focus:border-nova-blue focus:outline-none"
              />
            </div>
          ) : null}

          <button
            type="button"
            className="mt-6 w-full rounded-xl bg-nova-blue py-4 text-lg font-bold text-white shadow-lg shadow-nova-blue/25 transition-colors hover:bg-nova-blueLight"
          >
            SOLICITAR SAQUE
          </button>

          <p className="mt-3 text-center text-xs text-nova-textMuted">
            Seu saque será processado após análise de segurança
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

