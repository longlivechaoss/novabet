"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenRoleta?: () => void;
};

type MenuItemProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  ativo?: boolean;
  onClick?: () => void;
};

type MenuItemExpansivelProps = {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  aberto: boolean;
  ativo?: boolean;
  onToggle: () => void;
  subItens: {
    icon?: ReactNode;
    label: string;
    href?: string;
    ativo?: boolean;
    onClick?: () => void;
    variante?: "submenu" | "menu";
  }[];
  onClose?: () => void;
};

const sidebarAssetPaths = {
  bonuses: "/images/icons/sidebar/bonuses.b40d86c.svg",
  casino: "/images/icons/sidebar/casino.f735a86.svg",
  jackpots: "/images/icons/sidebar/jackpots.7e94157.svg",
  liveChat: "/images/icons/sidebar/live-chat.9c040bd.svg",
  liveCasino: "/images/icons/sidebar/livecasino.4a49377.svg",
  referral: "/images/icons/sidebar/referral.0c93722.svg",
  vip: "/images/icons/sidebar/vip.2ccaf2d.svg"
} as const;

const SUGESTOES = [
  "Fortune Tiger",
  "Aviator",
  "Spaceman",
  "Fortune Ox",
  "Sweet Bonanza",
  "PG Soft",
  "Pragmatic Play",
  "Gates of Olympus",
  "Big Bass Bonanza",
  "Evolution",
  "Mines",
  "Roleta Ao Vivo"
];

