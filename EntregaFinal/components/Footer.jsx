import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-6 lg:px-12 py-16 lg:py-20 print:hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.6fr,1fr] gap-12 lg:gap-20 items-start">
        <div>
          <div className="flex items-center gap-2.5 text-amber">
            <Logo size={26} />
            <span className="font-display font-semibold text-white text-lg tracking-tightest">
              SmarTax
            </span>
          </div>
          <p className="mt-5 font-body text-[14.5px] text-white/55 max-w-md leading-relaxed">
            A plataforma fiscal nascida com a Reforma Tributária. Cálculo, compreensão e proteção em um só lugar.
          </p>
        </div>

        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-6 gap-y-3 font-body text-sm text-white/70">
          <Link href="/sobre" className="hover:text-white transition-colors">Sobre</Link>
          <Link href="/atualizacoes" className="hover:text-white transition-colors">Atualizações</Link>
          <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="/#contato" className="hover:text-white transition-colors">Contato</Link>
          <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
          <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-7 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[11px] tracking-[0.12em] text-white/40">
        <span>© 2026 SmarTax. Todos os direitos reservados.</span>
        <span>Cálculos baseados na LC 214/25 e instruções normativas vigentes.</span>
      </div>
    </footer>
  );
}
