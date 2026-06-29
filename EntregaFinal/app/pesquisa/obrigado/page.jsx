import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Obrigado pela sua resposta! — SmarTax',
  description:
    'Recebemos suas respostas. Obrigado por ajudar a construir a SmarTax, a plataforma da Reforma Tributária.',
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight text-white min-h-screen flex items-center justify-center px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <div
            className="mx-auto w-16 h-16 rounded-full border-2 border-amber flex items-center justify-center text-amber"
            aria-hidden="true"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12l5 5L20 6" />
            </svg>
          </div>

          <h1 className="mt-8 font-display font-semibold tracking-tightest text-[34px] md:text-[44px] leading-[1.04]">
            Obrigado pela sua resposta!
          </h1>

          <p className="mt-5 font-body text-lg text-white/70">
            Suas respostas chegaram e vão moldar diretamente o produto que
            estamos construindo. Em breve você terá novidades da SmarTax.
          </p>

          <a
            href="/"
            className="mt-9 inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <span aria-hidden="true">←</span> Voltar ao site
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
