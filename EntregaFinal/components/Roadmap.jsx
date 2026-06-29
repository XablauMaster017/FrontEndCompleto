const phases = [
  {
    n: 'Fase 1',
    when: 'Hoje',
    name: 'SmarTax Core',
    bullets: [
      'Cálculo CBS / IBS / IS',
      'Alertas de compliance',
      'Consultoria integrada',
    ],
    bg: 'bg-ink',
  },
  {
    n: 'Fase 2',
    when: '2027',
    name: 'SmarTax Finance',
    bullets: [
      'Fluxo de caixa',
      'Conciliação bancária automática',
      'Planejamento financeiro por IA',
      'Integração com ERPs e bancos',
    ],
    bg: 'bg-ink-700',
  },
  {
    n: 'Fase 3',
    when: '2030',
    name: 'SmarTax 360',
    bullets: [
      'RH e folha de pagamento',
      'Jurídico e contratos inteligentes',
      'BI financeiro em tempo real',
      'Plataforma all-in-one',
    ],
    bg: 'bg-ink-500',
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-paper border-t border-sand py-24 lg:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — Roadmap
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-4xl leading-[1.04]">
          Hoje compliance. Amanhã, o sistema operacional financeiro do Brasil.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {phases.map((p) => (
            <article
              key={p.n}
              className={`${p.bg} text-white rounded-2xl p-8 lg:p-9 flex flex-col`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-amber uppercase">
                  {p.n}
                </span>
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/45">
                  {p.when}
                </span>
              </div>

              <h3 className="mt-6 font-display font-semibold text-[26px] tracking-tightest">
                {p.name}
              </h3>

              <ul className="mt-7 space-y-3 font-body text-[14px] text-white/80 leading-snug">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
