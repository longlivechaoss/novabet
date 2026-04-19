"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type ModalLoginProps = {
  onClose: () => void;
  onOpenCadastro: () => void;
  onLoginSuccess: () => void;
};

export default function ModalLogin({
  onClose,
  onOpenCadastro,
  onLoginSuccess
}: ModalLoginProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

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
          className="relative w-full max-w-[420px] rounded-2xl bg-nova-elevated p-8 shadow-2xl"
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

          <div className="mb-2 text-center">
            <img
              src="/images/logo-novabet.webp"
              alt="NovaBet"
              className="mx-auto h-8 w-auto"
            />
          </div>
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Entrar</h2>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full rounded-lg border border-nova-border bg-nova-card px-4 py-3 text-sm text-white placeholder:text-nova-textMuted focus:border-nova-blue focus:outline-none focus:ring-1 focus:ring-nova-blue/30"
            />

            <div className="relative">
              <input
                type={senhaVisivel ? "text" : "password"}
                placeholder="Senha"
                className="w-full rounded-lg border border-nova-border bg-nova-card px-4 py-3 pr-12 text-sm text-white placeholder:text-nova-textMuted focus:border-nova-blue focus:outline-none focus:ring-1 focus:ring-nova-blue/30"
              />
              <button
                type="button"
                onClick={() => setSenhaVisivel((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-nova-textMuted transition hover:text-white"
              >
                {senhaVisivel ? "🙈" : "👁"}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-nova-blue transition hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onLoginSuccess}
            className="mt-4 w-full rounded-lg bg-nova-blue py-3 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
          >
            ENTRAR
          </button>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 border-t border-nova-border" />
            <span className="text-xs font-medium text-nova-textMuted">OU</span>
            <div className="flex-1 border-t border-nova-border" />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-nova-border bg-nova-card py-2.5 text-sm font-semibold text-white transition hover:border-nova-blue"
            >
              <span className="text-lg font-black text-nova-blueBright">
                G
              </span>
              Google
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-nova-border bg-nova-card py-2.5 text-sm font-semibold text-white transition hover:border-nova-blue"
            >
              <span className="text-base">✈</span>
              Telegram
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-nova-textMuted">
            Não tem conta?{" "}
            <button
              type="button"
              onClick={onOpenCadastro}
              className="font-semibold text-nova-blue transition hover:text-nova-blueBright"
            >
              Criar conta
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

