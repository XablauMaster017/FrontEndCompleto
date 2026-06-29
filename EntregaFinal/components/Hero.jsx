import Link from 'next/link';
import LeadCaptureForm from './LeadCaptureForm';

export default function Hero() {
  return (
    <section className="relative bg-midnight text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 70% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, #000 30%, transparent 75%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-24 lg:pb-32 grid lg:grid-cols-[1.15fr,1fr] gap-14 lg:gap-20 items-center">
        <div>
          <span
            className="fade-up inline-block font-mono text-[11px] tracking-[0.18em] uppercase text-amber"
            style={{ animationDelay: '0ms' }}
          >
            <span aria-hidden="true">↳ </span>Reforma Tributária · LC 214/25
          </span>

          <h1
            className="fade-up mt-7 font-display font-semibold tracking-tightest text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.02]"
            style={{ animationDelay: '120ms' }}
          >
            Sua empresa está preparada para a maior mudança tributária dos últimos 40 anos?
          </h1>

          <p
            className="fade-up mt-7 font-body text-lg text-white/70 max-w-xl leading-relaxed"
            style={{ animationDelay: '260ms' }}
          >
            A Reforma Tributária já é lei. A partir de 2026, CBS, IBS e Imposto Seletivo substituem os tributos que você conhece — e quem não se adaptar paga multa. A SmarTax foi feita para isso.
          </p>

          <div
            className="fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '380ms' }}
          >
            <a
              href="#reforma"
              className="inline-flex items-center gap-2 bg-amber text-midnight font-medium px-6 py-3.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Entender a Reforma <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/pesquisa"
              className="inline-flex items-center bg-transparent border border-white/25 text-white font-medium px-6 py-3.5 rounded-lg hover:bg-white/[0.04] hover:border-white/40 transition-colors"
            >
              Preencher formulário
            </Link>
          </div>

          <div
            className="fade-up mt-9 max-w-md"
            style={{ animationDelay: '500ms' }}
          >
            <LeadCaptureForm
              origem="hero"
              variant="dark"
              buttonLabel="Entrar na lista de espera"
              successMessage="✓ Você está na lista."
            />
            <p className="mt-2 font-mono text-[10px] tracking-[0.14em] uppercase text-white/35">
              Acesso antecipado · sem spam
            </p>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-white/40">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            Em desenvolvimento · Acesso antecipado · 2026
          </div>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}

function HeroPanel() {
  return (
    <div
      className="fade-up relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-7 backdrop-blur-[2px]"
      style={{ animationDelay: '600ms' }}
      aria-label="Pré-visualização de apuração"
    >
      <div
        aria-hidden="true"
        className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-amber/60 to-transparent"
      />

      <div className="flex items-start justify-between pb-5 border-b border-white/10">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
            CNPJ 12.345.678/0001-99
          </div>
          <div className="font-display text-[15px] text-white/90 mt-1.5">
            Apuração — Maio/2026
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-success">
          <span className="relative flex">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-success opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          ao vivo
        </div>
      </div>

      <dl className="mt-6 space-y-4">
        <Row label="Base de cálculo"        value="R$ 1.248.300,00" />
        <Row label="CBS · 8,8%"             value="R$ 109.850,40" accent />
        <Row label="IBS · 17,5%"            value="R$ 218.452,50" accent />
        <Row label="IS · Bebidas · 12%"     value="R$ 14.940,00"  accent />
      </dl>

      <div className="mt-7 pt-5 border-t border-white/10 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            Total devido
          </div>
          <div className="font-body text-[11px] text-white/40 mt-0.5">
            Apurado em 1,2s
          </div>
        </div>
        <div className="font-mono text-2xl text-amber tabular-nums">
          R$ 343.242,90
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="font-body text-[13px] text-white/60">{label}</dt>
      <dd className={`font-mono text-[15px] tabular-nums ${accent ? 'text-amber' : 'text-white'}`}>
        {value}
      </dd>
    </div>
  );
}
