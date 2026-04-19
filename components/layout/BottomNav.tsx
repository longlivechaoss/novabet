"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Casino", href: "/", icon: "/images/bottomnav/casino.png", match: (p: string) => p === "/" },
  {
    label: "Live Casino",
    href: "/ao-vivo",
    icon: "/images/bottomnav/live.png",
    match: (p: string) => p.startsWith("/ao-vivo")
  },
  {
    label: "Depositar",
    href: "#depositar",
    icon: "/images/bottomnav/depositar.png",
    match: () => false,
    isCenter: true
  },
  {
    label: "Esportes",
    href: "/esportes",
    icon: "/images/bottomnav/esportes.png",
    match: (p: string) => p.startsWith("/esportes")
  },
  {
    label: "Promoções",
    href: "/promocoes",
    icon: "/images/bottomnav/promocoes.png",
    match: (p: string) => p.startsWith("/promocoes")
  }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-12deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(-8deg); }
          80% { transform: rotate(6deg); }
        }
        .promo-icon { animation: wobble 2.5s ease-in-out infinite; transform-origin: center bottom; }
      `}</style>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: "#0D0F1E",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          height: "62px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            height: "100%",
            padding: "0 4px"
          }}
        >
          {navItems.map((item) => {
            const isActive = item.match(pathname);

            if (item.isCenter) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    paddingBottom: "6px",
                    position: "relative",
                    top: "-14px"
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "linear-gradient(145deg, #1a5cff, #0E3FC4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "4px",
                      boxShadow: "0 0 0 3px #0D0F1E"
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{ width: "32px", height: "32px", objectFit: "contain" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 400,
                      lineHeight: 1
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            }

            const isPromo = item.label === "Promoções";

            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  height: "100%",
                  gap: "3px"
                }}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={isPromo ? "promo-icon" : ""}
                  style={{
                    width: "28px",
                    height: "28px",
                    objectFit: "contain"
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#1652F0" : "rgba(255,255,255,0.45)",
                    lineHeight: 1
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
