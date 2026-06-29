import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth/perfil';
import UsuariosAdminClient from './UsuariosAdminClient';

export const metadata = {
  title: 'Admin — Usuários',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function getUsuarios() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, created_at')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) return [];
  return data || [];
}

export default async function AdminUsuariosPage() {
  if (!(await requireAdmin())) notFound();

  const usuarios = await getUsuarios();

  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Admin · Usuários
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[32px] md:text-[40px] leading-[1.05]">
              Usuários e papéis
            </h1>
            <p className="mt-4 font-body text-[15px] text-white/70 max-w-2xl">
              Promova ou rebaixe contas entre <strong>free</strong>, <strong>assinante</strong> e{' '}
              <strong>admin</strong>. A mudança vale imediatamente no próximo acesso do usuário.
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <UsuariosAdminClient usuarios={usuarios} />
        </div>
      </main>
      <Footer />
    </>
  );
}
