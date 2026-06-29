import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Página não encontrada — SmarTax',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight text-white min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
            Erro 404
          </p>
          <h1 className="mt-5 font-display font-semibold tracking-tightest text-[40px] md:text-[56px] leading-[1.04]">
            Página não encontrada
          </h1>
          <p className="mt-5 font-body text-lg text-white/70">
            A página que você procura não existe ou foi movida. Confira o
            endereço ou volte para o início.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <span aria-hidden="true">←</span> Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
