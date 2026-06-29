import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contato"
      className="bg-midnight text-white py-28 lg:py-32 px-6 lg:px-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amber">
          — Participe
        </span>
        <h2 className="mt-5 font-display font-semibold tracking-tightest text-[36px] md:text-[48px] lg:text-[56px] leading-[1.04]">
          Se interessou pelo projeto?
        </h2>
        <p className="mt-6 font-body text-lg text-white/70 max-w-xl mx-auto">
          Preencha esse forms em 3 minutos para nos ajudar a criar o sistema que
          mais atende suas necessidades.
        </p>

        <div className="mt-12 flex flex-col items-center">
          <Link
            href="/pesquisa"
            className="bg-amber text-midnight px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Preencher formulário →
          </Link>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-white/40">
            ~3 minutos · respostas anônimas
          </p>
        </div>

        <div className="border-t border-white/10 mt-12 pt-10">
          <p className="font-body text-white/55 flex items-center justify-center gap-2 flex-wrap">
            <span>Prefere falar diretamente?</span>
            <a
              href="https://wa.me/5544991249988?text=Ol%C3%A1!%20Conheci%20a%20SmarTax%20pelo%20site%20e%20quero%20entender%20como%20a%20plataforma%20pode%20ajudar%20minha%20empresa%20com%20a%20Reforma%20Tribut%C3%A1ria."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar pelo WhatsApp: 44 99124-9988"
              className="inline-flex items-center gap-2 text-amber hover:opacity-80 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="font-mono text-[14px]">44 99124-9988</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
