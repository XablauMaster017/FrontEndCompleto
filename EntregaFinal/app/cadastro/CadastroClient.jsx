'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CadastroClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aceite, setAceite] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | error | check-email
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setErrorMsg('Informe um e-mail válido.');
      return;
    }
    if (password.length < 8) {
      setStatus('error');
      setErrorMsg('A senha deve ter ao menos 8 caracteres.');
      return;
    }
    if (!aceite) {
      setStatus('error');
      setErrorMsg('É necessário aceitar os Termos e a Política de Privacidade.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setStatus('error');
      setErrorMsg(error.message || 'Não foi possível criar a conta.');
      return;
    }

    // Sem confirmação de e-mail → já vem com sessão; com confirmação → sem sessão.
    if (data?.session) {
      router.push('/');
      router.refresh();
    } else {
      setStatus('check-email');
    }
  };

  const inputCls =
    'w-full rounded-lg px-4 py-3 font-body text-[15px] bg-white/[0.06] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-amber';

  if (status === 'check-email') {
    return (
      <div className="w-full max-w-md text-center">
        <h1 className="font-display font-semibold tracking-tightest text-[30px] leading-[1.05]">
          Confirme seu e-mail
        </h1>
        <p className="mt-4 font-body text-[15px] text-white/70">
          Enviamos um link de confirmação para <strong>{email.trim()}</strong>. Abra-o
          para ativar sua conta e acessar as ferramentas.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-2 border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/[0.06] transition-colors"
        >
          <span aria-hidden="true">←</span> Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
          — Criar conta
        </span>
        <h1 className="mt-4 font-display font-semibold tracking-tightest text-[32px] md:text-[40px] leading-[1.05]">
          Criar conta na SmarTax
        </h1>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
        <div>
          <label htmlFor="cad-email" className="font-body text-[13px] text-white/70">E-mail</label>
          <input
            id="cad-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
            placeholder="voce@empresa.com.br"
            className={`mt-1.5 ${inputCls}`}
          />
        </div>
        <div>
          <label htmlFor="cad-password" className="font-body text-[13px] text-white/70">Senha</label>
          <input
            id="cad-password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (status === 'error') setStatus('idle'); }}
            placeholder="mínimo 8 caracteres"
            className={`mt-1.5 ${inputCls}`}
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={aceite}
            onChange={(e) => { setAceite(e.target.checked); if (status === 'error') setStatus('idle'); }}
            className="mt-1 w-4 h-4 shrink-0 accent-amber"
          />
          <span className="font-body text-[13px] text-white/70 leading-relaxed">
            Li e aceito os{' '}
            <Link href="/termos" target="_blank" className="text-amber underline underline-offset-2">Termos de Uso</Link>{' '}
            e a{' '}
            <Link href="/privacidade" target="_blank" className="text-amber underline underline-offset-2">Política de Privacidade</Link>.
          </span>
        </label>

        {status === 'error' && (
          <p className="text-critical font-body text-[14px]">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-2 bg-amber text-midnight font-medium px-6 py-3.5 rounded-lg font-body text-[15px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Criando…' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-[14px] text-white/55">
        Já tem conta?{' '}
        <Link href="/login" className="text-amber underline underline-offset-2">Entrar</Link>
      </p>
    </div>
  );
}
