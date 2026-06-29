import { Space_Grotesk, Manrope, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'SmarTax — A plataforma da Reforma Tributária',
  description:
    'Calcule CBS, IBS e Imposto Seletivo do seu negócio em segundos. Adaptado à Reforma Tributária, validado por contadores.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'SmarTax — A plataforma da Reforma Tributária',
    description:
      'Calcule CBS, IBS e Imposto Seletivo do seu negócio em segundos. Adaptado à Reforma Tributária, validado por contadores.',
    locale: 'pt_BR',
    type: 'website',
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SmarTax',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    'Plataforma fiscal da Reforma Tributária (CBS, IBS e Imposto Seletivo) com ferramentas gratuitas para empresas e contadores.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'fernandomarti017@gmail.com',
    contactType: 'customer support',
    areaServed: 'BR',
    availableLanguage: 'Portuguese',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
