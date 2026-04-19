import SiteShell from "@/components/layout/SiteShell";

const sinaisAlerta = [
  "Aumentar o valor das apostas para recuperar perdas anteriores.",
  "Gastar mais tempo e dinheiro do que o planejado em sessões de jogo.",
  "Esconder hábitos de jogo de familiares ou amigos próximos.",
  "Usar o jogo como escape para ansiedade, estresse ou dificuldades pessoais.",
  "Negligenciar trabalho, estudo ou compromissos por causa das apostas."
];

const autoexclusao = [
  {
    titulo: "Pausa Rápida",
    descricao: "Bloqueie o acesso por 24 horas, 7 dias ou 30 dias."
  },
  {
    titulo: "Autoexclusão Estendida",
    descricao: "Suspenda a conta por períodos mais longos com suporte dedicado."
  },
  {
    titulo: "Bloqueio Permanente",
    descricao: "Solicite o encerramento definitivo da sua conta de jogo."
  }
];

const instituicoes = [
  "Jogadores Anônimos",
  "CVV - Centro de Valorização da Vida",
  "CAPS da sua região",
  "Profissionais de saúde mental especializados"
];

export default function JogoResponsavelPage() {
  return (
    <SiteShell
      withFooter
      contentClassName="mx-auto flex w-full max-w-[1200px] flex-col px-4 py-8 lg:px-8"
    >
      <section className="rounded-3xl bg-gradient-to-r from-nova-bg via-nova-card to-nova-elevated px-8 py-10">
        <h1 className="text-3xl font-black text-white">🎲 Jogo Responsável</h1>
        <p className="mt-3 text-nova-blueBright">Jogue com consciência</p>
      </section>

      <section className="mt-8 rounded-2xl border border-nova-card bg-nova-card p-6">
        <h2 className="text-2xl font-bold text-white">Sinais de Alerta</h2>
        <ul className="mt-4 space-y-3 text-sm text-nova-text">
          {sinaisAlerta.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-0.5 text-nova-blueBright">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-nova-card bg-nova-card p-6">
        <h2 className="text-2xl font-bold text-white">Ferramentas de Autoexclusão</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {autoexclusao.map((item) => (
            <article
              key={item.titulo}
              className="rounded-2xl border border-nova-card bg-nova-card p-5"
            >
              <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
              <p className="mt-2 text-sm text-nova-textMuted">{item.descricao}</p>
              <button
                type="button"
                className="mt-4 rounded-lg bg-nova-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-nova-blueLight"
              >
                Solicitar
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-nova-card bg-nova-card p-6">
        <h2 className="text-2xl font-bold text-white">Limites de Depósito</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Limite diário", "Limite semanal", "Limite mensal"].map((label) => (
            <label key={label} className="block">
              <span className="mb-2 block text-sm text-nova-textMuted">{label}</span>
              <input
                type="text"
                placeholder="R$ 0,00"
                className="w-full rounded-lg border border-nova-card bg-nova-elevated px-4 py-3 text-sm text-white placeholder:text-nova-textMuted focus:border-nova-blue focus:outline-none"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-nova-card bg-nova-card p-6">
        <h2 className="text-2xl font-bold text-white">Canais de Ajuda</h2>
        <ul className="mt-4 space-y-3 text-sm text-nova-text">
          {instituicoes.map((item) => (
            <li key={item} className="rounded-xl bg-nova-card px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}

