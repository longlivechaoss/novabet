export interface Jogo {
  id: number;
  nome: string;
  emoji: string;
  gradient: string;
  imagem?: string;
  badge?: "HOT" | "NOVO" | "TOP";
}

export interface BannerPrincipal {
  id: number;
  imagem: string;
  link: string;
  alt: string;
  gradient: string;
  tag: string;
  titulo: string;
  destaque: string;
  subtitulo: string;
  botao: string;
}

export interface BannerLateral {
  id: number;
  imagem: string;
  link: string;
  alt: string;
  gradient: string;
}

/** Carrossel da home (mobile) — ficheiros em /public/images/banners/ */
export interface BannerMobile {
  id: number;
  src: string;
  alt: string;
  href: string;
}

export const jogosRecomendados: Jogo[] = [
  {
    id: 1,
    nome: "Fortune Tiger",
    emoji: "🐯",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/ftg.webp"
  },
  {
    id: 2,
    nome: "Crazy Time",
    emoji: "🎪",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/crazy-time.webp"
  },
  {
    id: 3,
    nome: "Lightning Roulette",
    emoji: "⚡",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/lightning-roulette.webp"
  },
  {
    id: 4,
    nome: "Monopoly Live",
    emoji: "🎩",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/monopoly-live.webp"
  },
  {
    id: 5,
    nome: "Mega Ball",
    emoji: "🎱",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/mega-ball.webp"
  },
  {
    id: 6,
    nome: "Dream Catcher",
    emoji: "🎡",
    gradient: "from-nova-card to-nova-elevated",
    imagem: "/images/jogos/dream-catcher.webp"
  }
];

/** Alias da lista de jogos (mesmo conteúdo que `jogosRecomendados`) */
export const jogos = jogosRecomendados;

// ---------------------------------------------------------------------------
// BANNERS — edite os arrays abaixo (caminhos relativos a /public)
// ---------------------------------------------------------------------------
// Principal (desktop): upload 1720×720 → exibido ~860×360 | ficheiros em /public/images/
// Laterais: 760×340 → exibido ~380×170
// Mobile: 750×380 → /public/images/banners/
// Formato: WebP ~85%
//
export const banners: BannerPrincipal[] = [
  {
    id: 1,
    imagem: "/images/BANNER-1.webp",
    link: "#",
    alt: "Banner Principal 1",
    gradient: "from-nova-card to-nova-elevated",
    tag: "",
    titulo: "",
    destaque: "",
    subtitulo: "",
    botao: ""
  },
  {
    id: 2,
    imagem: "/images/BANNER-2.webp",
    link: "#",
    alt: "Banner Principal 2",
    gradient: "from-nova-card to-nova-elevated",
    tag: "",
    titulo: "",
    destaque: "",
    subtitulo: "",
    botao: ""
  }
];

export const bannersLaterais: BannerLateral[] = [
  {
    id: 1,
    imagem: "/images/BANNER-P1.webp",
    link: "#",
    alt: "Banner Lateral 1",
    gradient: "from-nova-card to-nova-elevated"
  },
  {
    id: 2,
    imagem: "/images/BANNER-P2.webp",
    link: "#",
    alt: "Banner Lateral 2",
    gradient: "from-nova-card to-nova-elevated"
  }
];

export const bannersMobile: BannerMobile[] = [
  { id: 1, src: "/images/banners/mobile-1.webp", alt: "Promoção 1", href: "/" },
  { id: 2, src: "/images/banners/mobile-2.webp", alt: "Promoção 2", href: "/" },
  { id: 3, src: "/images/banners/mobile-3.webp", alt: "Promoção 3", href: "/" },
  { id: 4, src: "/images/banners/mobile-4.webp", alt: "Promoção 4", href: "/" }
];

// BANNER PROMOCIONAL (horizontal longo):
// Tamanho: 1920 x 320 px (proporção 6:1)
// Formato: WebP com qualidade 85
// Arquivo: public/images/banners/banner-meio.webp
//
// DESIGN:
// - Texto chamativo à esquerda (título + valor + botão)
// - Imagem/personagem à direita
// - Fundo com gradiente ou cena temática
// - Altura no site: 160px (imagem será cropada)
export const bannerPromocional = {
  id: 1,
  imagem: "/images/banners/banner-meio.webp",
  link: "#",
  alt: "Banner Promocional",
  gradient: "from-nova-card to-nova-elevated"
};
