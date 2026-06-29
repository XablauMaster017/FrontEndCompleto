'use client';

import { useState } from 'react';
import { definirPapel } from '@/lib/actions/perfil';

const PAPEIS = [
  { value: 'free', label: 'Free' },
  { value: 'assinante', label: 'Assinante' },
  { value: 'admin', label: 'Admin' },
];

const BADGE = {
  free: 'bg-sand/40 text-slate border-sand',
  assinante: 'bg-amber/15 text-ink border-amber/40',
  admin: 'bg-ink text-white border-ink',
};

function LinhaUsuario({ u }) {
  const [role, setRole] = useState(u.role);
  const [salvo, setSalvo] = useState(u.role);
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState('');

  const mudou = role !== salvo;

  const salvar = async () => {
    if (busy || !mudou) return;
    setBusy(true);
    setErro('');
    const res = await definirPapel(u.id, role).catch(() => ({ ok: false }));
    setBusy(false);
    if (res?.ok) setSalvo(role);
    else {
      setErro(res?.error || 'Falha ao salvar.');
      setRole(salvo);
    }
  };

  return (
    <li className="bg-paper-50 border border-sand rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-body text-[15px] text-ink truncate">{u.email || '—'}</p>
        <p className="font-mono text-[11px] text-slate truncate">{u.id}</p>
      </div>

      <span
        className={`shrink-0 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${BADGE[salvo] || BADGE.free}`}
      >
        {salvo}
      </span>

      <div className="flex items-center gap-2 shrink-0">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white border border-sand rounded-lg px-3 py-2 font-body text-[14px] text-ink focus:outline-none focus:border-ink"
        >
          {PAPEIS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={salvar}
          disabled={busy || !mudou}
          className="bg-ink text-white font-medium px-4 py-2 rounded-lg hover:bg-ink-700 transition-colors font-body text-[14px] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {busy ? '…' : 'Salvar'}
        </button>
      </div>

      {erro && <p className="text-critical font-body text-[12px] sm:basis-full">{erro}</p>}
    </li>
  );
}

export default function UsuariosAdminClient({ usuarios }) {
  if (!usuarios || usuarios.length === 0) {
    return (
      <div className="bg-paper-50 border border-sand rounded-2xl p-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
          Nenhum usuário ainda
        </p>
        <p className="font-body text-[15px] text-slate mt-3">
          Os perfis aparecem aqui conforme as pessoas criam conta. Rode o
          profiles-setup.sql se a lista estiver vazia mesmo com usuários existentes.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {usuarios.map((u) => (
        <LinhaUsuario key={u.id} u={u} />
      ))}
    </ul>
  );
}
