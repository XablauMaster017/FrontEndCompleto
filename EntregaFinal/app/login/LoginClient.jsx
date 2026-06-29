'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

const ALLOW_SIGNUP = process.env.NEXT_PUBLIC_AUTH_ALLOW_SIGNUP === 'true';

function destinoSeguro() {
  if (typeof window === 'undefined') return '/';
  const r = new URLSearchParams(window.location.search).get('redirect');
  return r && r.startsWith('/') && !r.startsWith('//') ? r : '/';
}

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('E-mail ou senha inválidos.');
      return;
    }

    router.push(destinoSeguro());
    router.refresh();
  };

  const inputCls =
    'w-full rounded-lg px-4 py-3 font-body text-[15px] bg-white/[0.06] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-amber';

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
          — Acesso
        </span>
        <h1 className="mt-4 font-display font-semibold tracking-tightest text-[32px] md:text-[40px] leading-[1.05]">
          Entrar na SmarTax
        </h1>
        <p className="mt-3 font-body text-[15px] text-white/60">
          Acesso às ferramentas durante o período de testes.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
        <div>
          <label htmlFor="login-email" className="font-body text-[13px] text-white/70">
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="voce@empresa.com.br"
            className={`mt-1.5 ${inputCls}`}
          />
        </div>

        <div>
          <label htmlFor="login-password" className="font-body text-[13px] text-white/70">
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="••••••••"
            className={`mt-1.5 ${inputCls}`}
          />
        </div>

        {status === 'error' && (
          <p className="text-critical font-body text-[14px]">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-2 bg-amber text-midnight font-medium px-6 py-3.5 rounded-lg font-body text-[15px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Entrando…' : 'Entrar'}
        </button>
      </form>

      {ALLOW_SIGNUP && (
        <p className="mt-6 text-center font-body text-[14px] text-white/55">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-amber underline underline-offset-2">
            Criar conta
          </Link>
        </p>
      )}

      <p className="mt-8 text-center font-mono text-[11px] tracking-[0.12em] uppercase text-white/35">
        Acesso por convite · em breve aberto a todos
      </p>
    </div>
  );
}
