import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth/perfil';
import AtualizacoesAdminClient from './AtualizacoesAdminClient';

export const metadata = {
  title: 'Admin — Atualizações',
  robots: { index: false, follow: false },
};

// Lê a sessão (cookies) → sempre dinâmica.
export const dynamic = 'force-dynamic';

async function getPendentes() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('regulacao_atualizacoes')
    .select('id, titulo, ementa, fonte, fonte_url, data, tags')
    .eq('status', 'pendente')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) return [];
  return data || [];
}

export default async function AdminAtualizacoesPage() {
  // Gate: role 'admin' (profiles) OU allowlist ADMIN_EMAILS. Senão → 404.
  if (!(await requireAdmin())) notFound();

  const pendentes = await getPendentes();

  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Admin · Curadoria
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[32px] md:text-[40px] leading-[1.05]">
              Atualizações pendentes
            </h1>
            <p className="mt-4 font-body text-[15px] text-white/70 max-w-2xl">
              Revise os itens coletados das fontes oficiais, edite o resumo educativo e publique —
              ou rejeite o que não for relevante.
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <AtualizacoesAdminClient pendentes={pendentes} />
        </div>
      </main>
      <Footer />
    </>
  );
}