export default function Sidebar({
  isOpen = true,
  onClose = () => undefined,
  onOpenRoleta: _onOpenRoleta = () => undefined
}: SidebarProps) {
  const pathname = usePathname();
  const [cassinoAberto, setCassinoAberto] = useState(true);
  const [cassinoAoVivoAberto, setCassinoAoVivoAberto] = useState(false);
  const [idiomaAberto, setIdiomaAberto] = useState(false);
  const [idiomaAtivo, setIdiomaAtivo] = useState("Português");

  const cassinoAtivo =
    pathname === "/jogos" || pathname.startsWith("/jogos/") || pathname === "/promocoes";

  function renderContent() {
    return (
      <div className="pb-6">
        <div className="px-3 pt-3">
          <div className="rounded-[14px] border border-nova-border bg-nova-darkest p-3">
            <SidebarSearch />

            {/* ÍCONES ANIMADOS — Promoções, Missões, Torneios */}
            <div className="flex items-center justify-between gap-1 border-b border-nova-border px-2 py-2">
              {[
                { src: "/images/sidebar/promocoes.webp", label: "Promoções", wobble: "icon-wobble", href: "/promocoes" },
                { src: "/images/sidebar/missoes.webp", label: "Missões", wobble: "icon-wobble-delay-1", href: "#" },
                { src: "/images/sidebar/torneios.webp", label: "Torneios", wobble: "icon-wobble-delay-2", href: "/torneios" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => onClose()}
                  className="relative flex h-[72px] cursor-pointer flex-col items-center justify-center rounded-xl pt-2.5 pb-2 md:h-[80px] md:pt-3 md:pb-2.5"
                  style={{
                    background: "linear-gradient(180deg, #1a1f35 0%, #12172a 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    overflow: "visible"
                  }}
                >
                  <span className={item.wobble}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.label}
                      width={38}
                      height={38}
                      style={{ objectFit: "contain", display: "block" }}
                    />
                  </span>

                  <span
                    className="z-10 text-[11px] font-semibold text-white"
                    style={{ marginTop: "6px", whiteSpace: "nowrap" }}
                  >
                    {item.label}
                  </span>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "55%",
                      height: "2px",
                      background: "#1652F0",
                      borderRadius: "2px 2px 0 0",
                      boxShadow: "0 0 8px 3px rgba(22,82,240,0.5)"
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav className="mt-4">
          <MenuItem
            icon={<SidebarNavIcon src={sidebarAssetPaths.bonuses} alt="Promoções" />}
            label="Promoções"
            href="/promocoes"
            ativo={pathname === "/promocoes"}
            onClick={onClose}
          />

          <MenuItemExpansivel
            icon={<SidebarNavIcon src={sidebarAssetPaths.casino} alt="Cassino" />}
            label="Cassino"
            aberto={cassinoAberto}
            ativo={cassinoAtivo}
            onToggle={() => setCassinoAberto((current) => !current)}
            onClose={onClose}
            subItens={[
              { label: "Jogos Slots", href: "/jogos?cat=slots", variante: "submenu" },
              { label: "Todos os jogos", href: "/jogos", ativo: pathname === "/jogos", variante: "submenu" },
              { label: "Mines", href: "/jogos/mines", ativo: pathname === "/jogos/mines", variante: "submenu" },
              {
                label: "Fortune Tiger",
                href: "/jogos/fortune-tiger",
                ativo: pathname === "/jogos/fortune-tiger",
                variante: "submenu"
              },
              { label: "Aviator", href: "/jogos/aviator", ativo: pathname === "/jogos/aviator", variante: "submenu" },
              { label: "Spaceman", href: "/jogos/spaceman", ativo: pathname === "/jogos/spaceman", variante: "submenu" }
            ]}
          />

          <MenuItemExpansivel
            icon={<SidebarNavIcon src={sidebarAssetPaths.liveCasino} alt="Cassino ao Vivo" />}
            label="Cassino ao Vivo"
            aberto={cassinoAoVivoAberto}
            onToggle={() => setCassinoAoVivoAberto((current) => !current)}
            onClose={onClose}
            subItens={[
              { label: "Roleta", href: "/jogos?cat=live-roleta", variante: "submenu" },
              { label: "Blackjack", href: "/jogos?cat=live-blackjack", variante: "submenu" },
              { label: "Bacará", href: "/jogos?cat=live-bacara", variante: "submenu" },
              { label: "Game Shows", href: "/jogos?cat=game-shows", variante: "submenu" }
            ]}
          />

          <MenuItem icon={<SidebarNavIcon src={sidebarAssetPaths.jackpots} alt="Jackpots" />} label="Jackpots" href="#" />
          <MenuItem icon={<SidebarNavIcon src={sidebarAssetPaths.vip} alt="VIP Club" />} label="VIP Club" href="#" />
          <MenuItem
            icon={<SidebarNavIcon src={sidebarAssetPaths.referral} alt="Indicação" />}
            label="Indicação"
            href="#"
          />

          <div className="mx-4 my-3 border-t border-nova-border" />

          <MenuItem
            icon={<SidebarNavIcon src={sidebarAssetPaths.liveChat} alt="Suporte" />}
            label="Suporte"
            href="/suporte"
            ativo={pathname === "/suporte"}
            onClick={onClose}
          />
          <MenuItem icon={<SidebarPhoneIcon />} label="Instalar App" href="#" />

          <MenuItemExpansivel
            icon={<SidebarGlobeIcon />}
            label="Idioma"
            sublabel={idiomaAtivo}
            aberto={idiomaAberto}
            onToggle={() => setIdiomaAberto((current) => !current)}
            onClose={onClose}
            subItens={[
              {
                icon: <SidebarLangCode code="PT" />,
                label: "Português",
                ativo: idiomaAtivo === "Português",
                onClick: () => setIdiomaAtivo("Português")
              },
              {
                icon: <SidebarLangCode code="EN" />,
                label: "English",
                ativo: idiomaAtivo === "English",
                onClick: () => setIdiomaAtivo("English")
              },
              {
                icon: <SidebarLangCode code="ES" />,
                label: "Español",
                ativo: idiomaAtivo === "Español",
                onClick: () => setIdiomaAtivo("Español")
              }
            ]}
          />
        </nav>
      </div>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 z-[70] h-[calc(100vh-(var(--top-banner-height,36px)+56px))] w-[240px] overflow-y-auto border-r border-nova-border bg-nova-darkest transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "calc(var(--top-banner-height, 36px) + 56px)" }}
      >
        {renderContent()}
      </aside>

      <aside
        className="fixed left-0 z-40 hidden h-[calc(100vh-(var(--top-banner-height,36px)+56px))] w-[240px] overflow-y-auto border-r border-nova-border bg-nova-darkest lg:block"
        style={{ top: "calc(var(--top-banner-height, 36px) + 56px)" }}
      >
        {renderContent()}
      </aside>
    </>
  );
}

