'use client';

import { useEffect, useMemo, useState } from 'react';
import { buscarAtualizacoes } from '@/lib/actions/regulacao';

const FONTES = ['Câmara', 'Senado', 'DOU', 'Manual'];

function formatarData(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function ItemCard({ item }) {
  return (
    <li className="bg-paper-50 border border-sand rounded-2xl p-6 hover:border-ink/30 transition-colors">
      <div className="flex items-center gap-3 flex-wrap">
        {item.data && (
          <span className="font-mono text-[11px] uppercase tracking-widest text-slate">
            {formatarData(item.data)}
          </span>
        )}
        {item.fonte && (
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-sand text-slate">
            {item.fonte}
          </span>
        )}
        {Array.isArray(item.tags) &&
          item.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber/10 text-ink border border-amber/30"
            >
              {t}
            </span>
          ))}
      </div>
      <h2 className="mt-3 font-display font-semibold text-[20px] text-ink tracking-tightest leading-snug">
        {item.titulo}
      </h2>
      {item.resumo && (
        <p className="mt-2 font-body text-[15px] text-slate leading-relaxed">{item.resumo}</p>
      )}
      {item.fonte_url && (
        <a
          href={item.fonte_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest text-ink hover:text-amber transition-colors"
        >
          Ver na fonte <span aria-hidden="true">↗</span>
        </a>
      )}
    </li>
  );
}

function Chip({ label, ativo, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-widest transition-colors border ${
        ativo
          ? 'bg-ink text-white border-ink'
          : 'bg-white text-slate border-sand hover:border-ink/40'
      }`}
    >
      {label}
    </button>
  );
}

export default function BuscaAtualizacoes({ itensIniciais }) {
  const [query, setQuery] = useState('');
  const [fonte, setFonte] = useState('');
  const [tag, setTag] = useState('');
  const [itens, setItens] = useState(itensIniciais);
  const [loading, setLoading] = useState(false);
  const [ativo, setAtivo] = useState(false);

  // Tags disponíveis derivadas do feed inicial (para os chips de filtro).
  const tagsDisponiveis = useMemo(() => {
    const s = new Set();
    itensIniciais.forEach((i) => {
      if (Array.isArray(i.tags)) i.tags.forEach((t) => s.add(t));
    });
    return Array.from(s).sort().slice(0, 12);
  }, [itensIniciais]);

  useEffect(() => {
    const temFiltro = query.trim() || fonte || tag;
    if (!temFiltro) {
      setItens(itensIniciais);
      setAtivo(false);
      setLoading(false);
      return;
    }
    let vivo = true;
    setLoading(true);
    setAtivo(true);
    const t = setTimeout(async () => {
      const res = await buscarAtualizacoes(query, {
        fonte: fonte || undefined,
        tag: tag || undefined,
      });
      if (!vivo) return;
      setItens(res.ok ? res.itens : []);
      setLoading(false);
    }, 300);
    return () => {
      vivo = false;
      clearTimeout(t);
    };
  }, [query, fonte, tag, itensIniciais]);

  const limpar = () => {
    setQuery('');
    setFonte('');
    setTag('');
  };

  return (
    <>
      {/* Busca + filtros */}
      <div className="bg-paper-50 border border-sand rounded-2xl p-6 mb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate mb-4">
          Buscar no boletim
        </p>
        <input
          type="search"
          placeholder="Ex: CBS, Imposto Seletivo, split payment, nota fiscal…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white border border-sand rounded-lg px-4 py-3 font-body text-[15px] text-ink w-full focus:outline-none focus:border-ink"
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate mr-1">Fonte</span>
          {FONTES.map((f) => (
            <Chip key={f} label={f} ativo={fonte === f} onClick={() => setFonte(fonte === f ? '' : f)} />
          ))}
        </div>

        {tagsDisponiveis.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate mr-1">Tema</span>
            {tagsDisponiveis.map((t) => (
              <Chip key={t} label={t} ativo={tag === t} onClick={() => setTag(tag === t ? '' : t)} />
            ))}
          </div>
        )}

        {ativo && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="font-mono text-[12px] text-slate">
              {loading ? 'Buscando…' : `${itens.length} resultado${itens.length !== 1 ? 's' : ''}`}
            </p>
            <button
              type="button"
              onClick={limpar}
              className="font-mono text-[11px] uppercase tracking-widest text-slate hover:text-ink transition-colors"
            >
              Limpar
            </button>
          </div>
        )}
      </div>

      {/* Lista */}
      {itens.length === 0 ? (
        <div className="bg-paper-50 border border-sand rounded-2xl p-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate mb-3">
            {ativo ? 'Nenhum resultado' : 'Nenhuma atualização publicada ainda'}
          </p>
          <p className="font-body text-[15px] text-slate max-w-[42ch] mx-auto leading-relaxed">
            {ativo
              ? 'Tente outros termos ou remova os filtros de fonte e tema.'
              : 'Estamos monitorando as fontes oficiais. Inscreva-se acima para ser avisado das próximas mudanças.'}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {itens.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ul>
      )}
    </>
  );
}
