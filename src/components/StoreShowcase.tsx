import { AlertTriangle } from 'lucide-react';

/**
 * Complemento visual da seção Sobre.
 * Imagens reais do estabelecimento, sem cortes ou alegações de estoque atualizado.
 */
const showcaseItems = [
  {
    number: '01',
    tag: '18+',
    title: 'Cervejas e bebidas',
    description: 'Uma das geladeiras da nossa loja.',
    image: '/fotos-vitrine/geladeira-cervejas.jpg',
    alt: 'Geladeira real da Adega Tá no Grau 013 com cervejas e outras bebidas.',
  },
  {
    number: '02',
    tag: 'CONVENIÊNCIA',
    title: 'Refrigerantes e energéticos',
    description: 'Opções de conveniência para o dia a dia.',
    image: '/fotos-vitrine/refrigerantes-energeticos.jpg',
    alt: 'Geladeira real da adega com refrigerantes, energéticos, águas e sucos.',
  },
  {
    number: '03',
    tag: '18+',
    title: 'Tabacaria',
    description: 'Conheça a seção na loja.',
    image: '/fotos-vitrine/tabacaria.jpg',
    alt: 'Vitrine real da seção de tabacaria da Adega Tá no Grau 013.',
  },
  {
    number: '04',
    tag: 'CONVENIÊNCIA',
    title: 'Gelo',
    description: 'Consulte a disponibilidade na loja.',
    image: '/fotos-vitrine/gelo-real.jpg',
    alt: 'Foto real da geladeira da Adega Tá no Grau 013 com sacos de gelo.',
  },
] as const;

export default function StoreShowcase() {
  return (
    <div id="produtos" className="mt-20 scroll-mt-24 border-t border-white/10 pt-14 md:mt-24 md:pt-20" aria-labelledby="vitrine-titulo">
      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)] lg:items-end lg:gap-10">
        <div>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand-400">
            02 / Nossa vitrine
          </p>
          <h3 id="vitrine-titulo" className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.55rem]">
            O que você encontra <span className="text-brand-400">por aqui</span>
          </h3>
        </div>
        <p className="max-w-md text-sm leading-7 text-gray-400 lg:justify-self-end">
          Uma amostra da loja, não um cardápio com estoque em tempo real. Consulte a disponibilidade antes da visita.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {showcaseItems.map((item) => (
          <article
            key={item.number}
            className="group min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-graphite-800 transition-colors duration-300 hover:border-brand-400/40"
          >
            <div className="flex h-[360px] items-center justify-center bg-[#08080a] p-3 sm:h-[390px] lg:h-[380px]">
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="block h-full w-full rounded-lg object-contain"
              />
            </div>
            <div className="border-t border-white/10 px-5 py-5">
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-400">
                {item.number} · {item.tag}
              </p>
              <h4 className="font-display text-lg font-bold text-white">{item.title}</h4>
              <p className="mt-1 text-sm text-gray-400">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-brand-400/25 bg-brand-400/5 px-5 py-4 text-sm leading-relaxed text-gray-300">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
        <span>
          A disponibilidade dos produtos pode variar. Bebidas alcoólicas e produtos de tabacaria são restritos a maiores de 18 anos.
        </span>
      </p>
    </div>
  );
}
