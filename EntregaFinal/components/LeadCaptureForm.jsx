'use client';

import { useState } from 'react';
import { criarLead } from '@/lib/actions/leads';
import { enviarFormspree } from '@/lib/formspree';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulário reutilizável de captura de lead (waitlist).
 * Grava via Server Action criarLead. Variantes visuais: 'dark' | 'light'.
 */
export default function LeadCaptureForm({
  origem,
  buttonLabel = 'Quero ser avisado',
  successMessage = '✓ Pronto! Você está na lista.',
  placeholder = 'voce@empresa.com.br',
  variant = 'dark',
  respostas,
  utm,
  className = '',
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const dark = variant === 'dark';
  const inputCls = dark
    ? 'bg-white/[0.06] border border-white/15 text-white placeholder-white/30 focus:border-amber'
    : 'bg-white border border-sand text-ink placeholder-slate/50 focus:border-ink';
  const btnCls = dark
    ? 'bg-amber text-midnight'
    : 'bg-ink text-white';
  const successCls = dark ? 'text-amber' : 'text-success';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const emailNorm = email.trim();
    // Supabase (sistema de registro) + Formspree (notificação/backup) em paralelo.
    const [leadRes, formspreeOk] = await Promise.all([
      criarLead({ email: emailNorm, origem, consentimento: true, respostas, utm }).catch(() => ({ ok: false })),
      enviarFormspree({
        _subject: `SmarTax — lista de espera (${origem})`,
        email: emailNorm,
        origem,
        ...(respostas || {}),
        ...(utm || {}),
      }),
    ]);
    const ok = Boolean(leadRes?.ok) || formspreeOk;
    setStatus(ok ? 'done' : 'error');
  };

  if (status === 'done') {
    return (
      <p className={`font-body text-[15px] font-medium ${successCls} ${className}`} role="status">
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`lead-email-${origem}`} className="sr-only">
          E-mail
        </label>
        <input
          id={`lead-email-${origem}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder={placeholder}
          className={`flex-1 rounded-lg px-4 py-3 font-body text-[15px] focus:outline-none ${inputCls}`}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`whitespace-nowrap rounded-lg px-5 py-3 font-medium font-body text-[15px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed ${btnCls}`}
        >
          {status === 'sending' ? 'Enviando…' : buttonLabel}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-critical font-body text-[13px] mt-2">
          Informe um e-mail válido e tente novamente.
        </p>
      )}
    </form>
  );
}
