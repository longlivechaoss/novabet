import SiteShell from "@/components/layout/SiteShell";

const secoes = [
  {
    titulo: "Coleta de Dados",
    paragrafos: [
      "Podemos coletar dados cadastrais, informações de contato, histórico transacional, dados técnicos do dispositivo e interações realizadas dentro da plataforma.",
      "Esses dados podem ser fornecidos diretamente pelo usuário, gerados pelo uso da conta ou obtidos durante processos de verificação, segurança e atendimento.",
      "A coleta é limitada ao necessário para a prestação adequada do serviço, cumprimento regulatório e proteção da integridade da plataforma."
    ]
  },
  {
    titulo: "Uso das Informações",
    paragrafos: [
      "As informações coletadas são utilizadas para criar e administrar contas, processar transações, prevenir fraudes, oferecer suporte e melhorar a experiência do usuário.",
      "Também poderemos usar dados para personalizar promoções, recomendar conteúdos relevantes e enviar comunicações operacionais ou promocionais, quando permitido.",
      "Todo tratamento é realizado com base legal adequada e observando princípios de necessidade, finalidade e transparência."
    ]
  },
  {
    titulo: "Compartilhamento",
    paragrafos: [
      "Determinados dados poderão ser compartilhados com parceiros de pagamento, prestadores de serviço, provedores de tecnologia e autoridades competentes, sempre que necessário.",
      "Esse compartilhamento ocorre apenas para viabilizar operações, cumprir exigências legais, reforçar segurança ou garantir a execução dos serviços contratados.",
      "Exigimos de nossos parceiros padrões compatíveis de proteção de dados e confidencialidade."
    ]
  },
  {
    titulo: "Cookies",
    paragrafos: [
      "Utilizamos cookies e tecnologias semelhantes para manter sessões ativas, lembrar preferências, analisar desempenho e aprimorar recursos da plataforma.",
      "Essas ferramentas ajudam a personalizar a navegação, medir campanhas e oferecer uma experiência mais estável e segura.",
      "Ao continuar navegando na NovaBet, o usuário reconhece o uso desses recursos conforme descrito nesta política."
    ]
  },
  {
    titulo: "Seus Direitos (LGPD)",
    paragrafos: [
      "O titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, oposição ou exclusão de dados, quando aplicável.",
      "Pedidos serão analisados conforme os requisitos legais e poderão depender de validação de identidade para proteção do próprio usuário.",
      "Algumas informações poderão ser retidas pelo tempo necessário ao cumprimento de obrigações legais, regulatórias e de prevenção à fraude."
    ]
  },
  {
    titulo: "Segurança",
    paragrafos: [
      "Adotamos medidas técnicas e organizacionais para proteger dados pessoais contra acesso não autorizado, alteração, destruição, vazamento e uso indevido.",
      "Essas medidas incluem controles de acesso, criptografia, monitoramento e processos internos de governança e resposta a incidentes.",
      "Apesar dos esforços contínuos, nenhum ambiente digital é totalmente imune a riscos, motivo pelo qual também orientamos práticas seguras por parte do usuário."
    ]
  },
  {
    titulo: "Contato DPO",
    paragrafos: [
      "Questões relacionadas a esta Política de Privacidade, exercício de direitos e solicitações de proteção de dados podem ser encaminhadas pelos canais oficiais de suporte.",
      "Sempre que aplicável, as demandas serão direcionadas ao responsável interno por privacidade e proteção de dados para análise e resposta adequada.",
      "A NovaBet poderá atualizar esta política periodicamente para refletir melhorias operacionais, requisitos regulatórios ou novas funcionalidades."
    ]
  }
];

export default function PrivacidadePage() {
  return (
    <SiteShell
      withFooter
      contentClassName="mx-auto flex w-full max-w-[1100px] flex-col px-4 py-8 lg:px-8"
    >
      <section className="rounded-3xl border border-nova-card bg-nova-card p-8">
        <h1 className="text-3xl font-bold text-white">🔒 Política de Privacidade</h1>
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
