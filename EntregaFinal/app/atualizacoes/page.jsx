import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import NewsletterForm from '@/components/NewsletterForm';
import BuscaAtualizacoes from './BuscaAtualizacoes';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartaxsite.vercel.app';

export const metadata = {
  title: 'Atualizações da Reforma Tributária — SmarTax',
  description:
    'Acompanhe as mudanças de legislação e regulação da Reforma Tributária (CBS, IBS e Imposto Seletivo) explicadas em linguagem simples. Receba o boletim por e-mail.',
};

// Revalida periodicamente (o conteúdo é publicado pelo admin; ISR de 1h).
export const revalidate = 3600;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Atualizações da Reforma Tributária',
  url: `${SITE_URL}/atualizacoes`,
  description: metadata.description,
};

async function getAtualizacoes() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from('regulacao_atualizacoes')
    .select('id, titulo, resumo, fonte, fonte_url, data, tags')
    .eq('status', 'publicado')
    .order('data', { ascending: false })
    .limit(100);
  if (error) return [];
  return data || [];
}

export default async function AtualizacoesPage() {
  const itens = await getAtualizacoes();

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Boletim · Reforma Tributária
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[44px] lg:text-[52px] leading-[1.04]">
              Atualizações da Reforma Tributária
            </h1>
            <p className="mt-6 font-body text-lg text-white/70 max-w-2xl">
              Mudanças de legislação e regulação (CBS, IBS e Imposto Seletivo) explicadas em
              linguagem simples. Acompanhe aqui ou receba por e-mail.
            </p>
            <div className="mt-8 max-w-xl">
              <NewsletterForm variant="dark" />
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <BuscaAtualizacoes itensIniciais={itens} />
        </div>
      </main>
      <Footer />
    </>
  );
}
