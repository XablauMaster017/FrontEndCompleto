/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-700': 'var(--ink-700)',
        'ink-500': 'var(--ink-500)',
        slate: 'var(--slate)',
        sand: 'var(--sand)',
        paper: 'var(--paper)',
        'paper-50': 'var(--paper-50)',
        midnight: 'var(--midnight)',
        amber: 'var(--amber)',
        'amber-soft': 'var(--amber-soft)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        critical: 'var(--critical)',
        info: 'var(--info)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      maxWidth: {
        '7xl': '76rem',
      },
    },
  },
  plugins: [],
};
