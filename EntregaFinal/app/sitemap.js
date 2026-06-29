export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartaxsite.vercel.app';
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/atualizacoes`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/roadmap`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/pesquisa`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/termos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
