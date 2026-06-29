import JsonLd from './JsonLd';

const taxes = [
  {
    code: 'CBS',
    name: 'Contribuição sobre Bens e Serviços',
    rate: '~8,8%',
    points: [
      'Competência federal',
      'Substitui PIS e COFINS',
      'Base ampla, sem cumulatividade',
    ],
  },
  {
    code: 'IBS',
    name: 'Imposto sobre Bens e Serviços',
    rate: 'Variável',
    points: [
      'Competência estadual e municipal',
      'Substitui ICMS e ISS',
      'Alíquota varia por estado',
    ],
  },
  {
    code: 'IS',
    name: 'Imposto Seletivo',
    rate: 'Específica',
    points: [
      'Competência federal',
      'Incide sobre produtos prejudiciais à saúde',
      'E sobre produtos prejudiciais ao meio ambiente',
    ],
  },
];

const timeline = [
  { year: '2023', label: 'Aprovação · EC 132' },
  { year: '2026', label: 'Início da transição' },
  { year: '2033', label: 'Conclusão' },
];

const transitionMilestones = [
  {
    year: '2023',
    title: 'Aprovação da EC 132',
    body: 'A Emenda Constitucional 132 aprova a maior reforma do sistema tributário brasileiro desde 1988.',
  },
  {
    year: '2026',
    title: 'Início da transição',
    body: 'CBS e IBS começam a coexistir com PIS, COFINS, ICMS e ISS. Alíquotas iniciam em 0,1% e crescem gradualmente.',
  },
  {
    year: '2029',
    title: 'Simples Nacional entra na reforma',
    body: 'MEIs e empresas do Simples começam a sentir os efeitos diretos da transição com novas obrigações acessórias.',
  },
  {
    year: '2031',
    title: 'Extinção de PIS e COFINS',
    body: 'CBS assume integralmente. Empresas de Lucro Presumido e Real já operam 100% no novo regime.',
  },
  {
    year: '2033',
    title: 'Transição concluída',
    body: 'ICMS e ISS são extintos. IBS opera em pleno regime. Todo o país opera sob o novo sistema — sem exceções.',
  },
];

const oldRegime = [
  { code: 'PIS',    rate: '1,65%',                base: 'sobre faturamento' },
  { code: 'COFINS', rate: '7,6%',                 base: 'sobre faturamento' },
  { code: 'ICMS',   rate: 'variável por estado',  base: 'sobre circulação de mercadorias' },
  { code: 'ISS',    rate: '2% a 5%',              base: 'sobre serviços' },
  { code: 'IPI',    rate: 'variável',             base: 'sobre produtos industrializados' },
];

const newRegime = [
  { code: 'CBS', rate: '~8,8%',     base: 'substitui PIS e COFINS' },
  { code: 'IBS', rate: 'variável',  base: 'substitui ICMS e ISS' },
  { code: 'IS',  rate: 'específico', base: 'sobre produtos seletivos' },
];

