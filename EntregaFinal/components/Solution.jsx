const pillars = [
  {
    n: '01',
    title: 'Calcular',
    icon: 'calc',
    body: 'Motor tributário atualizado em tempo real com CBS, IBS e IS. Relatórios exatos, sem margem para erro.',
  },
  {
    n: '02',
    title: 'Entender',
    icon: 'read',
    body: 'Interface que traduz a legislação em linguagem acessível. O MEI entende o porquê; o contador vê a base legal.',
  },
  {
    n: '03',
    title: 'Proteger',
    icon: 'shield',
    body: 'Alertas de prazo, trilha de auditoria por cálculo e respaldo regulatório anexado a cada operação.',
  },
];

function PillarIcon({ kind }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (kind === 'calc') {
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8" />
        <path d="M8 11h2M12 11h2M16 11h0.01" />
        <path d="M8 15h2M12 15h2M16 15h0.01" />
        <path d="M8 19h6" />
        <path d="M16 19h0.01" />
      </svg>
    );
  }
  if (kind === 'read') {
    return (
      <svg {...common}>
        <path d="M4 5a2 2 0 012-2h6v17H6a2 2 0 01-2-2V5z" />
        <path d="M20 5a2 2 0 00-2-2h-6v17h6a2 2 0 002-2V5z" />
        <path d="M7 7h2M7 10h2M15 7h2M15 10h2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
  );
}

export default function Solution() {
  return (
    <section id="solucao" className="bg-paper border-t border-sand py-24 lg:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — Solução
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-3xl leading-[1.04]">
          Calcular. Entender. Proteger.
        </h2>
        <p className="mt-6 font-body text-[17px] text-slate max-w-2xl leading-relaxed">
          Você acabou de ver o tamanho do problema. A SmarTax foi construída especificamente para resolver cada uma dessas camadas — sem que você precise entender cada detalhe da legislação para não errar.
        </p>
        <p className="mt-6 font-body text-lg text-ink-700 max-w-2xl leading-relaxed">
          Três pilares construídos sobre a mesma base de conhecimento da Reforma — sem ferramentas avulsas, sem planilhas paralelas.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-14 lg:gap-x-14">
          {pillars.map((p) => (
            <article key={p.title}>
              <div className="text-amber">
                <PillarIcon kind={p.icon} />
              </div>
              <div className="mt-7 font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
                {p.n}
              </div>
              <h3 className="mt-2 font-display font-semibold text-[28px] text-ink tracking-tightest">
                {p.title}
              </h3>
              <p className="mt-4 font-body text-[15.5px] text-ink-700 leading-relaxed max-w-sm">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
