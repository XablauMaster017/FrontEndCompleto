'use client';

import { useState } from 'react';
import { aprovarAtualizacao, rejeitarAtualizacao } from '@/lib/actions/regulacao';

function ItemAdmin({ item, onResolved }) {
  const [titulo, setTitulo] = useState(item.titulo || '');
  const [resumo, setResumo] = useState(item.resumo || '');
  const [tags, setTags] = useState(Array.isArray(item.tags) ? item.tags.join(', ') : '');
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState('');

  const parseTags = () =>
    tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

  const publicar = async () => {
    if (busy) return;
    if (!titulo.trim() || !resumo.trim()) {
      setErro('Preencha título e resumo antes de publicar.');
      return;
    }
    setBusy(true);
    setErro('');
    const res = await aprovarAtualizacao(item.id, {
      titulo: titulo.trim(),
      resumo: resumo.trim(),
      tags: parseTags(),
    }).catch(() => ({ ok: false }));
    setBusy(false);
    if (res?.ok) onResolved(item.id);
    else setErro(res?.error || 'Falha ao publicar.');
  };

  const rejeitar = async () => {
    if (busy) return;
    setBusy(true);
    setErro('');
    const res = await rejeitarAtualizacao(item.id).catch(() => ({ ok: false }));
    setBusy(false);
    if (res?.ok) onResolved(item.id);
    else setErro(res?.error || 'Falha ao rejeitar.');
  };

  const inputCls =
    'bg-white border border-sand rounded-lg px-4 py-2.5 font-body text-[14px] text-ink w-full focus:outline-none focus:border-ink';

  return (
    <li className="bg-paper-50 border border-sand rounded-2xl p-6">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        {item.fonte && (
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-sand text-slate">
            {item.fonte}
          </span>
        )}
        {item.fonte_url && (
          <a
            href={item.fonte_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-ink hover:text-amber transition-colors"
          >
            Ver na fonte ↗
          </a>
        )}
      </div>

      {item.ementa && (
        <p className="font-body text-[13px] text-slate leading-relaxed mb-5 bg-white border border-sand rounded-lg p-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate block mb-1">
            Ementa (fonte)
          </span>
          {item.ementa}
        </p>
      )}

      <div className="grid gap-3">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate">Título</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className={`mt-1 ${inputCls}`} />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate">
            Resumo educativo (linguagem simples)
          </label>
          <textarea
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            rows={3}
            className={`mt-1 ${inputCls} resize-y`}
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-slate">
            Tags (separadas por vírgula)
          </label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className={`mt-1 ${inputCls}`} />
        </div>
      </div>

      {erro && <p className="text-critical font-body text-[13px] mt-3">{erro}</p>}

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={publicar}
          disabled={busy}
          className="bg-ink text-white font-medium px-5 py-2.5 rounded-lg hover:bg-ink-700 transition-colors font-body text-[14px] disabled:opacity-60"
        >
          {busy ? '…' : 'Publicar'}
        </button>
        <button
          type="button"
          onClick={rejeitar}
          disabled={busy}
          className="border border-sand text-slate font-medium px-5 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors font-body text-[14px] disabled:opacity-60"
        >
          Rejeitar
        </button>
      </div>
    </li>
  );
}

export default function AtualizacoesAdminClient({ pendentes }) {
  const [itens, setItens] = useState(pendentes || []);

  const onResolved = (id) => setItens((prev) => prev.filter((i) => i.id !== id));

  if (itens.length === 0) {
    return (
      <div className="bg-paper-50 border border-sand rounded-2xl p-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
          Nenhum item pendente
        </p>
        <p className="font-body text-[15px] text-slate mt-3">
          Tudo revisado. Novos itens aparecerão aqui após a próxima coleta automática.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {itens.map((item) => (
        <ItemAdmin key={item.id} item={item} onResolved={onResolved} />
      ))}
    </ul>
  );
}
