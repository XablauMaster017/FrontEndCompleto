export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartaxsite.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal/', '/api/', '/auth/', '/login', '/cadastro', '/admin'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
