'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { criarLead } from '@/lib/actions/leads';
import { enviarFormspree } from '@/lib/formspree';

const PORTE_OPTIONS = [
  'Microempreendedor Individual (MEI)',
  'Microempresa (ME)',
  'Empresa de pequeno porte (EPP)',
  'Média ou Grande empresa',
  'Não tenho empresa (funcionário/estudante)',
];

const CONTADOR_OPTIONS = [
  'Sim, contador fixo',
  'Sim, de forma eventual',
  'Não tenho contador',
];

const MULTA_OPTIONS = ['Sim', 'Não', 'Não sei / Não tenho certeza'];

const REFORMA_OPTIONS = [
  'Entendo bem as mudanças',
  'Ouvi falar, mas não entendo direito',
  'Desconheço totalmente',
];

const COMO_RESOLVE_OPTIONS = [
  'Contador ou escritório contábil',
  'Software (Omie, Conta Azul, etc.)',
  'Planilha própria ou manualmente',
  'Não tenho controle claro',
];

const TEMPO_OPTIONS = [
  'Menos de 2 horas',
  'Entre 2 e 8 horas',
  'Mais de 8 horas',
  'Não sei estimar',
];

const PAGA_HOJE_OPTIONS = [
  'Nada (resolvo sozinho)',
  'Até R$ 400 / mês',
  'Entre R$ 400 e R$ 1.000 / mês',
  'Mais de R$ 1.000 / mês',
];

const USARIA_OPTIONS = [
  'Sim, com certeza',
  'Talvez, dependeria dos detalhes',
  'Não usaria',
];

const PAGARIA_OPTIONS = [
  'Até R$ 100 / mês',
  'Entre R$ 100 e R$ 300 / mês',
  'Entre R$ 300 e R$ 700 / mês',
  'Acima de R$ 700 / mês',
  'Só usaria se fosse grátis',
];

