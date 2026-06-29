import { ImageResponse } from 'next/og';

// Runtime edge: o build edge do @vercel/og embute a fonte padrão e evita o bug
// de resolução de fonte (fileURLToPath) do runtime Node ao gerar a imagem.
export const runtime = 'edge';

export const alt = 'SmarTax — a plataforma da Reforma Tributária';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Cores do sistema Ink & Amber
const MIDNIGHT = '#0E1A2E';
const AMBER = '#FF6B3D';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: MIDNIGHT,
          padding: '72px',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* marca: linha + dois nós (eco do Logo.jsx) */}
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none" stroke={AMBER} strokeWidth="2.4" strokeLinecap="round">
            <line x1="27" y1="9" x2="5" y2="23" />
            <circle cx="9" cy="10" r="3.2" />
            <circle cx="23" cy="22" r="3.2" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em' }}>SmarTax</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, color: AMBER, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Reforma Tributaria · CBS · IBS · IS
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05, marginTop: 16, maxWidth: 980 }}>
            A plataforma que transforma como o Brasil paga impostos
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 4, background: AMBER, borderRadius: 4 }} />
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>
            Simulador · Conversor NF-e · Calendario fiscal — gratis
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
