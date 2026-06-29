// @ts-nocheck
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Middleware mínimo para o site investor: só impede acesso a /login e
// /cadastro quando o usuário já está autenticado (e mantém o callback OAuth).
// Sem gate de ferramentas — esta cópia não as inclui.

function safeRedirect(value, fallback = '/') {
  try {
    if (!value || typeof value !== 'string') return fallback;
    if (value.startsWith('/') && !value.startsWith('//')) return value;
    return fallback;
  } catch {
    return fallback;
  }
}

export async function middleware(req) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return req.cookies.get(name)?.value; },
        set(name, value, options) { res.cookies.set({ name, value, ...options }); },
        remove(name, options) { res.cookies.set({ name, value: '', ...options }); },
      },
    },
  );
  const { data: { user } } = await supabase.auth.getUser();

  // Já logado tentando ver login/cadastro → manda para home
  if (user && (pathname === '/login' || pathname === '/cadastro')) {
    const redirect = safeRedirect(url.searchParams.get('redirect'), '/');
    url.pathname = redirect;
    url.search = '';
    return NextResponse.redirect(url);
  }
  return res;
}

export const config = {
  matcher: ['/login', '/cadastro'],
};
