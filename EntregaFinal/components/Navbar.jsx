'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';

// O client de auth (supabase-js) é carregado sob demanda via import() dinâmico
// para não entrar no bundle inicial de todas as páginas (perf da landing/SEO).

const links = [
  { href: '/#problema',      label: 'Problema' },
  { href: '/#reforma',       label: 'A Reforma' },
  { href: '/#solucao',       label: 'Solução' },
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#roadmap',       label: 'Roadmap' },
  { href: '/pesquisa',       label: 'Pesquisa' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let active = true;
    let unsub = () => {};
    import('@/lib/supabase/browser').then(({ createSupabaseBrowserClient }) => {
      if (!active) return;
      const supabase = createSupabaseBrowserClient();
      supabase.auth.getUser().then(({ data }) => {
        if (active) setUser(data?.user ?? null);
      });
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      unsub = () => sub?.subscription?.unsubscribe();
    });
    return () => {
      active = false;
      unsub();
    };
  }, []);

  const sair = async () => {
    const { createSupabaseBrowserClient } = await import('@/lib/supabase/browser');
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 print:hidden ${
        scrolled
          ? 'bg-[rgba(6,11,26,0.82)] backdrop-blur-md border-b border-white/[0.06]'
          : 'bg-midnight border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-amber group">
          <Logo size={26} />
          <span className="font-display font-semibold text-white text-lg tracking-tightest">
            SmarTax
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-[14px] text-white/70">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <button
              type="button"
              onClick={sair}
              className="font-body text-[14px] text-white/70 hover:text-white transition-colors"
            >
              Sair
            </button>
          ) : (
            <Link
              href="/login"
              className="font-body text-[14px] text-white/70 hover:text-white transition-colors"
            >
              Entrar
            </Link>
          )}
          <Link
            href="/#contato"
            className="inline-flex items-center bg-amber text-midnight font-medium text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Falar com a gente
          </Link>
        </div>

        <button
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="md:hidden text-white p-1.5 -mr-1.5"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[rgba(6,11,26,0.95)] backdrop-blur-md">
          <nav className="px-6 py-5 flex flex-col gap-4 font-body text-white/85">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <button
                type="button"
                onClick={sair}
                className="text-left py-1 text-white/85"
              >
                Sair
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="py-1">
                Entrar
              </Link>
            )}
            <Link
              href="/#contato"
              onClick={() => setOpen(false)}
              className="mt-2 bg-amber text-midnight font-medium text-center py-3 rounded-lg"
            >
              Falar com a gente
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