const faqs = [
  {
    q: 'Preciso mudar alguma coisa agora, em 2026?',
    a: 'Sim. A coexistência começa em 2026 com alíquotas simbólicas, mas as obrigações acessórias já estão em vigor. Empresas do Lucro Real e Presumido já precisam adaptar seus sistemas de apuração.',
  },
  {
    q: 'O Simples Nacional vai acabar?',
    a: 'Não. O Simples Nacional continua existindo, mas passa por adaptações. MEIs e microempresas no Simples entram na transição a partir de 2029, com regras específicas para o regime.',
  },
  {
    q: 'Meu contador já sabe lidar com CBS e IBS?',
    a: 'A maioria dos escritórios ainda está se adaptando. A Reforma é recente e complexa — muitos contadores trabalham com informações parciais sobre as novas alíquotas e regras de aproveitamento de crédito.',
  },
  {
    q: 'O que é o crédito de IBS e como funciona?',
    a: 'O IBS é não-cumulativo: você pode descontar o IBS pago nas etapas anteriores da cadeia produtiva. Isso é positivo, mas exige controle rigoroso de cada operação para não perder o crédito.',
  },
  {
    q: 'Quais são as penalidades por não se adaptar?',
    a: 'Multas por erro no recolhimento de CBS e IBS seguem o padrão das multas tributárias federais: 75% sobre o valor devido em caso de omissão, com acréscimo de juros Selic. Há também risco de autuação e inscrição em dívida ativa.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Reform() {
  return (
    <section id="reforma" className="bg-paper py-24 lg:py-28 px-6 lg:px-12">
      <JsonLd data={faqJsonLd} />
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — A Reforma
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-3xl leading-[1.04]">
          Entenda o que mudou — em português claro.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {taxes.map((t) => (
            <article
              key={t.code}
              className="bg-ink text-white rounded-2xl p-8 flex flex-col"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display font-semibold text-[40px] tracking-tightest leading-none">
                  {t.code}
                </div>
                <div className="font-mono text-[11px] tracking-[0.14em] text-amber uppercase">
                  {t.rate}
                </div>
              </div>
              <div className="mt-5 font-body text-[15px] text-white/90 leading-snug">
                {t.name}
              </div>
              <ul className="mt-6 space-y-2.5 font-body text-[13.5px] text-white/55">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 inline-block w-2.5 h-px bg-white/30 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <div className="flex items-baseline justify-between mb-7">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
              Linha do tempo
            </div>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-slate">
              10 anos de transição
            </div>
          </div>
          <div className="relative grid grid-cols-3 gap-6">
            <div aria-hidden="true" className="absolute top-[11px] left-3 right-3 h-px bg-sand" />
            {timeline.map((t, i) => (
              <div key={t.year} className="relative">
                <div
                  className={`w-[22px] h-[22px] rounded-full border-2 ${
                    i === 1
                      ? 'border-amber bg-amber'
                      : 'border-sand bg-paper'
                  }`}
                />
                <div className="mt-5 font-mono text-[28px] tabular-nums leading-none text-ink">{t.year}</div>
                <div className="mt-2 font-body text-sm text-ink-700">{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-display text-[28px] font-semibold text-ink mt-20 mb-8">
          Como funciona o período de transição
        </h3>
        <div className="flex flex-col">
          {transitionMilestones.map((m) => (
            <div key={m.year} className="milestone-row flex gap-6 items-start rounded-r-md">
              <div className="w-24 shrink-0 font-mono text-[13px] text-slate text-right pt-1">
                {m.year}
              </div>
              <div className="milestone-divider w-px bg-sand mx-6 shrink-0 h-8" aria-hidden="true" />
              <div className="flex-1 pb-8">
                <div className="font-body font-medium text-ink">{m.title}</div>
                <p className="mt-1 font-body text-[14px] text-slate leading-relaxed">
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-display text-[28px] font-semibold text-ink mt-20 mb-8">
          O que muda no cálculo do seu imposto
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          <article className="bg-paper-50 border border-sand rounded-2xl p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate mb-4">
              Regime anterior
            </div>
            <ul className="space-y-3">
              {oldRegime.map((r) => (
                <li key={r.code} className="font-mono text-[13px] text-ink">
                  {r.code} · <span className="text-slate">{r.rate}</span> · <span className="text-slate">{r.base}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-[13px] text-slate italic mt-6">
              5 tributos diferentes. 5 guias de recolhimento. 5 datas de vencimento.
            </p>
          </article>

          <article className="bg-ink text-white rounded-2xl p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-amber mb-4">
              Reforma Tributária
            </div>
            <ul className="space-y-3">
              {newRegime.map((r) => (
                <li key={r.code} className="font-mono text-[13px] text-white">
                  {r.code} · <span className="text-white/60">{r.rate}</span> · <span className="text-white/60">{r.base}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-[13px] text-white/55 italic mt-6">
              3 tributos. Não-cumulativos. Base ampla. Calculados sobre o mesmo fato gerador.
            </p>
            <p className="font-mono text-[11px] text-amber mt-4">
              Na prática: menos tributos, mas cálculo mais complexo durante a transição.
            </p>
          </article>
        </div>

        <h3 className="font-display text-[28px] font-semibold text-ink mt-20 mb-8">
          Perguntas frequentes de empresários
        </h3>
        <div>
          {faqs.map((f) => (
            <details key={f.q} className="faq-item border-t border-sand py-5">
              <summary className="faq-summary font-body font-medium text-[16px] text-ink cursor-pointer list-none flex justify-between items-center gap-6">
                <span>{f.q}</span>
                <span className="faq-icon font-mono text-xl text-slate shrink-0" aria-hidden="true" />
              </summary>
              <p className="font-body text-[14.5px] text-slate leading-relaxed pt-4">
                {f.a}
              </p>
            </details>
          ))}
          <div className="border-t border-sand" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
