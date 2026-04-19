"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Notificacoes from "@/components/layout/Notificacoes";
import SeletorIdioma from "@/components/layout/SeletorIdioma";

type HeaderProps = {
  onToggleSidebar?: () => void;
  onOpenCadastro?: () => void;
  onOpenLogin?: () => void;
  onOpenDeposito?: () => void;
  onOpenSaque?: () => void;
  onLogout?: () => void;
  isLogado?: boolean;
  showSidebarToggle?: boolean;
};

export default function Header({
  onToggleSidebar = () => undefined,
  onOpenCadastro = () => undefined,
  onOpenLogin = () => undefined,
  onOpenDeposito = () => undefined,
  onOpenSaque = () => undefined,
  onLogout = () => undefined,
  isLogado = false,
  showSidebarToggle = true
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarMenuMobileRef = useRef<HTMLDivElement | null>(null);
  const avatarMenuDesktopRef = useRef<HTMLDivElement | null>(null);
  const modoAtivo = pathname === "/esportes" ? "sport" : "casino";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const t = event.target;
      if (!(t instanceof Node)) return;
      if (
        avatarMenuMobileRef.current?.contains(t) ||
        avatarMenuDesktopRef.current?.contains(t)
      ) {
        return;
      }
      setAvatarMenuOpen(false);
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logo = (
    <Link href="/" aria-label="NovaBet">
      <motion.img
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src="/images/logo-novabet.webp"
        alt="NovaBet"
        className="h-6 w-auto object-contain md:h-8"
      />
    </Link>
  );

  return (
    <header className="fixed left-0 right-0 top-[var(--top-banner-height,0px)] z-50 w-full border-b border-white/10 bg-[#0D0F1E] md:border-nova-border md:bg-nova-darkest">
      {/* Mobile: largura total — hamburger + logo | só 2 ações principais */}
      <div className="flex h-[52px] w-full items-center justify-between px-3 md:hidden">
        <div className="flex items-center gap-2">
          {showSidebarToggle ? (
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={onToggleSidebar}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-nova-border bg-nova-card text-lg text-nova-text transition hover:border-nova-blue hover:bg-nova-elevated"
            >
              ☰
            </button>
          ) : null}
          {logo}
          <button
            type="button"
            aria-label="Buscar"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-nova-border bg-nova-card text-nova-text transition hover:border-nova-blue hover:bg-nova-elevated"
            style={{ fontSize: "15px" }}
          >
            🔍
          </button>
        </div>

        <div className="flex items-center gap-2">
          {!isLogado ? (
            <>
              <button
                type="button"
                onClick={onOpenCadastro}
                className="whitespace-nowrap rounded-full bg-nova-blue px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-nova-blueLight"
              >
                Registre-se
              </button>
              <button
                type="button"
                onClick={onOpenLogin}
                className="whitespace-nowrap rounded-full border border-nova-border px-3 py-1.5 text-xs font-medium text-white transition hover:border-nova-blue hover:bg-nova-card"
              >
                Entrar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpenDeposito}
                className="rounded-full bg-nova-blue px-2.5 py-1.5 text-[10px] font-bold text-white"
              >
                DEPOSITAR
              </button>
              <div className="relative" ref={avatarMenuMobileRef}>
                <button
                  type="button"
                  onClick={() => setAvatarMenuOpen((current) => !current)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-nova-blue text-sm font-bold text-white"
                  aria-label="Abrir menu do perfil"
                >
                  T
                </button>
                {avatarMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-[60] min-w-[160px] rounded-2xl border border-nova-blue/20 bg-nova-card p-2 shadow-2xl shadow-black/30">
                    <Link
                      href="/minha-conta"
                      onClick={() => setAvatarMenuOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-nova-textMuted transition hover:bg-nova-elevated hover:text-white"
                    >
                      Minha Conta
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setAvatarMenuOpen(false);
                      }}
                      className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-nova-textMuted transition hover:bg-nova-elevated hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop / tablet */}
      <div className="hidden h-[56px] w-full items-center justify-between overflow-hidden px-4 md:flex lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {showSidebarToggle ? (
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={onToggleSidebar}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-nova-border bg-nova-card text-lg text-nova-text transition hover:border-nova-blue hover:bg-nova-elevated"
            >
              ☰
            </button>
          ) : null}

          <div className="min-w-0 shrink">{logo}</div>

          <div className="ml-1 flex min-w-0 items-center gap-0 rounded-full border border-nova-border bg-nova-card p-1">
            <button
              type="button"
              onClick={() => router.push("/")}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:text-sm ${
                modoAtivo === "casino"
                  ? "bg-nova-elevated text-white"
                  : "text-nova-textMuted hover:text-white"
              }`}
            >
              <img
                src="/images/icons/sidebar/brancos/casino.f735a86.svg"
                alt="Casino"
                className="h-4 w-4"
              />
              <span>Casino</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/esportes")}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:text-sm ${
                modoAtivo === "sport"
                  ? "bg-nova-elevated text-white"
                  : "text-nova-textMuted hover:text-white"
              }`}
            >
              <img
                src="/images/icons/sidebar/brancos/sport.c272e89.svg"
                alt="Sport"
                className="h-4 w-4"
              />
              <span>Sport</span>
            </button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!isLogado ? (
            <>
              <div className="hidden items-center gap-2 text-sm text-white/60 md:flex">
                <Link href="/jogo-responsavel" className="transition hover:text-white">
                  Jogo Responsável
                </Link>
                <SeletorIdioma />
              </div>
              <button
                type="button"
                onClick={onOpenCadastro}
                className="whitespace-nowrap rounded-full bg-nova-blue px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-nova-blueLight md:px-5 md:py-2 md:text-sm"
              >
                Registre-se
              </button>
              <button
                type="button"
                onClick={onOpenLogin}
                className="whitespace-nowrap rounded-full border border-nova-border px-3 py-1.5 text-xs font-medium text-white transition hover:border-nova-blue hover:bg-nova-card md:px-4 md:py-2 md:text-sm"
              >
                Entrar
              </button>
            </>
          ) : (
            <>
              <div className="hidden items-center gap-2 md:flex">
                <div className="rounded-full border border-green-700/40 bg-green-900/40 px-4 py-2 text-sm font-bold text-nova-green">
                  💰 R$ 1.250,00
                </div>

                <button
                  type="button"
                  onClick={onOpenSaque}
                  className="rounded-full border border-nova-border bg-nova-card px-5 py-2 text-sm font-bold text-nova-blueBright transition hover:border-nova-blue hover:bg-nova-elevated"
                >
                  Sacar
                </button>

                <button
                  type="button"
                  onClick={onOpenDeposito}
                  className="rounded-full bg-nova-blue px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
                >
                  DEPOSITAR
                </button>

                <Notificacoes />
              </div>

              <div className="relative hidden md:block" ref={avatarMenuDesktopRef}>
                <button
                  type="button"
                  onClick={() => setAvatarMenuOpen((current) => !current)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-nova-blue text-sm font-bold text-white transition hover:bg-nova-blue"
                  aria-label="Abrir menu do perfil"
                >
                  T
                </button>

                {avatarMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-[60] min-w-[160px] rounded-2xl border border-nova-blue/20 bg-nova-card p-2 shadow-2xl shadow-black/30">
                    <Link
                      href="/minha-conta"
                      onClick={() => setAvatarMenuOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-nova-textMuted transition hover:bg-nova-elevated hover:text-white"
                    >
                      Minha Conta
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setAvatarMenuOpen(false);
                      }}
                      className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-nova-textMuted transition hover:bg-nova-elevated hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                ) : null}
              </div>

              <SeletorIdioma />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
