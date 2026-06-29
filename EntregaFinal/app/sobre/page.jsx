// TODO: quando a história dos fundadores estiver pronta, adicionar uma seção
// "Quem está por trás" (foto + nome + cargo + bio curta) abaixo da seção
// "Princípios". Evitar afirmações genéricas — usar fatos verificáveis.
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sobre — SmarTax',
  description:
    'A SmarTax é a plataforma fiscal nascida com a Reforma Tributária — cálculo, compreensão e proteção em um só lugar. Conheça por que existimos, o que estamos construindo e nossos princípios.',
};

const fases = [
  {
    n: 'Fase 1',
    titulo: 'Compliance da Reforma',
    desc: 'O núcleo: calcular, entender e cumprir CBS, IBS e Imposto Seletivo durante a transição.',
  },
  {
    n: 'Fase 2',
    titulo: 'Gestão financeira',
    desc: 'Conectar a apuração fiscal ao caixa do dia a dia: fluxo, conciliação, planejamento.',
  },
  {
    n: 'Fase 3',
    titulo: 'Plataforma all-in-one',
    desc: 'O sistema operacional financeiro, fiscal, trabalhista e jurídico do negócio.',
  },
];

const principios = [
  {
    titulo: 'Privacidade por padrão',
    desc: 'Sempre que possível, o processamento acontece no seu próprio navegador. Nenhum XML, planilha ou dado sensível trafega para nossos servidores quando o cálculo cabe localmente.',
  },
  {
    titulo: 'Educação, não substituição',
    desc: 'Nossas ferramentas são estimativas educativas baseadas na LC 214/2025 e na regulamentação vigente. Elas ajudam você a entender e decidir — não substituem seu contador ou a apuração oficial.',
  },
  {
    titulo: 'Evolução com a regulação',
    desc: 'A Reforma é viva: alíquotas, convênios e instruções normativas mudam. Acompanhamos as fontes oficiais e atualizamos as ferramentas e o boletim conforme as regras se consolidam.',
  },
];

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Sobre
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[44px] lg:text-[52px] leading-[1.04]">
              Sobre o SmarTax
            </h1>
            <p className="mt-6 font-body text-lg text-white/70 max-w-2xl">
              A plataforma fiscal nascida com a Reforma Tributária. Cálculo, compreensão e
              proteção em um só lugar — para contadores, empresas e empreendedores que precisam
              atravessar a maior reorganização tributária em décadas com clareza.
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-14">
          {/* Por que existimos */}
          <section>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
              — Por que existimos
            </span>
            <h2 className="mt-4 font-display font-semibold text-[28px] lg:text-[32px] text-ink tracking-tightest">
              A maior reorganização fiscal em décadas
            </h2>
            <div className="mt-5 grid gap-4 font-body text-[15.5px] text-slate leading-relaxed">
              <p>
                A Reforma Tributária reescreve o jogo do compliance brasileiro. Cinco tributos
                viram dois (CBS e IBS), entra o Imposto Seletivo, e cada operação precisa de
                memória de cálculo, NCM correto, CFOP coerente e crédito apropriado. Quem domina
                a nova mecânica transforma confusão em vantagem competitiva.
              </p>
              <p>
                O SmarTax existe para encurtar essa curva — entregando ferramentas práticas e
                conteúdo claro para que profissionais e empresas tomem decisões fiscais com
                segurança durante a transição e depois dela.
              </p>
            </div>
          </section>

          {/* O que estamos construindo */}
          <section>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
              — O que estamos construindo
            </span>
            <h2 className="mt-4 font-display font-semibold text-[28px] lg:text-[32px] text-ink tracking-tightest">
              Hoje compliance. Amanhã, sistema operacional financeiro.
            </h2>
            <ul className="mt-7 grid sm:grid-cols-3 gap-5">
              {fases.map((f) => (
                <li
                  key={f.n}
                  className="bg-paper-50 border border-sand rounded-2xl p-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
                    {f.n}
                  </span>
                  <h3 className="mt-3 font-display font-semibold text-[17px] text-ink tracking-tightest leading-snug">
                    {f.titulo}
                  </h3>
                  <p className="mt-2 font-body text-[13.5px] text-slate leading-relaxed">
                    {f.desc}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[12px] text-slate">
              <Link href="/roadmap" className="hover:text-ink transition-colors">
                Ver o roadmap completo →
              </Link>
            </p>
          </section>

          {/* Princípios */}
          <section>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate">
              — Princípios
            </span>
            <h2 className="mt-4 font-display font-semibold text-[28px] lg:text-[32px] text-ink tracking-tightest">
              Como pensamos o produto
            </h2>
            <ul className="mt-7 flex flex-col gap-5">
              {principios.map((p) => (
                <li
                  key={p.titulo}
                  className="bg-paper-50 border border-sand rounded-2xl p-6"
                >
                  <h3 className="font-display font-semibold text-[18px] text-ink tracking-tightest">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 font-body text-[14.5px] text-slate leading-relaxed">
                    {p.desc}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="bg-ink text-white rounded-2xl p-8 lg:p-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
              — Próximos passos
            </span>
            <h2 className="mt-4 font-display font-semibold text-[24px] lg:text-[28px] tracking-tightest">
              Acompanhe a construção
            </h2>
            <p className="mt-3 font-body text-[15px] text-white/70 max-w-2xl leading-relaxed">
              O SmarTax evolui em ciclos curtos, guiados por feedback real de contadores e
              empresas. Veja onde estamos e o que vem a seguir — ou fale com a gente.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/roadmap"
                className="inline-flex items-center bg-amber text-midnight font-medium px-5 py-3 rounded-lg font-body text-[14px] hover:opacity-90 transition-opacity"
              >
                Ver o roadmap
              </Link>
              <Link
                href="/#contato"
                className="inline-flex items-center bg-white/10 text-white font-medium px-5 py-3 rounded-lg font-body text-[14px] hover:bg-white/15 transition-colors"
              >
                Fale com a gente
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
