const examples = [
  {
    badge: 'Serviços · Lucro Presumido',
    before:
      'Antes: emitia NF com ISS municipal (3%) e PIS/COFINS (3,65%). Dois guias, dois vencimentos.',
    after:
      'A partir de 2026: CBS (8,8%) + IBS (variável por município). Um único documento de arrecadação, mas alíquota efetiva maior. O crédito de IBS pode compensar — se calculado corretamente.',
    risk: 'Risco: subestimar a alíquota efetiva e recolher a menor.',
    riskColor: 'text-critical',
  },
  {
    badge: 'Comércio · Simples Nacional',
    before:
      'Antes: pagava tudo via DAS — um documento unificado com alíquota do Simples incluindo ICMS.',
    after:
      'A partir de 2029: CBS e IBS passam a integrar o cálculo do Simples com regras próprias. A alíquota do DAS muda. A forma de aproveitamento de crédito muda.',
    risk: 'Risco: não atualizar o sistema de emissão de NF a tempo.',
    riskColor: 'text-warning',
  },
  {
    badge: 'Indústria · Lucro Real',
    before:
      'Antes: IPI + ICMS + PIS/COFINS não-cumulativos. Créditos complexos mas conhecidos.',
    after:
      'A partir de 2026: convivência com CBS e IBS sobre as mesmas operações, além de eventual Imposto Seletivo sobre insumos. O controle de crédito fica mais granular e exige rastreabilidade por operação.',
    risk: 'Risco: perda de crédito de IBS por falta de rastreabilidade das operações.',
    riskColor: 'text-critical',
  },
];

export default function WhyItMatters() {
  return (
    <section className="bg-paper border-t border-sand py-24 lg:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — Na prática
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-3xl leading-[1.04]">
          O que muda no dia a dia da sua empresa
        </h2>
        <p className="font-body text-[17px] text-slate max-w-2xl mt-4 leading-relaxed">
          Não é só uma mudança de nome. É uma mudança na forma de apurar, calcular e recolher. Veja exemplos reais.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {examples.map((e) => (
            <article
              key={e.badge}
              className="border border-sand rounded-2xl p-8 bg-paper-50 flex flex-col"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-slate mb-5">
                {e.badge}
              </div>
              <p className="font-body text-[14px] text-slate mb-3 leading-relaxed">
                {e.before}
              </p>
              <div className="border-t border-sand my-5" aria-hidden="true" />
              <p className="font-body text-[14px] text-ink leading-relaxed">
                {e.after}
              </p>
              <p className={`font-mono text-[11px] mt-4 ${e.riskColor}`}>
                {e.risk}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-[17px] text-ink max-w-xl mx-auto leading-relaxed">
            Esses são apenas três exemplos. Cada CNPJ tem uma combinação diferente de riscos — dependendo do regime, do setor e dos estados onde opera.
          </p>
          <p className="font-body text-[15px] text-slate mt-3">
            É exatamente para isso que a SmarTax existe.
          </p>
        </div>
      </div>
    </section>
  );
}
