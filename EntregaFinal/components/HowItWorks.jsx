const steps = [
  {
    n: '01',
    title: 'Cadastro',
    body: 'Informe CNPJ, regime tributário e atividades econômicas.',
  },
  {
    n: '02',
    title: 'Leitura',
    body: 'O motor analisa as obrigações de CBS, IBS e IS aplicáveis.',
  },
  {
    n: '03',
    title: 'Cálculo',
    body: 'Relatório com valores exatos gerado automaticamente.',
  },
  {
    n: '04',
    title: 'Alerta e Ação',
    body: 'Notificações de prazo e acesso à consultoria integrada.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-paper py-24 lg:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — Como funciona
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-3xl leading-[1.04]">
          Do CNPJ ao relatório em 4 passos.
        </h2>

        <ol className="mt-16 grid md:grid-cols-4 gap-8 md:gap-6">
          {steps.map((s) => (
            <li key={s.n} className="relative">
              <div className="font-mono text-[80px] text-sand leading-none tabular-nums">
                {s.n}
              </div>
              <h3 className="mt-6 font-display font-semibold text-[26px] tracking-tightest leading-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3.5 font-body text-[14.5px] text-ink-700 leading-relaxed max-w-[26ch]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
