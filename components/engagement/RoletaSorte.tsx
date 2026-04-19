"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type RoletaSorteProps = {
  onClose: () => void;
};

const premios = [
  { label: "R$ 5", color: "#1652F0" },
  { label: "R$ 10", color: "#3B6FFF" },
  { label: "R$ 50", color: "#6B93FF" },
  { label: "Bônus 10%", color: "#1C1E2E" },
  { label: "Giro extra", color: "#252738" },
  { label: "R$ 100", color: "#1652F0" },
  { label: "R$ 500", color: "#6B93FF" },
  { label: "Nada", color: "#2E3045" }
];

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z"
  ].join(" ");
}

export default function RoletaSorte({ onClose }: RoletaSorteProps) {
  const [rotacao, setRotacao] = useState(0);
  const [jaGirou, setJaGirou] = useState(false);
  const [girando, setGirando] = useState(false);
  const [premioAtual, setPremioAtual] = useState<string | null>(null);

  const slices = useMemo(
    () =>
      premios.map((premio, index) => {
        const startAngle = index * 45;
        const endAngle = startAngle + 45;
        const midAngle = startAngle + 22.5;
        const textPosition = polarToCartesian(150, 150, 92, midAngle);

        return { ...premio, startAngle, endAngle, textPosition };
      }),
    []
  );

  function girarRoleta() {
    if (jaGirou || girando) {
      return;
    }

    const indice = Math.floor(Math.random() * premios.length);
    const premio = premios[indice];
    const anguloPorFatia = 360 / premios.length;
    const centroDaFatia = indice * anguloPorFatia + anguloPorFatia / 2;
    const destino = 360 * 6 + (360 - centroDaFatia);

    setGirando(true);
    setPremioAtual(null);
    setRotacao(destino);

    window.setTimeout(() => {
      setGirando(false);
      setJaGirou(true);
      setPremioAtual(premio.label);
      window.alert(`Você ganhou: ${premio.label}`);
    }, 3000);
  }

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
          className="relative w-full max-w-[500px] rounded-2xl bg-nova-card p-8 text-center shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center !rounded-full bg-white/10 text-sm text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          <h2 className="bg-gradient-to-r from-nova-blue to-nova-blueBright bg-clip-text text-3xl font-bold text-transparent">
            🎡 Roleta da Sorte
          </h2>
          <p className="mt-2 text-sm text-nova-textMuted">Gire a roleta 1x por dia e ganhe prêmios!</p>

          <div className="relative mt-8 flex justify-center">
            <div className="absolute -top-3 z-20 h-0 w-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-nova-blueBright" />

            <div
              className="rounded-full"
              style={{
                transform: `rotate(${rotacao}deg)`,
                transition: "transform 3s cubic-bezier(0.15, 0.85, 0.2, 1)"
              }}
            >
              <svg width="280" height="280" viewBox="0 0 300 300">
                {slices.map((slice) => (
                  <g key={slice.label}>
                    <path
                      d={describeArc(150, 150, 140, slice.startAngle, slice.endAngle)}
                      fill={slice.color}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="2"
                    />
                    <text
                      x={slice.textPosition.x}
                      y={slice.textPosition.y}
                      fill="white"
                      fontSize="12"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${slice.startAngle + 22.5} ${slice.textPosition.x} ${slice.textPosition.y})`}
                    >
                      {slice.label}
                    </text>
                  </g>
                ))}
                <circle cx="150" cy="150" r="30" fill="#1C1E2E" stroke="rgba(255,255,255,0.15)" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={girarRoleta}
            disabled={jaGirou || girando}
            className="mt-6 rounded-xl bg-nova-blue px-10 py-4 font-bold text-white transition-colors hover:bg-nova-blueLight disabled:cursor-not-allowed disabled:opacity-60"
          >
            {girando ? "GIRANDO..." : "GIRAR AGORA"}
          </button>

          {jaGirou ? (
            <p className="mt-4 text-sm text-nova-textMuted">
              {premioAtual ? `Prêmio do dia: ${premioAtual}. ` : ""}
              Volte amanhã para girar novamente!
            </p>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

