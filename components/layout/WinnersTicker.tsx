'use client'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { jogos } from '@/data/jogos'

const NAMES = ['Bia***', 'Car***', 'Jul***', 'Fer***', 'Ana***', 'Ped***', 'Mar***', 'Luc***', 'Gab***', 'Thi***', 'Rod***', 'Pat***']
const AMOUNTS = ['R$ 890', 'R$ 2.100', 'R$ 580', 'R$ 4.200', 'R$ 340', 'R$ 1.100', 'R$ 780', 'R$ 3.400', 'R$ 5.800', 'R$ 760', 'R$ 1.550', 'R$ 2.900']
const BETS = ['50,00', '100,00', '25,00', '200,00', '10,00', '75,00', '150,00', '50,00', '200,00', '30,00', '80,00', '120,00']
const MULTIPLIERS = [18, 42, 23, 56, 34, 15, 29, 68, 29, 25, 19, 24]

const ganhadores = jogos.map((jogo, i) => ({
  user: NAMES[i % NAMES.length],
  amount: AMOUNTS[i % AMOUNTS.length].replace('R$ ', ''),
  bet: BETS[i % BETS.length],
  multiplier: MULTIPLIERS[i % MULTIPLIERS.length],
  game: jogo.nome,
  provider: jogo.nome === 'Fortune Tiger' ? 'PG Soft' : 'Evolution',
  gameImage: jogo.imagem ?? '/images/jogos/ftg.webp',
}))

const lista = [...ganhadores, ...ganhadores]

type Ganhador = (typeof ganhadores)[0]

const tickerTransition = {
  duration: 15,
  repeat: Infinity,
  ease: 'linear' as const,
}

