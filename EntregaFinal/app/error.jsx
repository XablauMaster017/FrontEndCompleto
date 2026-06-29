'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <main className="bg-midnight text-white min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
          Algo deu errado
        </p>
        <h1 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] leading-[1.04]">
          Tivemos um problema ao carregar esta página
        </h1>
        <p className="mt-5 font-body text-lg text-white/70">
          Tente novamente. Se o erro persistir, volte ao início e tente mais
          tarde.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center bg-amber text-midnight font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <span aria-hidden="true">←</span> Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
