import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Política de Privacidade — SmarTax',
  description:
    'Como a SmarTax coleta, usa e protege seus dados pessoais, em conformidade com a LGPD. O conversor de NF-e opera 100% no seu navegador.',
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

export default function PrivacidadePage() {
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
              Política de Privacidade
            </h1>
            <p className="mt-4 font-mono text-[12px] text-white/45">
              Última atualização: {ATUALIZACAO}
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="font-body text-[15px] text-ink-700 leading-relaxed">
            A SmarTax tem o compromisso de proteger seus dados pessoais. Esta
            política descreve como coletamos, usamos, armazenamos e
            compartilhamos informações quando você usa o site e as ferramentas
            da SmarTax, em conformidade com a Lei Geral de Proteção de Dados
            (LGPD — Lei nº 13.709/2018). A SmarTax encontra-se em fase de
            pré-lançamento; esta política reflete o tratamento de dados atual e
            será atualizada conforme novas funcionalidades (como o portal com
            conta de usuário) entrarem no ar.
          </p>

          <Secao titulo="1. Quem é o controlador">
            <p>
              O controlador dos dados é Fernando Martinez (responsável pela
              SmarTax). Caso uma pessoa jurídica venha a ser constituída para
              operar a plataforma, esta seção será atualizada com a razão social
              e o CNPJ.
            </p>
          </Secao>

          <Secao titulo="2. Quais dados coletamos">
            <p><strong>Hoje, ao usar o site e as ferramentas, coletamos:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Endereço de e-mail (quando você entra na lista de espera ou responde à pesquisa).</li>
              <li>Respostas da pesquisa de validação, quando você opta por respondê-la.</li>
              <li>Parâmetros de campanha (UTM) presentes na URL de origem.</li>
              <li>Endereço IP e informações do navegador (user agent), para fins de segurança e registro de atividade.</li>
              <li>Dados de navegação agregados (páginas e interações), via Vercel Analytics — sem cookies de identificação.</li>
            </ul>
            <p>
              <strong>Quando você criar uma conta no portal (funcionalidade futura),</strong>{' '}
              poderemos coletar nome, telefone, CPF/CNPJ e dados fiscais
              necessários à prestação do serviço. Essa coleta ainda não ocorre.
            </p>
            <p>
              <strong>Importante:</strong> o conversor de NF-e/NFS-e processa os
              arquivos XML inteiramente no seu navegador. Os arquivos e os dados
              fiscais contidos neles <strong>não são enviados aos nossos
              servidores</strong> — eles nunca saem do seu dispositivo.
            </p>
          </Secao>

          <Secao titulo="3. Para que usamos seus dados">
            <ul className="list-disc pl-5 space-y-1">
              <li>Enviar novidades, acesso antecipado e comunicações que você solicitou ao deixar seu e-mail.</li>
              <li>Entender a demanda e melhorar o produto (análise das respostas da pesquisa).</li>
              <li>Garantir a segurança da plataforma e prevenir abusos.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
            <p>Não exibimos publicidade e não usamos seus dados para anúncios.</p>
          </Secao>

          <Secao titulo="4. Base legal (Art. 7º da LGPD)">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Consentimento</strong> — envio de novidades/marketing e participação na pesquisa (você pode revogar a qualquer momento).</li>
              <li><strong>Legítimo interesse</strong> — segurança, prevenção a fraudes e registro de atividade.</li>
              <li><strong>Obrigação legal</strong> — quando exigido por lei ou autoridade competente.</li>
            </ul>
          </Secao>

          <Secao titulo="5. Com quem compartilhamos">
            <p>Não vendemos seus dados. Utilizamos prestadores de serviço que atuam como operadores:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vercel</strong> — hospedagem do site e métricas de uso (sem cookies).</li>
              <li><strong>Supabase</strong> — banco de dados onde ficam os e-mails e respostas coletados.</li>
              <li><strong>Formspree</strong> — recebimento alternativo das respostas da pesquisa (mecanismo de contingência).</li>
            </ul>
            <p>
              <strong>Transferência internacional:</strong> esses provedores
              podem processar dados em servidores fora do Brasil (por exemplo,
              nos Estados Unidos). Adotamos provedores que oferecem garantias de
              proteção compatíveis com a LGPD.
            </p>
          </Secao>

          <Secao titulo="6. Cookies e tecnologias">
            <p>
              Usamos apenas o essencial. As métricas de uso são coletadas via
              Vercel Analytics, que <strong>não utiliza cookies</strong> de
              identificação pessoal. Não há cookies de publicidade. Caso o
              portal com login seja lançado, cookies estritamente necessários de
              sessão/autenticação passarão a ser usados, e esta seção será
              atualizada.
            </p>
          </Secao>

          <Secao titulo="7. Por quanto tempo guardamos">
            <p>
              Mantemos os dados de contato e respostas enquanto durar seu
              consentimento ou pelo tempo necessário às finalidades acima — em
              geral, por até 24 meses após o último contato, salvo prazo legal
              maior. Dados fiscais de uma eventual conta poderão ser retidos por
              até 5 anos, conforme a legislação tributária. Encerrado o prazo,
              os dados são eliminados ou anonimizados.
            </p>
          </Secao>

          <Secao titulo="8. Seus direitos (LGPD, Arts. 17 a 22)">
            <p>
              Você pode solicitar confirmação e acesso, correção, anonimização,
              bloqueio ou eliminação, portabilidade, informação sobre
              compartilhamentos e revogação do consentimento — sem custo. Para
              exercer qualquer direito, ou para excluir seus dados, escreva para
              o contato da Seção 10 (atendemos por e-mail enquanto o fluxo
              self-service no portal não está disponível).
            </p>
          </Secao>

          <Secao titulo="9. Segurança">
            <p>
              Os dados são armazenados em provedores com criptografia em trânsito
              e em repouso. Adotamos medidas técnicas e administrativas razoáveis
              para proteger seus dados contra acesso não autorizado, perda ou
              vazamento.
            </p>
          </Secao>

          <Secao titulo="10. Encarregado (DPO) e contato">
            <p>
              Encarregado de Proteção de Dados: <strong>Fernando Martinez</strong>.
              Contato: <strong>fernandomarti017@gmail.com</strong>.
            </p>
          </Secao>

          <Secao titulo="11. Alterações">
            <p>
              Podemos atualizar esta política periodicamente. Mudanças relevantes
              serão sinalizadas no site. A data no topo indica a última revisão.
            </p>
          </Secao>
        </div>
      </main>
      <Footer />
    </>
  );
}
