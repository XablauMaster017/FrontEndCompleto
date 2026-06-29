import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Termos de Uso — SmarTax',
  description:
    'Condições de uso do site e das ferramentas gratuitas da SmarTax, incluindo a natureza educativa dos cálculos e a fase de pré-lançamento.',
};

const ATUALIZACAO = '21 de maio de 2026';

function Secao({ titulo, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display font-semibold text-[22px] text-ink tracking-tightest">
        {titulo}
      </h2>
      <div className="mt-3 font-body text-[15px] text-ink-700 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function TermosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-paper min-h-screen">
        <header className="bg-midnight text-white pt-32 pb-14 px-6">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
              — Legal
            </span>
            <h1 className="mt-5 font-display font-semibold tracking-tightest text-[34px] md:text-[44px] leading-[1.04]">
              Termos de Uso
            </h1>
            <p className="mt-4 font-mono text-[12px] text-white/45">
              Última atualização: {ATUALIZACAO}
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="font-body text-[15px] text-ink-700 leading-relaxed">
            Ao acessar e utilizar o site e as ferramentas da SmarTax, você
            concorda com os termos abaixo. Se não concordar, não utilize a
            plataforma.
          </p>

          <Secao titulo="1. Natureza do serviço (pré-lançamento)">
            <p>
              A SmarTax está em fase de pré-lançamento. Oferecemos atualmente um
              site institucional e ferramentas fiscais gratuitas (simulador,
              conversor de NF-e/NFS-e, calendário fiscal, entre outras). Algumas
              funcionalidades anunciadas podem ainda não estar disponíveis ou
              sofrer alterações. O uso é fornecido no estado em que se encontra
              ("como está").
            </p>
          </Secao>

          <Secao titulo="2. Uso adequado">
            <p>O usuário compromete-se a usar a plataforma de forma ética e legal. É vedado:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Usar o site para atividades ilegais ou que violem a legislação aplicável.</li>
              <li>Publicar ou transmitir conteúdo discriminatório, ofensivo ou que viole direitos de terceiros.</li>
              <li>Tentar acessar dados de outros usuários sem autorização.</li>
              <li>Introduzir vírus, malware ou código malicioso.</li>
              <li>Usar robôs, scrapers ou meios automatizados sem autorização prévia.</li>
            </ul>
          </Secao>

          <Secao titulo="3. Natureza educativa das ferramentas — isenção">
            <p>
              Os resultados do simulador, da calculadora e das demais ferramentas
              são <strong>estimativas educativas</strong>, baseadas em alíquotas
              e regras de referência (entre elas a LC 214/25), e{' '}
              <strong>não constituem aconselhamento contábil, fiscal ou
              jurídico</strong>. Os valores podem divergir da apuração real, que
              depende de fatores específicos de cada operação. As ferramentas{' '}
              <strong>não substituem um contador</strong>. Decisões tomadas com
              base nos resultados são de responsabilidade exclusiva do usuário.
            </p>
          </Secao>

          <Secao titulo="4. Propriedade intelectual">
            <p>
              O conteúdo do site (textos, logotipos, layout e código próprio) é de
              titularidade da SmarTax ou de seus licenciadores e é protegido por
              lei. A reprodução, distribuição ou modificação sem autorização
              prévia é proibida.
            </p>
          </Secao>

          <Secao titulo="5. Limitação de responsabilidade">
            <p>
              Empenhamo-nos em manter as informações corretas e atualizadas, mas
              não garantimos que estejam livres de erros. A SmarTax não se
              responsabiliza por danos decorrentes do uso da plataforma ou da
              indisponibilidade do serviço, salvo nas hipóteses previstas em lei.
            </p>
          </Secao>

          <Secao titulo="6. Conta de usuário (futuro)">
            <p>
              Caso venhamos a oferecer criação de conta e área logada, o uso
              dessas funcionalidades ficará sujeito a estes termos e à Política de
              Privacidade.
            </p>
          </Secao>

          <Secao titulo="7. Alterações nos termos">
            <p>
              Podemos modificar estes termos a qualquer momento. As alterações
              entram em vigor na data de publicação no site. O uso continuado após
              a publicação constitui aceitação dos novos termos.
            </p>
          </Secao>

          <Secao titulo="8. Lei aplicável e foro">
            <p>
              Estes termos são regidos pelas leis brasileiras. Fica eleito o foro
              da Comarca de Maringá/PR para dirimir quaisquer controvérsias, com
              renúncia a qualquer outro, por mais privilegiado que seja.
            </p>
          </Secao>

          <Secao titulo="9. Contato">
            <p>
              Dúvidas sobre estes Termos de Uso:{' '}
              <strong>fernandomarti017@gmail.com</strong>.
            </p>
          </Secao>
        </div>
      </main>
      <Footer />
    </>
  );
}
