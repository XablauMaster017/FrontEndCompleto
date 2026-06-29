// @ts-nocheck
import { NextResponse } from 'next/server';
import { buscarTodasFontes } from '@/lib/regulacao/fontes';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

// Ingestão automática (etapa "coleta" do fluxo híbrido). Roda via Vercel Cron
// (ver vercel.json) ou manualmente com o header Authorization. Insere itens como
// 'pendente'; a publicação só acontece após aprovação humana no /admin.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function autorizado(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // sem secret configurado, recusa por segurança
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!autorizado(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado.' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: 'Service role não configurada.' },
      { status: 500 },
    );
  }

  let itens = [];
  try {
    itens = await buscarTodasFontes(60);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'Falha ao buscar as fontes.' },
      { status: 502 },
    );
  }

  let inseridos = 0;
  let ignorados = 0;

  for (const item of itens) {
    // Dedup por (fonte, fonte_id): só insere se ainda não existe.
    const { data: existente } = await supabase
      .from('regulacao_atualizacoes')
      .select('id')
      .eq('fonte', item.fonte)
      .eq('fonte_id', item.fonteId)
      .maybeSingle();

    if (existente) {
      ignorados += 1;
      continue;
    }

    const { error } = await supabase.from('regulacao_atualizacoes').insert({
      titulo: item.titulo,
      ementa: item.ementa,
      fonte: item.fonte,
      fonte_url: item.fonteUrl,
      fonte_id: item.fonteId,
      data: item.data,
      tags: item.tags ?? null,
      status: 'pendente',
    });

    if (error) ignorados += 1;
    else inseridos += 1;
  }

  return NextResponse.json({ ok: true, total: itens.length, inseridos, ignorados });
}
