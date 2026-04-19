'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onClose: () => void
}

export default function ModalCadastro({ onClose }: Props) {
  const [aba, setAba] = useState<'email' | 'telefone'>('email')
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [ofertasCheck, setOfertasCheck] = useState(true)
  const [idadeCheck, setIdadeCheck] = useState(true)
  const [bonusAtivo, setBonusAtivo] = useState<'cassino' | 'esportes'>('cassino')

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pb-[70px] md:pb-4"
        style={{ backdropFilter: 'blur(14px)', backgroundColor: 'rgba(0,0,0,0.65)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative mx-4 flex w-full max-w-[860px] flex-col overflow-y-auto rounded-2xl shadow-2xl md:flex-row"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex w-full flex-shrink-0 flex-col justify-between overflow-hidden bg-nova-card p-8 md:w-[340px]">
            <div className="pointer-events-none absolute right-[-60px] top-[-60px] h-[200px] w-[200px] rounded-full bg-nova-blue/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-40px] left-[-40px] h-[160px] w-[160px] rounded-full bg-nova-blue/20 blur-3xl" />

            <div className="relative z-10">
              <img src="/images/logo-novabet.webp" alt="NovaBet" className="h-9 w-auto" />

              <p className="mb-1 mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-nova-blue">
                Pacote de Boas-vindas
              </p>

              <div
                className="text-[72px] font-black leading-none text-white"
                style={{
                  textShadow: '0 0 60px rgba(22,82,240,0.42), 0 0 20px rgba(107,147,255,0.3)'
                }}
              >
                200%
              </div>

              <p
                className="mb-6 mt-1 text-xl font-bold"
                style={{
                  background: 'linear-gradient(to right, #1652F0, #6B93FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                + 100 Rodadas Grátis
              </p>

              <div
                className={`mb-3 flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
                  bonusAtivo === 'cassino'
                    ? 'border-nova-blue bg-nova-elevated'
                    : 'border-nova-border bg-nova-darkest/20 opacity-70'
                }`}
                onClick={() => setBonusAtivo('cassino')}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-nova-blue text-xl">
                  🎰
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-nova-text">Bônus Cassino</p>
                  <p className="text-lg font-black leading-tight text-white">200%</p>
                </div>
                <div
                  className={`flex h-6 w-10 items-center rounded-xl px-1 transition-colors ${
                    bonusAtivo === 'cassino' ? 'bg-nova-blue' : 'bg-nova-border'
                  }`}
                >
                  <div
                    className={`h-4 w-4 !rounded-full bg-white transition-transform ${
                      bonusAtivo === 'cassino' ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              <div
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
                  bonusAtivo === 'esportes'
                    ? 'border-nova-blue bg-nova-elevated'
                    : 'border-nova-border bg-nova-darkest/20 opacity-60'
                }`}
                onClick={() => setBonusAtivo('esportes')}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-nova-border text-xl">
                  ⚽
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-nova-text">Bônus Esportes</p>
                  <p className="text-lg font-black leading-tight text-nova-text">R$50</p>
                </div>
                <div
                  className={`flex h-6 w-10 items-center rounded-xl px-1 transition-colors ${
                    bonusAtivo === 'esportes' ? 'bg-nova-blue' : 'bg-nova-border'
                  }`}
                >
                  <div
                    className={`h-4 w-4 !rounded-full bg-white transition-transform ${
                      bonusAtivo === 'esportes' ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6">
              <p className="cursor-pointer text-xs text-nova-blue underline transition-colors hover:text-nova-blueBright">
                Tem um código de ativação?
              </p>
            </div>
          </div>

          <div className="relative flex-1 overflow-y-auto bg-nova-elevated p-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center !rounded-full bg-white/10 text-sm text-white transition-colors hover:bg-white/20"
            >
              ✕
            </button>

            <h2 className="mb-5 text-2xl font-bold text-white">Criar Conta</h2>

            <div className="mb-6 flex gap-6 border-b border-nova-border">
              <button
                className={`relative pb-3 text-sm font-semibold transition-colors ${
                  aba === 'email' ? 'text-white' : 'text-nova-textMuted hover:text-white'
                }`}
                onClick={() => setAba('email')}
              >
                POR E-MAIL
                {aba === 'email' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-white" />
                )}
              </button>
              <button
                className={`relative pb-3 text-sm font-semibold transition-colors ${
                  aba === 'telefone' ? 'text-white' : 'text-nova-textMuted hover:text-white'
                }`}
                onClick={() => setAba('telefone')}
              >
                POR TELEFONE
                {aba === 'telefone' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-white" />
                )}
              </button>
            </div>

            <div className="space-y-3">
              {aba === 'email' ? (
                <>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full rounded-xl border border-nova-border bg-nova-card px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-nova-blue focus:outline-none focus:ring-1 focus:ring-nova-blue/30"
                  />
                  <div className="relative">
                    <input
                      type={senhaVisivel ? 'text' : 'password'}
                      placeholder="Senha"
                      className="w-full rounded-xl border border-nova-border bg-nova-card px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-nova-blue focus:outline-none focus:ring-1 focus:ring-nova-blue/30"
                    />
                    <button
                      type="button"
                      onClick={() => setSenhaVisivel(!senhaVisivel)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-nova-textMuted transition-colors hover:text-white"
                    >
                      {senhaVisivel ? '🙈' : '👁'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <select className="w-28 rounded-xl border border-nova-border bg-nova-card px-3 py-3 text-sm text-white focus:border-nova-blue focus:outline-none">
                      <option>🇧🇷 +55</option>
                      <option>🇺🇸 +1</option>
                      <option>🇵🇹 +351</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Número de telefone"
                      className="flex-1 rounded-xl border border-nova-border bg-nova-card px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-nova-blue focus:outline-none focus:ring-1 focus:ring-nova-blue/30"
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Senha"
                    className="w-full rounded-xl border border-nova-border bg-nova-card px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-nova-blue focus:outline-none focus:ring-1 focus:ring-nova-blue/30"
                  />
                </>
              )}

              <div className="flex gap-3">
                <select className="flex-1 rounded-xl border border-nova-border bg-nova-card px-3 py-3 text-sm text-white transition-all duration-200 focus:border-nova-blue focus:outline-none">
                  <option>🇧🇷 Brasil</option>
                  <option>🇺🇸 Estados Unidos</option>
                  <option>🇵🇹 Portugal</option>
                  <option>🇦🇷 Argentina</option>
                </select>
                <select className="w-28 rounded-xl border border-nova-border bg-nova-card px-3 py-3 text-sm text-white transition-all duration-200 focus:border-nova-blue focus:outline-none">
                  <option>BRL</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="group flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={ofertasCheck}
                  onChange={() => setOfertasCheck(!ofertasCheck)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-nova-blue"
                />
                <span className="leading-relaxed text-nova-textMuted transition-colors group-hover:text-white text-xs">
                  Quero receber ofertas e bônus por e-mail e WhatsApp
                </span>
              </label>
              <label className="group flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={idadeCheck}
                  onChange={() => setIdadeCheck(!idadeCheck)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-nova-blue"
                />
                <span className="text-xs leading-relaxed text-nova-textMuted transition-colors group-hover:text-white">
                  Tenho pelo menos 18 anos e concordo com os{' '}
                  <span className="cursor-pointer text-nova-blue underline hover:text-nova-blueBright">
                    Termos de Uso
                  </span>
                </span>
              </label>
            </div>

            <button className="mt-5 w-full rounded-xl bg-nova-blue py-3 text-base font-bold text-white shadow-lg shadow-nova-blue/30 transition-colors duration-200 hover:bg-nova-blueLight active:scale-[0.98]">
              CRIAR CONTA
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 border-t border-nova-border" />
              <span className="text-xs font-medium text-nova-textMuted">OU</span>
              <div className="flex-1 border-t border-nova-border" />
            </div>

            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-nova-border bg-nova-card py-2.5 text-sm font-semibold text-white transition-colors hover:border-nova-blue">
                <span className="text-lg font-black text-nova-blueBright">
                  G
                </span>
                Google
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-nova-border bg-nova-card py-2.5 text-sm font-semibold text-white transition-colors hover:border-nova-blue">
                <span className="text-base">✈</span>
                Telegram
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-nova-textMuted">
              Já tem uma conta?{' '}
              <span className="cursor-pointer font-semibold text-nova-blue transition-colors hover:text-nova-blueBright">
                Entrar
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

