import SiteShell from "@/components/layout/SiteShell";

const secoes = [
  {
    titulo: "Introdução e Aceitação dos Termos",
    paragrafos: [
      "Ao acessar a plataforma NovaBet, você concorda em cumprir estes Termos de Uso e toda a regulamentação aplicável ao uso do site, dos serviços e das campanhas promocionais disponíveis.",
      "O uso contínuo da plataforma após qualquer atualização destes termos será interpretado como aceitação integral das novas condições publicadas.",
      "Caso não concorde com qualquer cláusula, recomendamos interromper imediatamente o uso da conta e dos serviços oferecidos."
    ]
  },
  {
    titulo: "Elegibilidade e Cadastro",
    paragrafos: [
      "Somente usuários maiores de 18 anos e com plena capacidade civil podem criar e manter uma conta ativa na plataforma.",
      "As informações fornecidas durante o cadastro devem ser verdadeiras, completas e atualizadas, incluindo dados pessoais, meios de contato e documentos eventualmente solicitados para verificação.",
      "A NovaBet poderá suspender ou encerrar contas com indícios de falsidade cadastral, duplicidade ou uso indevido."
    ]
  },
  {
    titulo: "Depósitos e Saques",
    paragrafos: [
      "Os métodos de depósito e saque exibidos na plataforma podem variar conforme região, perfil do usuário e políticas internas de segurança.",
      "Pedidos de saque podem passar por análise adicional, especialmente em situações que envolvam prevenção à fraude, verificação de identidade e conformidade regulatória.",
      "Valores mínimos, máximos, taxas e prazos operacionais poderão ser informados diretamente na área da carteira do usuário."
    ]
  },
  {
    titulo: "Bônus e Promoções",
    paragrafos: [
      "Todas as promoções possuem regras específicas, incluindo critérios de elegibilidade, prazo de validade, restrições por jogo e requisitos de rollover.",
      "A empresa se reserva o direito de alterar, suspender ou encerrar promoções a qualquer momento, mediante comunicação na própria plataforma.",
      "Qualquer abuso promocional, tentativa de arbitragem ou comportamento incompatível com a boa-fé poderá resultar em cancelamento de bônus e ganhos relacionados."
    ]
  },
  {
    titulo: "Jogo Responsável",
    paragrafos: [
      "A NovaBet incentiva práticas de jogo responsável e disponibiliza recursos de limites, pausas, autoexclusão e acesso à página de apoio ao jogador.",
      "Cabe ao usuário monitorar seus hábitos de jogo e utilizar a plataforma de forma recreativa, consciente e financeiramente controlada.",
      "Caso sejam identificados sinais de comportamento de risco, a empresa poderá aplicar medidas preventivas adicionais."
    ]
  },
  {
    titulo: "Propriedade Intelectual",
    paragrafos: [
      "Todos os elementos visuais, marcas, textos, interfaces, software e materiais institucionais do site pertencem à NovaBet ou a seus licenciadores.",
      "É proibido copiar, distribuir, reproduzir, modificar ou explorar comercialmente qualquer conteúdo da plataforma sem autorização expressa e por escrito.",
      "O uso indevido de marcas, logos e materiais protegidos poderá gerar responsabilização civil e outras medidas cabíveis."
    ]
  },
  {
    titulo: "Limitação de Responsabilidade",
    paragrafos: [
      "A plataforma é fornecida conforme disponibilidade técnica e operacional, podendo sofrer interrupções temporárias, atualizações ou indisponibilidades pontuais.",
      "A NovaBet não se responsabiliza por perdas decorrentes de falhas de conexão do usuário, uso inadequado da conta ou ações de terceiros fora de seu controle razoável.",
      "Na extensão permitida pela legislação aplicável, a responsabilidade total da empresa será limitada aos valores efetivamente mantidos em conta pelo usuário."
    ]
  },
  {
    titulo: "Disposições Finais",
    paragrafos: [
      "Estes Termos serão regidos pela legislação aplicável ao serviço e interpretados em conjunto com as demais políticas publicadas na plataforma.",
      "Eventuais dúvidas, disputas ou solicitações formais poderão ser encaminhadas por meio dos canais oficiais de atendimento indicados na Central de Ajuda.",
      "Se qualquer cláusula for considerada inválida, as demais disposições permanecerão em pleno vigor e efeito."
    ]
  }
];

export default function TermosPage() {
  return (
    <SiteShell
      withFooter
      contentClassName="mx-auto flex w-full max-w-[1100px] flex-col px-4 py-8 lg:px-8"
    >
      <section className="rounded-3xl border border-nova-card bg-nova-card p-8">
        <h1 className="text-3xl font-bold text-white">📄 Termos de Uso</h1>
        <p className="mt-2 text-sm text-nova-textMuted">Última atualização: 16 de Abril de 2026</p>

        <div className="mt-8 space-y-8">
          {secoes.map((secao) => (
            <section key={secao.titulo}>
              <h2 className="text-xl font-bold text-white">{secao.titulo}</h2>
              <div className="mt-3 space-y-3">
                {secao.paragrafos.map((paragrafo) => (
                  <p key={paragrafo} className="text-sm leading-relaxed text-nova-text">
                    {paragrafo}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
