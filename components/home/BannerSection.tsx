"use client";

/*
 * Banners: URLs da tabela `banners` no Supabase (hook useBanners + Realtime).
 * Mobile: 750×380px — ver comentários anteriores no repositório.
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { useBanners } from "@/hooks/useBanners";

export default function BannerSection() {
  const bannerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mainFailedImages, setMainFailedImages] = useState<Record<number, boolean>>({});
  const [sideFailedImages, setSideFailedImages] = useState<Record<number, boolean>>({});

  const { principal: bannersDB, lateral: lateraisDB, mobile: mobileDB, loading: bannersLoading } =
    useBanners();

  const slidesParaRenderizar = useMemo(
    () =>
      bannersDB.length > 0
        ? bannersDB.map((b, i) => ({
            id: i + 1,
            imagem: b.url,
            link: "#",
            alt: b.label,
            gradient: "from-nova-card to-nova-elevated"
          }))
        : [],
    [bannersDB]
  );

  const lateraisParaRenderizar = useMemo(
    () =>
      lateraisDB.length > 0
        ? lateraisDB.map((b, i) => ({
            id: i + 1,
            imagem: b.url,
            link: "#",
            alt: b.label,
            gradient: "from-nova-card to-nova-elevated"
          }))
        : [],
    [lateraisDB]
  );

  const mobileBanners = useMemo(
    () => (mobileDB.length > 0 ? mobileDB.map((b) => ({ src: b.url, alt: b.label, href: "/" })) : []),
    [mobileDB]
  );

  const mainSlideCount = slidesParaRenderizar.length;
  const mobileSlideCount = mobileBanners.length;

  useEffect(() => {
    if (mainSlideCount === 0) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % mainSlideCount);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [mainSlideCount]);

  useEffect(() => {
    if (mobileSlideCount === 0) return;
    const intervalId = window.setInterval(() => {
      setMobileActiveIndex((current) => (current + 1) % mobileSlideCount);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [mobileSlideCount]);

  const totalSlides = mainSlideCount;

  function goPrevSlide() {
    setActiveIndex((i) => (i - 1 + totalSlides) % totalSlides);
  }

  function goNextSlide() {
    setActiveIndex((i) => (i + 1) % totalSlides);
  }

  if (bannersLoading) {
    return (
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Skeleton banner principal */}
        <div
          className="hidden w-full overflow-hidden rounded-xl bg-nova-card animate-pulse md:block"
          style={{ aspectRatio: "1720/720" }}
        />
        {/* Skeleton laterais */}
        <div className="hidden gap-5 md:flex xl:flex-col" style={{ flex: "0 0 380px" }}>
          <div className="flex-1 rounded-xl bg-nova-card animate-pulse" />
          <div className="flex-1 rounded-xl bg-nova-card animate-pulse" />
        </div>
        {/* Skeleton mobile */}
        <div
          className="block rounded-xl bg-nova-card animate-pulse md:hidden"
          style={{ height: "160px", margin: "4px -16px 8px" }}
        />
      </div>
    );
  }

  return (
    <section className="grid gap-5 items-stretch xl:grid-cols-[minmax(0,1fr)_380px]">
      {/* MOBILE BANNER */}
      <div
        className="block md:hidden"
        style={{ position: "relative", height: "160px", margin: "4px -16px 8px", overflow: "hidden" }}
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
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "80%",
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                transform: `translate(-50%, -50%) translateX(${offset * 92}%) scale(${offset === 0 ? 1 : 0.82})`,
                zIndex: offset === 0 ? 10 : 5,
                opacity: offset === 0 ? 1 : 0.45,
                transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: offset === 0 ? "default" : "pointer",
                boxShadow: offset === 0 ? "0 8px 24px rgba(0,0,0,0.5)" : "none"
              }}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          );
        })}

        {/* Arrow Left */}
        <button
          type="button"
          onClick={() =>
            setMobileActiveIndex(
              (i) => (i - 1 + mobileBanners.length) % mobileBanners.length
            )
          }
          style={{
            position: "absolute",
            left: "2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#1652F0",
            boxShadow: "0 0 12px rgba(22,82,240,0.6)",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ‹
        </button>

        {/* Arrow Right */}
        <button
          type="button"
          onClick={() =>
            setMobileActiveIndex((i) => (i + 1) % mobileBanners.length)
          }
          style={{
            position: "absolute",
            right: "2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#1652F0",
            boxShadow: "0 0 12px rgba(22,82,240,0.6)",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ›
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px"
          }}
        >
          {mobileBanners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMobileActiveIndex(i)}
              style={{
                width: i === mobileActiveIndex ? "14px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === mobileActiveIndex ? "#1652F0" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                padding: 0
              }}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP — carrossel largura total */}
      <div
        ref={bannerRef}
        className="relative hidden w-full overflow-hidden rounded-xl border border-nova-card/60 bg-nova-card md:block"
        style={{
          aspectRatio: "1720/720",
          boxShadow: "0 0 30px rgba(22, 82, 240, 0.14)",
          position: "relative"
        }}
      >
        <motion.div style={{ y }} className="h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slidesParaRenderizar.map((slide) => (
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
        </motion.div>

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
          {slidesParaRenderizar.map((slide, index) => (
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

      <div className="hidden md:flex md:flex-row xl:flex-col gap-5" style={{ flex: "0 0 380px" }}>
        {lateraisParaRenderizar.map((banner) => (
          <motion.a
            key={banner.id}
            href={banner.link}
            whileHover={{ scale: 1.02 }}
            className="relative flex-1 overflow-hidden rounded-xl border"
            style={{ borderColor: "rgba(46, 48, 69, 0.95)", minHeight: 0 }}
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
