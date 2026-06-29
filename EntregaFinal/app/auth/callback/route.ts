// @ts-nocheck
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// Troca o `code` (confirmação de e-mail / reset de senha) por uma sessão e redireciona.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next');
  const next =
    nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
      ? nextParam
      : '/';

  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
