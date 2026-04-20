'use client'
import { motion } from 'framer-motion'

const esportes = [
  { id: 1, nome: 'Futebol', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 2, nome: 'Basquete', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 3, nome: 'Tênis', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 4, nome: 'Vôlei', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 5, nome: 'eSports', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 6, nome: 'MMA', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 7, nome: 'Fórmula 1', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
  { id: 8, nome: 'Boxe', imagem: '/images/esportes/atleta_futebol.webp', bgImagem: '/images/esportes/bg_futebol.webp' },
]

export default function EsportesSection() {
  return (
    <div className="mb-3 mt-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/icons/esportes.webp"
            alt=""
            className="h-7 w-7 shrink-0 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="text-base font-bold text-white md:text-lg">Esportes</h2>
        </div>
        <button
          className="text-nova-blue text-sm hover:text-nova-blue
          transition-colors hover:underline"
        >
          Ver todos
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-6 md:gap-3">
        {esportes.map((esporte, index) => (
          <motion.div
            key={esporte.id}
            className="flex-shrink-0 cursor-pointer"
            style={{ width: '160px', height: '280px', position: 'relative' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '220px',
                borderRadius: '14px',
                overflow: 'hidden',
              }}
            >
              <img
                src={esporte.bgImagem}
                alt={`Fundo ${esporte.nome}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '70px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '12px',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {esporte.nome}
                </span>
              </div>
            </div>

            <motion.div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '280px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                zIndex: 10,
              }}
              whileHover={{ y: -14, transition: { duration: 0.25, ease: 'easeOut' } }}
            >
              <img
                src={esporte.imagem}
                alt={esporte.nome}
                style={{
                  width: '160px',
                  height: '280px',
                  objectFit: 'contain',
                  objectPosition: 'bottom',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.9))',
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
