"use client";

/*
 * MOBILE BANNER DIMENSIONS (para criar no Photoshop/Canva):
 * Largura: 750px | Altura: 380px | Proporção: ~2:1
 * O banner ocupa calc(100vw - 40px) na tela
 * Em iPhone 14 Pro Max (430px): ~390px de largura visível
 * Arquivos em /public/images/banners/ — se usar .png em vez de .webp, ajuste o array mobileBanners abaixo.
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { banners, bannersLaterais } from "@/data/jogos";

/** Banners dedicados ao carrossel mobile (ficheiros em /public/images/banners/) */
const mobileBanners = [
  { src: "/images/banners/mobile-1.webp", alt: "Promoção 1", href: "/" },
  { src: "/images/banners/mobile-2.webp", alt: "Promoção 2", href: "/" },
  { src: "/images/banners/mobile-3.webp", alt: "Promoção 3", href: "/" },
  { src: "/images/banners/mobile-4.webp", alt: "Promoção 4", href: "/" }
];

export default function BannerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mainFailedImages, setMainFailedImages] = useState<Record<number, boolean>>({});
  const [sideFailedImages, setSideFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMobileActiveIndex((current) => (current + 1) % mobileBanners.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const totalSlides = banners.length;

  function goPrevSlide() {
    setActiveIndex((i) => (i - 1 + totalSlides) % totalSlides);
  }

  function goNextSlide() {
    setActiveIndex((i) => (i + 1) % totalSlides);
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* MOBILE BANNER */}
      <div
        className="block md:hidden"
        style={{ position: 'relative', height: '160px', margin: '8px -16px 20px', overflow: 'hidden' }}
      >
        {mobileBanners.map((banner, index) => {
          let offset = index - mobileActiveIndex;
          if (offset < -1) offset += mobileBanners.length;
          if (offset > 1) offset -= mobileBanners.length;
          if (Math.abs(offset) > 1) return null;

          return (
            <div
              key={banner.src}
              onClick={() => offset !== 0 && setMobileActiveIndex(index)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '80%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                transform: `translate(-50%, -50%) translateX(${offset * 92}%) scale(${offset === 0 ? 1 : 0.82})`,
                zIndex: offset === 0 ? 10 : 5,
                opacity: offset === 0 ? 1 : 0.45,
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: offset === 0 ? 'default' : 'pointer',
                boxShadow: offset === 0 ? '0 8px 24px rgba(0,0,0,0.5)' : 'none',
              }}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          );
        })}

        {/* Arrow Left */}
        <button
          type="button"
          onClick={() =>
            setMobileActiveIndex((i) => (i - 1 + mobileBanners.length) % mobileBanners.length)
          }
          style={{
            position: 'absolute',
            left: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#1652F0',
            boxShadow: '0 0 12px rgba(22,82,240,0.6)',
            border: 'none',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ‹
        </button>

        {/* Arrow Right */}
        <button
          type="button"
          onClick={() => setMobileActiveIndex((i) => (i + 1) % mobileBanners.length)}
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#1652F0',
            boxShadow: '0 0 12px rgba(22,82,240,0.6)',
            border: 'none',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ›
        </button>

        {/* Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '-18px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
          }}
        >
          {mobileBanners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMobileActiveIndex(i)}
              style={{
                width: i === mobileActiveIndex ? '14px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === mobileActiveIndex ? '#1652F0' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP — carrossel largura total */}
      <div
        className="relative hidden h-[360px] w-full overflow-hidden rounded-xl border border-nova-card/60 bg-nova-card md:block"
        style={{ boxShadow: "0 0 30px rgba(22, 82, 240, 0.14)" }}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((slide) => (
            <a
              key={slide.id}
              href={slide.link}
              className="relative h-full min-w-full shrink-0"
              aria-label={slide.alt}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

              {!mainFailedImages[slide.id] ? (
                <img
                  src={slide.imagem}
                  alt={slide.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() =>
                    setMainFailedImages((current) => ({ ...current, [slide.id]: true }))
                  }
                />
              ) : null}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={goPrevSlide}
          aria-label="Slide anterior"
          className="border-0 p-0"
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#1652F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px 6px rgba(22,82,240,0.55)",
            color: "white",
            cursor: "pointer",
            zIndex: 30
          }}
        >
          ◀
        </button>

        <button
          type="button"
          onClick={goNextSlide}
          aria-label="Próximo slide"
          className="border-0 p-0"
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#1652F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px 6px rgba(22,82,240,0.55)",
            color: "white",
            cursor: "pointer",
            zIndex: 30
          }}
        >
          ▶
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {banners.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Ir para slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-3 rounded-full transition ${
                activeIndex === index ? "bg-nova-blue shadow-lg shadow-nova-blue/25" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-2 xl:h-[360px] xl:grid-cols-1 xl:grid-rows-2">
        {bannersLaterais.map((banner) => (
          <motion.a
            key={banner.id}
            href={banner.link}
            whileHover={{ scale: 1.02 }}
            className="relative h-[170px] overflow-hidden rounded-xl border xl:h-full"
            style={{ borderColor: "rgba(46, 48, 69, 0.95)" }}
            aria-label={banner.alt}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient}`} />

            {!sideFailedImages[banner.id] ? (
              <img
                src={banner.imagem}
                alt={banner.alt}
                className="absolute inset-0 h-full w-full object-cover"
                onError={() =>
                  setSideFailedImages((current) => ({ ...current, [banner.id]: true }))
                }
              />
            ) : null}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