function RadioGroup({ name, options, value, onChange, theme }) {
  const isDark = theme === 'dark';
  const hoverBg = isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]';
  const unselectedBorder = isDark ? 'border-white/25' : 'border-sand';
  const selectedClasses = isDark ? 'border-amber bg-amber' : 'border-ink bg-ink';
  const dotColor = isDark ? 'bg-midnight' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-ink';

  return (
    <div className="mt-3 flex flex-col gap-1">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <label
            key={opt}
            className={`cursor-pointer flex items-center gap-3 py-3 px-4 rounded-lg border border-transparent ${hoverBg} transition-colors`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected}
              onChange={() => onChange(opt)}
              required
              className="sr-only"
            />
            <span
              className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                selected ? selectedClasses : unselectedBorder
              }`}
            >
              {selected && <span className={`w-[7px] h-[7px] rounded-full ${dotColor}`} />}
            </span>
            <span className={`font-body text-[15px] ${textColor}`}>{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function ScaleButtons({ name, value, onChange, leftLabel, rightLabel }) {
  return (
    <div className="mt-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${name} ${n}`}
              className={`w-11 h-11 rounded-lg border font-mono text-[15px] font-medium transition-all cursor-pointer ${
                selected
                  ? 'border-ink bg-ink text-white'
                  : 'border-sand text-slate bg-transparent hover:border-ink hover:text-ink'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-slate">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function QuestionLabel({ children, theme }) {
  const color = theme === 'dark' ? 'text-white' : 'text-ink';
  return (
    <p className={`font-body text-[15px] font-medium ${color}`}>{children}</p>
  );
}

export default function PesquisaClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    q2: '',
    q3: '',
    q4: null,
    q5: '',
    q6: '',
    q7: null,
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    consentimento: false,
  });
  const [status, setStatus] = useState('idle');

  const update = (key) => (val) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const requiredFields = [
      'email', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7',
      'q8', 'q9', 'q10', 'q11', 'q12', 'q13',
    ];
    const hasEmpty = requiredFields.some((k) => {
      const v = formData[k];
      return v === '' || v === null;
    });
    if (hasEmpty) {
      setStatus('error_validation');
      return;
    }

    if (!formData.consentimento) {
      setStatus('error_consent');
      return;
    }

    setStatus('sending');

    // Respostas estruturadas da pesquisa
    const respostas = {
      porte_empresa: formData.q2,
      tem_contador: formData.q3,
      seguranca_fiscal: formData.q4,
      ja_pagou_multa: formData.q5,
      conhece_reforma: formData.q6,
      preocupacao_reforma: formData.q7,
      como_resolve_impostos: formData.q8,
      tempo_gasto_mes: formData.q9,
      quanto_paga_hoje: formData.q10,
      usaria_plataforma: formData.q11,
      quanto_pagaria: formData.q12,
      mais_importante: formData.q13,
    };

    // UTM da URL (utm_source / utm_medium / utm_campaign)
    let utm = null;
    try {
      const p = new URLSearchParams(window.location.search);
      const u = {
        utm_source: p.get('utm_source') || undefined,
        utm_medium: p.get('utm_medium') || undefined,
        utm_campaign: p.get('utm_campaign') || undefined,
      };
      if (u.utm_source || u.utm_medium || u.utm_campaign) utm = u;
    } catch {
      utm = null;
    }

    // Supabase (sistema de registro) + Formspree (notificação/backup) em paralelo.
    const [leadRes, formspreeOk] = await Promise.all([
      criarLead({
        email: formData.email,
        origem: 'pesquisa',
        consentimento: formData.consentimento,
        respostas,
        utm,
      }).catch(() => ({ ok: false })),
      enviarFormspree({
        _subject: 'SmarTax — nova resposta da pesquisa',
        email: formData.email,
        consentimento: formData.consentimento,
        ...respostas,
        ...(utm || {}),
      }),
    ]);

    if (Boolean(leadRes?.ok) || formspreeOk) {
      setStatus('sent');
      router.push('/pesquisa/obrigado');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Pesquisa de validação
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[44px] lg:text-[52px] leading-[1.04]">
              SmarTax — Solução para Reforma Tributária
            </h1>
            <p className="mt-6 font-body text-lg text-white/70 max-w-2xl">
              Estamos desenvolvendo uma solução focada em simplificar a gestão
              de impostos e aumentar a transparência sobre o que as empresas
              pagam e por quê. Este formulário leva menos de 3 minutos e suas
              respostas serão essenciais para construir uma ferramenta
              realmente útil no dia a dia empresarial.
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.18em] uppercase text-white/45">
              * Indica uma pergunta obrigatória
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-16">
          {status === 'sent' ? (
            <div className="bg-ink text-white rounded-2xl p-12 text-center">
              <h2 className="font-display font-semibold tracking-tightest text-[32px] md:text-[40px] leading-[1.04]">
                Obrigado pela sua resposta!
              </h2>
              <p className="mt-5 font-body text-lg text-white/70 max-w-xl mx-auto">
                Suas respostas chegaram. Elas vão moldar diretamente o produto
                que estamos construindo.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center border border-white/20 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                ← Voltar ao site
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-8">
              {/* Bloco 1 — Perfil */}
              <section className="bg-ink text-white rounded-2xl p-8 lg:p-10">
                <p className="font-mono text-[11px] tracking-widest uppercase text-amber mb-6">
                  01 — Perfil
                </p>

                <div className="grid gap-8">
                  <div>
                    <QuestionLabel theme="dark">E-mail *</QuestionLabel>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => update('email')(e.target.value)}
                      placeholder="voce@empresa.com.br"
                      className="mt-3 bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 font-body text-[15px] focus:outline-none focus:border-amber w-full"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="dark">
                      Qual o porte da sua empresa? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q2"
                      options={PORTE_OPTIONS}
                      value={formData.q2}
                      onChange={update('q2')}
                      theme="dark"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="dark">
                      Você tem contador ou escritório contábil? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q3"
                      options={CONTADOR_OPTIONS}
                      value={formData.q3}
                      onChange={update('q3')}
                      theme="dark"
                    />
                  </div>
                </div>
              </section>

              {/* Bloco 2 — Nível de dor */}
              <section
                className="bg-paper-50 rounded-2xl p-8 lg:p-10"
                style={{ border: '1.5px solid var(--sand)' }}
              >
                <p className="font-mono text-[11px] tracking-widest uppercase text-slate mb-6">
                  02 — Nível de dor com impostos
                </p>

                <div className="grid gap-8">
                  <div>
                    <QuestionLabel theme="light">
                      De 1 a 5, quanto você se sente seguro sobre quanto sua
                      empresa deve pagar de impostos? *
                    </QuestionLabel>
                    <ScaleButtons
                      name="q4"
                      value={formData.q4}
                      onChange={update('q4')}
                      leftLabel="Nada seguro"
                      rightLabel="Totalmente seguro"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="light">
                      Sua empresa já pagou multas ou foi autuada por erro no
                      recolhimento de tributos? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q5"
                      options={MULTA_OPTIONS}
                      value={formData.q5}
                      onChange={update('q5')}
                      theme="light"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="light">
                      Você já ouviu falar da Reforma Tributária (2024)? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q6"
                      options={REFORMA_OPTIONS}
                      value={formData.q6}
                      onChange={update('q6')}
                      theme="light"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="light">
                      De 1 a 5, o quanto a Reforma Tributária te preocupa em
                      relação ao seu negócio? *
                    </QuestionLabel>
                    <ScaleButtons
                      name="q7"
                      value={formData.q7}
                      onChange={update('q7')}
                      leftLabel="Não preocupa"
                      rightLabel="Preocupa muito"
                    />
                  </div>
                </div>
              </section>

              {/* Bloco 3 — Comportamento atual */}
              <section
                className="bg-paper-50 rounded-2xl p-8 lg:p-10"
                style={{ border: '1.5px solid var(--sand)' }}
              >
                <p className="font-mono text-[11px] tracking-widest uppercase text-slate mb-6">
                  03 — Comportamento atual da empresa
                </p>

                <div className="grid gap-8">
                  <div>
                    <QuestionLabel theme="light">
                      Como você resolve a questão dos impostos da sua empresa?
                      *
                    </QuestionLabel>
                    <RadioGroup
                      name="q8"
                      options={COMO_RESOLVE_OPTIONS}
                      value={formData.q8}
                      onChange={update('q8')}
                      theme="light"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="light">
                      Quanto tempo você ou seu time gasta por mês lidando com
                      obrigações fiscais? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q9"
                      options={TEMPO_OPTIONS}
                      value={formData.q9}
                      onChange={update('q9')}
                      theme="light"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="light">
                      Quanto você paga hoje para resolver suas obrigações
                      fiscais? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q10"
                      options={PAGA_HOJE_OPTIONS}
                      value={formData.q10}
                      onChange={update('q10')}
                      theme="light"
                    />
                  </div>
                </div>
              </section>

              {/* Bloco 4 — Atestamento da Solução */}
              <section className="bg-midnight text-white rounded-2xl p-8 lg:p-10">
                <p className="font-mono text-[11px] tracking-widest uppercase text-amber mb-6">
                  04 — Atestamento da Solução
                </p>

                <div className="grid gap-8">
                  <div>
                    <QuestionLabel theme="dark">
                      Se existisse uma plataforma que calculasse
                      automaticamente seus impostos, adaptada à Reforma
                      Tributária, você usaria? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q11"
                      options={USARIA_OPTIONS}
                      value={formData.q11}
                      onChange={update('q11')}
                      theme="dark"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="dark">
                      Quanto você pagaria por uma ferramenta assim por mês? *
                    </QuestionLabel>
                    <RadioGroup
                      name="q12"
                      options={PAGARIA_OPTIONS}
                      value={formData.q12}
                      onChange={update('q12')}
                      theme="dark"
                    />
                  </div>

                  <div>
                    <QuestionLabel theme="dark">
                      O que seria mais importante para você nessa ferramenta?
                      Conte com suas palavras. *
                    </QuestionLabel>
                    <textarea
                      required
                      rows={4}
                      value={formData.q13}
                      onChange={(e) => update('q13')(e.target.value)}
                      placeholder="Ex: simplicidade, preço acessível, precisão nos cálculos, suporte humano..."
                      className="mt-3 bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3.5 text-white placeholder-white/30 font-body text-[15px] focus:outline-none focus:border-amber w-full resize-none"
                    />
                  </div>
                </div>
              </section>

              <div>
                {status === 'error_validation' && (
                  <p className="text-critical font-body text-[14px] mt-4 mb-4">
                    Por favor, responda todas as perguntas obrigatórias antes de enviar.
                  </p>
                )}

                <label className="flex items-start gap-3 mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentimento}
                    onChange={(e) => update('consentimento')(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 shrink-0 accent-amber"
                  />
                  <span className="font-body text-[13px] text-ink-700 leading-relaxed">
                    Concordo em compartilhar minhas respostas e e-mail com a SmarTax e li a{' '}
                    <Link
                      href="/privacidade"
                      target="_blank"
                      className="text-amber underline underline-offset-2"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </label>
                {status === 'error_consent' && (
                  <p className="text-critical font-body text-[14px] mb-4">
                    É necessário aceitar a Política de Privacidade para enviar.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`bg-amber text-midnight font-medium px-8 py-4 rounded-lg hover:opacity-90 transition-opacity ${
                    status === 'sending' ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'sending' ? 'Enviando…' : 'Enviar respostas →'}
                </button>
                {status === 'error' && (
                  <p className="text-critical font-body text-[14px] mt-4">
                    Algo deu errado ao enviar. Tente novamente ou entre em contato pelo fernandomarti017@gmail.com
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