function SidebarSearch() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [sugestaoIndex, setSugestaoIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    const sugestaoAtual = SUGESTOES[sugestaoIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!apagando) {
      if (charIndex < sugestaoAtual.length) {
        timeoutId = setTimeout(() => {
          setPlaceholderText(sugestaoAtual.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
      } else {
        timeoutId = setTimeout(() => {
          setApagando(true);
        }, 1500);
      }
    } else if (charIndex > 0) {
      timeoutId = setTimeout(() => {
        setPlaceholderText(sugestaoAtual.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else {
      timeoutId = setTimeout(() => {
        setApagando(false);
        setSugestaoIndex((i) => (i + 1) % SUGESTOES.length);
      }, 0);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, apagando, sugestaoIndex]);

  return (
    <div className="h-[36px] w-full rounded-[10px] border border-nova-border bg-nova-card">
      <div className="relative h-full">
        <div className="pointer-events-none absolute left-[11px] top-1/2 -translate-y-1/2 text-nova-textMuted">
          <SidebarSearchIcon />
        </div>
        <input
          type="text"
          placeholder={`Buscar ${placeholderText}|`}
          className="h-full w-full bg-transparent py-0 pl-[29px] pr-[10px] text-[10px] font-medium tracking-[0.01em] text-nova-text placeholder:text-nova-textMuted outline-none"
        />
      </div>
    </div>
  );
}

function MenuItem({ icon, label, href = "#", ativo = false, onClick }: MenuItemProps) {
  const className = `flex items-center gap-3.5 border-l-[3px] px-4 py-[11px] transition-all ${
    ativo
      ? "border-nova-blue bg-nova-card text-white"
      : "border-transparent text-nova-textMuted hover:bg-nova-card hover:text-white"
  }`;

  if (href !== "#") {
    return (
      <Link href={href} className={className} onClick={onClick}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center">{icon}</span>
        <span className="text-[13px] font-medium leading-none tracking-[0.01em]">{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${className} w-full text-left`}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center">{icon}</span>
      <span className="text-[13px] font-medium leading-none tracking-[0.01em]">{label}</span>
    </button>
  );
}

function MenuItemExpansivel({
  icon,
  label,
  sublabel,
  aberto,
  ativo = false,
  onToggle,
  subItens,
  onClose
}: MenuItemExpansivelProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between border-l-[3px] px-4 py-[11px] text-left transition-all ${
          ativo
            ? "border-nova-blue bg-nova-card text-white"
            : "border-transparent text-nova-textMuted hover:bg-nova-card hover:text-white"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">{icon}</span>
          <span className="text-[13px] font-medium leading-none tracking-[0.01em]">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {sublabel ? <span className="text-xs text-nova-textMuted">{sublabel}</span> : null}
          <span className={`transition-transform ${aberto ? "rotate-180" : ""}`}>
            <SidebarChevronIcon />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {aberto ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {subItens.map((item) =>
              item.href && item.href !== "#" ? (
                <Link
                  key={`${label}-${item.label}`}
                  href={item.href}
                  onClick={onClose}
                  className={
                    item.variante === "submenu"
                      ? `block py-1.5 pl-6 pr-4 text-[12px] leading-none transition-colors ${
                          item.ativo ? "text-white" : "text-white/70 hover:text-white"
                        }`
                      : `flex items-center gap-3 py-2 pl-12 pr-4 text-sm transition-colors ${
                          item.ativo
                            ? "bg-nova-card text-white"
                            : "text-nova-textMuted hover:bg-nova-card/60 hover:text-white"
                        }`
                  }
                >
                  {item.variante !== "submenu" ? (
                    <span className="flex h-[14px] w-[14px] items-center justify-center">{item.icon}</span>
                  ) : null}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={`${label}-${item.label}`}
                  type="button"
                  onClick={() => {
                    item.onClick?.();
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-3 py-2 pl-12 pr-4 text-left text-sm transition-colors ${
                    item.ativo
                      ? "bg-nova-card text-white"
                      : "text-nova-textMuted hover:bg-nova-card/60 hover:text-white"
                  }`}
                >
                  <span className="flex h-[14px] w-[14px] items-center justify-center">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SidebarNavIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={28}
      height={28}
      className="h-7 w-7 object-contain opacity-100 [filter:brightness(0)_invert(1)]"
    />
  );
}

function SidebarLangCode({ code }: { code: string }) {
  return (
    <span className="inline-flex min-w-[18px] items-center justify-center rounded-sm bg-nova-elevated px-1 py-[2px] text-[9px] font-semibold leading-none text-nova-text">
      {code}
    </span>
  );
}

function SidebarSearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.5 11.5L14 14M12.667 7.333A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-nova-textMuted">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarPhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-nova-text">
      <rect x="5.2" y="1.8" width="7.6" height="14.4" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.4 4.2H10.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="13.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

function SidebarGlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-nova-text">
      <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.8 9H15.2M9 2.8C10.5 4.45 11.35 6.64 11.35 9C11.35 11.36 10.5 13.55 9 15.2M9 2.8C7.5 4.45 6.65 6.64 6.65 9C6.65 11.36 7.5 13.55 9 15.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