export default function WinnersTicker() {
  const controls = useAnimationControls()
  const [selected, setSelected] = useState<Ganhador | null>(null)

  const receiptId = useMemo(
    () => (selected ? Math.random().toString(36).substring(2, 10).toUpperCase() : ''),
    [selected],
  )

  const handleMouseEnter = () => controls.stop()
  const handleMouseLeave = () => {
    controls.start({
      x: ['0%', '-50%'],
      transition: tickerTransition,
    })
  }

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: tickerTransition,
    })
  }, [controls])

  return (
    <>
      {/* TICKER */}
      <div
        className="flex h-11 w-full items-center overflow-hidden md:h-14"
        style={{
          background: '#0b0f1e',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Label AO VIVO */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-4 h-full"
          style={{ borderRight: '1px solid rgba(255,255,255,0.08)', minWidth: 'fit-content' }}
        >
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#E63946', display: 'inline-block',
            boxShadow: '0 0 6px 2px rgba(230,57,70,0.7)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#E63946', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
            AO VIVO
          </span>
        </div>

        {/* Itens rolando */}
        <div className="flex-1 overflow-hidden h-full">
          <motion.div
            animate={controls}
            initial={{ x: '0%' }}
            className="flex items-center h-full"
            style={{ width: 'max-content' }}
          >
            {lista.map((g, i) => (
              <div
                key={i}
                onClick={() => setSelected(g)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 14px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                  height: '100%',
                  flexShrink: 0,
                }}
              >
                <img
                  src={g.gameImage}
                  alt={g.game}
                  className="h-[36px] w-[26px] shrink-0 rounded-[5px] object-cover md:h-[42px] md:w-[30px]"
                />
                <div className="flex flex-col gap-px">
                  <span className="text-[10px] font-medium leading-tight text-white/55 md:text-[11px]">
                    {g.user}
                  </span>
                  <span className="text-xs font-bold leading-tight text-white md:text-[13px]">
                    R$ {g.amount}
                  </span>
                  <span className="text-[9px] font-normal leading-tight text-white/35 md:text-[10px]">
                    {g.game}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MODAL — ticket / bilhete */}
      {selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.78)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ position: 'relative', width: '340px' }}
            onClick={e => e.stopPropagation()}
          >
            {/* TICKET BODY */}
            <div style={{
              background: '#1C1E2E',
              borderRadius: '16px 16px 0 0',
              border: '1px solid rgba(255,255,255,0.08)',
              borderBottom: 'none',
              overflow: 'hidden',
            }}>

              {/* HEADER */}
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 20px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>Comprovante</span>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '14px',
                    background: 'none',
                    border: 'none',
                    color: '#aaa',
                    fontSize: '22px',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* GANHO + GLOW */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '28px 20px 20px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '38px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200px',
                  height: '55px',
                  background: 'rgba(22,82,240,0.3)',
                  filter: 'blur(28px)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }} />
                <span style={{ color: '#888', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Ganho</span>
                <span style={{ color: '#10D894', fontSize: '34px', fontWeight: 800, position: 'relative' }}>
                  R$ {selected.amount}
                </span>
              </div>

              {/* APOSTA + MULTIPLICADOR */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                padding: '0 20px 20px',
              }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>Aposta</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>R$ {selected.bet}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px 14px' }}>
                  <div style={{ color: '#888', fontSize: '11px', marginBottom: '4px' }}>Multiplicador</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{selected.multiplier}x</div>
                </div>
              </div>

              {/* SEPARATOR WITH NOTCHES */}
              <div style={{ position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: '-13px',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.78)',
                  zIndex: 5,
                }} />
                <div style={{
                  flex: 1,
                  margin: '0 20px',
                  borderTop: '1.5px dashed rgba(255,255,255,0.13)',
                }} />
                <div style={{
                  position: 'absolute',
                  right: '-13px',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.78)',
                  zIndex: 5,
                }} />
              </div>

              {/* USUÁRIO */}
              <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1652F0, #10D894)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '17px', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {selected.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{selected.user}</div>
                  <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>
                    Ganhou em {new Date().toLocaleDateString('pt-BR')}
                  </div>
                  <div style={{ color: '#555', fontSize: '10px', marginTop: '1px', fontFamily: 'monospace' }}>
                    ID: {receiptId}
                  </div>
                </div>
              </div>

              {/* JOGO */}
              <div style={{ padding: '4px 20px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={selected.gameImage}
                  alt={selected.game}
                  style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{selected.game}</div>
                  <div style={{ color: '#777', fontSize: '12px', marginTop: '2px' }}>{selected.provider}</div>
                </div>
                <span style={{ color: '#555', fontSize: '20px', cursor: 'pointer' }}>♡</span>
              </div>
            </div>

            {/* ZIGZAG / SERRATED EDGE */}
            <svg
              width="100%"
              height="14"
              viewBox="0 0 340 14"
              preserveAspectRatio="none"
              style={{ display: 'block', marginTop: '-1px' }}
            >
              <path
                d="M0,0 L0,7 Q8.5,14 17,7 Q25.5,0 34,7 Q42.5,14 51,7 Q59.5,0 68,7 Q76.5,14 85,7 Q93.5,0 102,7 Q110.5,14 119,7 Q127.5,0 136,7 Q144.5,14 153,7 Q161.5,0 170,7 Q178.5,14 187,7 Q195.5,0 204,7 Q212.5,14 221,7 Q229.5,0 238,7 Q246.5,14 255,7 Q263.5,0 272,7 Q280.5,14 289,7 Q297.5,0 306,7 Q314.5,14 323,7 Q331.5,0 340,7 L340,0 Z"
                fill="#1C1E2E"
              />
            </svg>

            {/* BOTTOM SECTION (below tear) */}
            <div style={{
              background: '#161828',
              borderRadius: '0 0 16px 16px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: 'none',
              padding: '16px 20px 22px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '240px',
                height: '60px',
                background: 'rgba(22,82,240,0.28)',
                filter: 'blur(22px)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }} />
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#1652F0',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '15px',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 0 22px 5px rgba(22,82,240,0.45)',
                }}
              >
                JOGAR AGORA
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
