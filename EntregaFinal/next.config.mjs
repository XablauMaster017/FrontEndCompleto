/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Ferramentas movidas para /ferramentas/* — manter URLs antigas funcionando (308).
    return [
      { source: '/simulador', destination: '/ferramentas/simulador', permanent: true },
      { source: '/conversor-nfe', destination: '/ferramentas/conversor-nfe', permanent: true },
      { source: '/calendario-fiscal', destination: '/ferramentas/calendario', permanent: true },
    ];
  },
};

export default nextConfig;
