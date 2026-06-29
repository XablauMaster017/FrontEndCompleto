import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { requireAdmin } from '@/lib/auth/perfil';

export const metadata = {
  title: 'Admin — SmarTax',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const CARDS = [
  {
    href: '/admin/atualizacoes',
    titulo: 'Atualizações da Reforma',
    descricao: 'Revisar, editar e publicar os itens coletados das fontes oficiais.',
  },
  {
    href: '/admin/usuarios',
    titulo: 'Usuários e papéis',
    descricao: 'Promover ou rebaixar contas entre free, assinante e admin.',
  },
];

export default async function AdminHomePage() {
  if (!(await requireAdmin())) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Painel interno
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[32px] md:text-[40px] leading-[1.05]">
              Administração
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-2 gap-5">
            {CARDS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="bg-paper-50 border border-sand rounded-2xl p-7 hover:border-ink/40 transition-colors flex flex-col"
              >
                <h2 className="font-display font-semibold text-[20px] text-ink tracking-tightest">
                  {c.titulo}
                </h2>
                <p className="mt-2 font-body text-[14px] text-slate leading-relaxed flex-1">
                  {c.descricao}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest text-ink">
                  Abrir <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
