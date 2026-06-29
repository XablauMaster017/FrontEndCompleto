const stats = [
  {
    value: '5.000+',
    label: 'normas tributárias ativas no Brasil',
    source: 'Receita Federal',
  },
  {
    value: '1.501h',
    label: 'por ano gastas por empresas brasileiras com obrigações fiscais — vs. 237h na média global',
    source: 'Banco Mundial · 2020',
  },
  {
    value: '21M+',
    label: 'empresas ativas sem solução adequada para a Reforma',
    source: 'SEBRAE · 2024',
  },
];

const profileIconProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'var(--slate)',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const profiles = [
  {
    name: 'MEI',
    icon: (
      <svg {...profileIconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
    body: 'Até 2033, o MEI precisará entender e declarar CBS sobre suas operações. Sem apoio, o risco de multa por erro é real.',
  },
  {
    name: 'Microempresa',
    icon: (
      <svg {...profileIconProps}>
        <path d="M4 9l1.5-4h13L20 9" />
        <path d="M4 9v11h16V9" />
        <path d="M4 9h16" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
    body: 'Empresas do Simples Nacional entram na transição a partir de 2029. Mas entender as regras agora evita surpresas na virada.',
  },
  {
    name: 'PME',
    icon: (
      <svg {...profileIconProps}>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 8h2M8 12h2M8 16h2M14 8h2M14 12h2M14 16h2" />
      </svg>
    ),
    body: 'Lucro Presumido e Lucro Real já sentem os efeitos da transição em 2026. CBS e IBS coexistem com PIS/COFINS/ICMS até 2033.',
  },
  {
    name: 'Escritório Contábil',
    icon: (
      <svg {...profileIconProps}>
        <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        <path d="M3 11h18" />
      </svg>
    ),
    body: 'Cada CNPJ gerenciado terá regras diferentes durante a transição. Sem automação, o volume de trabalho manual cresce exponencialmente.',
  },
];

export default function Problem() {
  return (
    <section id="problema" className="bg-paper py-24 lg:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — Problema
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-3xl leading-[1.04]">
          O sistema tributário mais complexo do mundo ficou ainda mais complexo.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {stats.map((s) => (
            <article
              key={s.source}
              className="bg-ink text-white rounded-2xl p-8 flex flex-col"
            >
              <div className="font-mono text-[44px] lg:text-[52px] text-amber leading-none tracking-tight tabular-nums">
                {s.value}
              </div>
              <p className="mt-6 font-body text-[15px] text-white/80 leading-relaxed">
                {s.label}
              </p>
              <div className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span className="inline-block w-6 h-px bg-white/30 align-middle mr-2" />
                {s.source}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 font-body text-[17px] text-ink-700 max-w-3xl leading-relaxed">
          A Reforma Tributária de 2023 (<span className="font-mono text-ink">EC 132</span>) substituiu PIS, COFINS, IPI, ICMS e ISS pelos novos <span className="font-medium text-ink">CBS</span>, <span className="font-medium text-ink">IBS</span> e <span className="font-medium text-ink">Imposto Seletivo</span>. As empresas precisam se adaptar até <span className="font-mono text-ink">2033</span> — mas não existem ferramentas adequadas para isso.
        </p>

        <h3 className="font-display text-[28px] font-semibold text-ink mt-20 mb-10">
          O que está em jogo para cada tipo de negócio
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {profiles.map((p) => (
            <article
              key={p.name}
              className="border border-sand rounded-2xl p-6 bg-paper-50"
            >
              <div>{p.icon}</div>
              <div className="mt-5 font-display font-semibold text-[18px] text-ink tracking-tightest">
                {p.name}
              </div>
              <p className="mt-3 font-body text-[14px] text-ink-700 leading-relaxed">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
