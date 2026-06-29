'use client';

import { useState } from 'react';
import { inscreverNewsletter } from '@/lib/actions/regulacao';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulário de inscrição no boletim da Reforma. Grava como 'pendente' (double
 * opt-in); o e-mail de confirmação será disparado quando o provedor existir.
 * variant: 'dark' | 'light'.
 */
export default function NewsletterForm({ variant = 'dark', className = '' }) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const dark = variant === 'dark';
  const inputCls = dark
    ? 'bg-white/[0.06] border border-white/15 text-white placeholder-white/30 focus:border-amber'
    : 'bg-white border border-sand text-ink placeholder-slate/50 focus:border-ink';
  const btnCls = dark ? 'bg-amber text-midnight' : 'bg-ink text-white';
  const textMuted = dark ? 'text-white/60' : 'text-slate';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!EMAIL_RE.test(email.trim()) || !consent) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const res = await inscreverNewsletter({ email: email.trim(), consentimento: consent }).catch(
      () => ({ ok: false }),
    );
    setStatus(res?.ok ? 'done' : 'error');
  };

  if (status === 'done') {
    return (
      <p className={`font-body text-[15px] font-medium ${dark ? 'text-amber' : 'text-success'} ${className}`} role="status">
        ✓ Inscrição registrada! Você será avisado assim que o boletim começar a ser enviado.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">E-mail</label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="voce@empresa.com.br"
          className={`flex-1 rounded-lg px-4 py-3 font-body text-[15px] focus:outline-none ${inputCls}`}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`whitespace-nowrap rounded-lg px-5 py-3 font-medium font-body text-[15px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed ${btnCls}`}
        >
          {status === 'sending' ? 'Enviando…' : 'Receber o boletim'}
        </button>
      </div>

      <label className={`mt-3 flex items-start gap-2 font-body text-[12px] ${textMuted} cursor-pointer`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (status === 'error') setStatus('idle');
          }}
          className="mt-0.5 w-4 h-4 accent-amber shrink-0"
        />
        <span>
          Concordo em receber o boletim da Reforma Tributária por e-mail e com o tratamento do meu
          e-mail conforme a{' '}
          <a href="/privacidade" className={dark ? 'underline text-white/80' : 'underline text-ink'}>
            Política de Privacidade
          </a>
          .
        </span>
      </label>

      {status === 'error' && (
        <p className="text-critical font-body text-[13px] mt-2">
          Informe um e-mail válido e marque o consentimento.
        </p>
      )}
    </form>
  );
}
