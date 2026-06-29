const rows = [
  { c: 'Foco na Reforma Tributária', a: 'Secundário',    b: 'Generalista',  s: 'Core do produto' },
  { c: 'Cálculo automático CBS/IBS', a: 'Parcial',       b: 'Manual (lento)', s: 'Automático'   },
  { c: 'Atualização em tempo real',  a: 'Não',           b: 'Não',          s: 'Sim'             },
  { c: 'Consultoria integrada',      a: 'Não',           b: 'Sim — caro',   s: 'Inclusa no plano' },
  { c: 'Custo acessível para PMEs',  a: 'Sim',           b: 'Não',          s: 'Sim'             },
];

function Check() {
  return (
    <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-amber text-midnight shrink-0">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12l5 5L20 6" />
      </svg>
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="bg-paper border-t border-sand py-24 lg:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-slate">
          — Comparativo
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] text-ink max-w-3xl leading-[1.04]">
          Feita para a Reforma. Não adaptada às pressas.
        </h2>

        <div className="mt-14 -mx-6 px-6 lg:mx-0 lg:px-0 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left py-5 pr-6 font-mono text-[11px] tracking-[0.18em] uppercase text-slate font-normal align-bottom">
                  Critério
                </th>
                <th className="text-left py-5 px-4 font-body text-sm text-ink-700 font-normal align-bottom">
                  Omie / Conta Azul
                </th>
                <th className="text-left py-5 px-4 font-body text-sm text-ink-700 font-normal align-bottom">
                  Escritório Contábil
                </th>
                <th className="text-left py-5 px-5 font-display font-semibold text-[15px] text-white bg-ink rounded-t-xl align-bottom">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber" aria-hidden="true" />
                    SmarTax
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const last = i === rows.length - 1;
                return (
                  <tr key={r.c}>
                    <td className="py-5 pr-6 font-body text-[14.5px] text-ink border-t border-sand">
                      {r.c}
                    </td>
                    <td className="py-5 px-4 font-body text-[14px] text-slate border-t border-sand">
                      {r.a}
                    </td>
                    <td className="py-5 px-4 font-body text-[14px] text-slate border-t border-sand">
                      {r.b}
                    </td>
                    <td
                      className={`py-5 px-5 font-body text-[14.5px] text-white bg-ink ${
                        last ? 'rounded-b-xl' : ''
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <Check />
                        {r.s}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
