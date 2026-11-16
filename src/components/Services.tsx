import { Store, PackageCheck, MessageCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { companyData } from '@/data/company';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    icon: Store,
    title: 'Compras na loja',
    description: 'Visite nosso endereço em Praia Grande.',
  },
  {
    icon: PackageCheck,
    title: 'Retirada',
    description: 'Consulte o estabelecimento sobre a disponibilidade de retirada.',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento e informações',
    description:
      'Entre em contato para tirar dúvidas sobre funcionamento e serviços.',
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="atendimento" className="section-padding bg-graphite-800/30 relative">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="container-custom relative z-10">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Atendimento"
            title="Formas de atendimento"
            description="Escolha a forma que funciona melhor para você."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="card-surface card-hover p-8 group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-400/10 border border-brand-400/20 mb-6 group-hover:bg-brand-400/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-brand-400" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={companyData.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle className="w-5 h-5" />
              Tirar dúvidas pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
