import { Store, PackageCheck, Truck, Heart } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import StoreShowcase from './StoreShowcase';

const highlights = [
  {
    icon: Store,
    title: 'Atendimento presencial',
  },
  {
    icon: PackageCheck,
    title: 'Retirada na loja',
  },
  {
    icon: Truck,
    title: 'Estamos no iFood',
  },
  {
    icon: Heart,
    title: 'Ambiente acolhedor e inclusivo',
  },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="section-padding relative">
      <div className="container-custom">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Sobre"
            title="Sobre a Adega Tá no Grau 013"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed">
                A Adega Tá no Grau 013 está localizada no bairro Aviação, em Praia
                Grande. Nosso espaço recebe clientes que procuram atendimento
                próximo e praticidade no dia a dia.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-400/10 border border-brand-400/20 text-sm text-brand-400 font-medium">
                  Empreendimento de mulheres
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 font-medium">
                  Ambiente acolhedor à comunidade LGBTQ+
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="card-surface card-hover p-6"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4">
                    <item.icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-semibold text-base text-white">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <StoreShowcase />
        </div>
      </div>
    </section>
  );
}
