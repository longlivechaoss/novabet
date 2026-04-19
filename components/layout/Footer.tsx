"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const footerSections = [
  {
    title: "Esportes",
    links: [
      { label: "Esportes", href: "#" },
      { label: "Regras de apostas", href: "#" },
      { label: "Ao Vivo", href: "#" },
    ],
  },
  {
    title: "Cassino",
    links: [
      { label: "Todos os Jogos", href: "/jogos" },
      { label: "Promoções", href: "#" },
      { label: "Jackpots", href: "#" },
      { label: "VIP Club", href: "#" },
      { label: "Cassino ao Vivo", href: "#" },
    ],
  },
  {
    title: "Sobre Nós",
    links: [
      { label: "Sobre Nós", href: "#" },
      { label: "Contato", href: "#" },
      { label: "Afiliados", href: "#" },
      { label: "Termos de Uso", href: "#" },
      { label: "Política de Privacidade", href: "#" },
    ],
  },
  {
    title: "Ajuda ao Cliente",
    links: [
      { label: "Jogo Responsável", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Suporte", href: "#" },
      { label: "Política KYC", href: "#" },
    ],
  },
  {
    title: "Aplicativos Móveis",
    links: [
      { label: "Android (.APK)", href: "#" },
      { label: "Instalar App", href: "#" },
    ],
  },
];

const linkMotion = { whileHover: { x: 4 } as const, transition: { type: "spring" as const, stiffness: 400, damping: 20 } };

function AccordionSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-nova-border md:border-none">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300 md:mb-3 md:cursor-default md:py-0"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform md:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-2 overflow-hidden pb-3"
            >
              {links.map((link) => (
                <li key={link.label}>
                  <motion.div {...linkMotion}>
                    <Link href={link.href} className="text-sm text-gray-400 transition hover:text-white">
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <ul className="hidden flex-col gap-2 md:flex">
        {links.map((link) => (
          <li key={link.label}>
            <motion.div {...linkMotion}>
              <Link href={link.href} className="text-sm text-gray-400 transition hover:text-white">
                {link.label}
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const sealsData = [
  { src: "/images/pagamentos/ebac-gray.png", alt: "EBAC", width: 80, height: 28 },
  {
    src: "/images/pagamentos/Logo_-_pix_powered_by_Banco_Central_(Brazil,_2020).png",
    alt: "PIX",
    width: 100,
    height: 28,
  },
  { src: "/images/pagamentos/18plus.png", alt: "18+", width: 36, height: 36 },
  { src: "/images/pagamentos/gambleaware.png", alt: "BeGambleAware", width: 130, height: 28 },
  { src: "/images/pagamentos/logo-govbr.png", alt: "gov.br", width: 72, height: 28 },
  { src: "/images/pagamentos/logo-conar.png", alt: "CONAR", width: 80, height: 28 },
];

export default function Footer() {
  const sealsRef = useRef(null);
  const sealsInView = useInView(sealsRef, { once: true, margin: "-50px" });

  return (
    <footer className="mt-8 border-t border-nova-border bg-nova-bg">
      {/* Colunas de links */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-8">
          {footerSections.map((section) => (
            <AccordionSection key={section.title} title={section.title} links={section.links} />
          ))}
        </div>
      </div>

      <div className="border-t border-nova-border" />

      {/* Redes sociais */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-center gap-6">
          {/* Instagram */}
          <motion.a
            href="#"
            aria-label="Instagram"
            className="text-gray-400 transition"
            whileHover={{ scale: 1.2, color: "#E1306C", filter: "drop-shadow(0 0 8px #E1306C)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </motion.a>
          {/* TikTok */}
          <motion.a
            href="#"
            aria-label="TikTok"
            className="text-gray-400 transition"
            whileHover={{ scale: 1.2, color: "#ffffff", filter: "drop-shadow(0 0 8px #ffffff)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
            </svg>
          </motion.a>
          {/* X/Twitter */}
          <motion.a
            href="#"
            aria-label="Twitter"
            className="text-gray-400 transition"
            whileHover={{ scale: 1.2, color: "#ffffff", filter: "drop-shadow(0 0 8px #ffffff)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
          {/* Telegram */}
          <motion.a
            href="#"
            aria-label="Telegram"
            className="text-gray-400 transition"
            whileHover={{ scale: 1.2, color: "#29B6F6", filter: "drop-shadow(0 0 8px #29B6F6)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </motion.a>
          {/* YouTube */}
          <motion.a
            href="#"
            aria-label="YouTube"
            className="text-gray-400 transition"
            whileHover={{ scale: 1.2, color: "#FF0000", filter: "drop-shadow(0 0 8px #FF0000)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </motion.a>
        </div>
      </div>

      <div className="border-t border-nova-border" />

      {/* Selos de certificação */}
      <div ref={sealsRef} className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {sealsData.map((seal, i) => (
            <motion.div
              key={seal.alt}
              initial={{ opacity: 0, y: 16 }}
              animate={sealsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            >
              <Image
                src={seal.src}
                alt={seal.alt}
                width={seal.width}
                height={seal.height}
                className="object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-nova-border" />

      {/* Texto legal */}
      <div className="mx-auto max-w-4xl px-4 py-6 text-center">
        <p className="text-xs leading-relaxed text-gray-500">
          Proibido para menores de 18 anos. Jogar sem controle causa dependência. O jogo é entretenimento, jogue com moderação.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          É terminantemente proibido o uso de recursos provenientes de programas de assistência social, como Bolsa Família e BPC/LOAS, em jogos ou apostas de quota-fixa.
        </p>
        <p className="mt-3 text-xs text-gray-600">
          Suporte ao Cliente: <span className="text-gray-400">suporte@novabet.com</span> | Chat online 24h | Telefone: 0800-000-0000
        </p>
      </div>

      {/* Copyright */}
      <div className="border-t border-nova-border bg-nova-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 md:flex-row">
          <span>© 2026 NovaBet. Todos os direitos reservados.</span>
          <span>Proibido para menores de 18 anos. Jogue com responsabilidade.</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-600">18+</span>
            <span>•</span>
            <span>JOGO RESPONSÁVEL</span>
            <span>•</span>
            <span>BeGambleAware</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
