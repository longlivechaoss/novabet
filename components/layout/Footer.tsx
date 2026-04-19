"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-12 w-full overflow-hidden">
      {/* BLOCO SUPERIOR — azul escuro (main footer) */}
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(to bottom, #0D1F4A 0%, #071230 100%)"
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full border-[40px] opacity-[0.03]"
            style={{ borderColor: "#3B6FFF" }}
          />
          <div
            className="absolute -right-10 top-20 h-[300px] w-[300px] rounded-full border-[30px] opacity-[0.03]"
            style={{ borderColor: "#3B6FFF" }}
          />
          <div
            className="absolute bottom-40 left-1/2 h-[200px] w-[200px] rounded-full border-[20px] opacity-[0.02]"
            style={{ borderColor: "#3B6FFF" }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:gap-8 md:px-8">
            <div>
              <h3 className="mb-3 border-l-2 border-nova-blue pl-3 text-xs font-semibold uppercase tracking-wider text-white/80 md:text-sm">
                Serviços
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link href="/promocoes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Promoções
                  </Link>
                </li>
                <li>
                  <Link href="/torneios" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Torneios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    VIP Club
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Indicação
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Jackpots
                  </Link>
                </li>
              </ul>

              <div className="mt-6">
                <button className="flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                  <span>🇧🇷</span>
                  <span>Português</span>
                  <span className="text-xs">▼</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 border-l-2 border-nova-blue pl-3 text-xs font-semibold uppercase tracking-wider text-white/80 md:text-sm">
                Informações
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Informações de Apostas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Regras de Apostas
                  </Link>
                </li>
                <li>
                  <Link href="/suporte" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/termos" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jogo-responsavel"
                    className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm"
                  >
                    Jogo Responsável
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Política de Autoexclusão
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Política KYC
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 border-l-2 border-nova-blue pl-3 text-xs font-semibold uppercase tracking-wider text-white/80 md:text-sm">
                Esportes
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Apostas ao Vivo
                  </Link>
                </li>
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Futebol
                  </Link>
                </li>
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Basquete
                  </Link>
                </li>
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Tênis
                  </Link>
                </li>
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Vôlei
                  </Link>
                </li>
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    eSports
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 border-l-2 border-nova-blue pl-3 text-xs font-semibold uppercase tracking-wider text-white/80 md:text-sm">
                Programa de Afiliados
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-white/50 md:text-sm">
                Faça parte do nosso time de vencedores! Junte-se ao programa de afiliados da NovaBet e
                ganhe dinheiro por cada jogador indicado. Quanto mais jogadores você levar, mais alto você
                sobe no ranking de comissões.{" "}
                <Link href="#" className="font-semibold text-nova-blue transition-colors hover:text-nova-blueLight">
                  Cadastre-se agora!
                </Link>
              </p>
            </div>

            <div>
              <h3 className="mb-3 border-l-2 border-nova-blue pl-3 text-xs font-semibold uppercase tracking-wider text-white/80 md:text-sm">
                Jogue Agora
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li>
                  <Link href="/" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Cassino
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Cassino ao Vivo
                  </Link>
                </li>
                <li>
                  <Link href="/esportes" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Esportes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block py-0.5 text-xs text-white/50 transition-colors hover:text-white md:text-sm">
                    Esportes Virtuais
                  </Link>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="mb-2 text-[10px] uppercase tracking-widest text-white/40 md:text-xs">Siga-nos</h4>
                <div className="mt-2 flex gap-2 md:gap-3">
                  {["📷", "📘", "🐦", "✈️", "▶️"].map((icon) => (
                    <a
                      key={icon}
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-nova-border bg-nova-card text-sm text-white transition-colors hover:border-nova-blue hover:bg-nova-blue"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAIXA DE PAGAMENTOS */}
      <div
        className="flex w-full flex-col items-center px-6 py-5"
        style={{ background: "linear-gradient(to bottom, #071230 0%, #040C1E 100%)" }}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start md:gap-4">
          {[
            { src: "/images/pagamentos/Pix.svg", alt: "Pix" },
            { src: "/images/pagamentos/BancoDoBrasil.svg", alt: "Banco do Brasil" },
            { src: "/images/pagamentos/BancoBradesco.svg", alt: "Bradesco" },
            { src: "/images/pagamentos/Itau.svg", alt: "Itaú" },
            { src: "/images/pagamentos/Caixa.svg", alt: "Caixa" },
            { src: "/images/pagamentos/Santander.svg", alt: "Santander" },
            { src: "/images/pagamentos/Astropay.svg", alt: "AstroPay" }
          ].map((metodo) => (
            // eslint-disable-next-line @next/next/no-img-element -- logos locais em /public, hover via opacity
            <img
              key={metodo.alt}
              src={metodo.src}
              alt={metodo.alt}
              style={{
                height: "28px",
                width: "auto",
                opacity: 0.65,
                filter: "brightness(0) invert(1)",
                transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.65";
              }}
            />
          ))}
        </div>
      </div>

      {/* BLOCO INFERIOR — barra de copyright, bem escuro */}
      <div
        className="flex w-full flex-col items-center justify-between gap-2 px-6 py-4 text-sm text-white/40 md:flex-row"
        style={{
          background: "#040C1E",
          borderTop: "1px solid rgba(255,255,255,0.06)"
        }}
      >
        <div className="flex items-center gap-4 text-xs">
          <span className="rounded border border-nova-border px-2 py-1 font-bold text-white">18+</span>
          <span>JOGO RESPONSÁVEL</span>
          <span>•</span>
          <span>BeGambleAware</span>
        </div>
        <p className="text-center text-xs md:text-right">
          © 2026 NovaBet. Todos os direitos reservados. Proibido para menores de 18 anos. Jogue com
          responsabilidade.
        </p>
      </div>
    </footer>
  );
}
