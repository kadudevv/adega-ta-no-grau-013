import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { companyData } from '@/data/company';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { phone, address, whatsapp, hours } = companyData;

  return (
    <section id="contato" className="section-padding relative">
      <div className="container-custom">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Contato"
            title="Fale com a gente"
            description="Entre em contato para informações, dúvidas ou atendimentos."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <a
              href={`tel:+${phone.raw}`}
              className="card-surface card-hover p-6 group block"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <Phone className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                Telefone
              </h3>
              <p className="text-lg font-medium text-white">{phone.display}</p>
            </a>

            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-hover p-6 group block"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                WhatsApp
              </h3>
              <p className="text-lg font-medium text-white">
                Falar agora
              </p>
            </a>

            <a
              href={companyData.maps.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-hover p-6 group block"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4 group-hover:bg-brand-400/20 transition-colors">
                <MapPin className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                Endereço
              </h3>
              <p className="text-base font-medium text-white leading-snug">
                {address.full}<br />
                {address.district}, {address.city} – {address.state}
              </p>
            </a>

            <div className="card-surface p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20 mb-4">
                <Clock className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-sm text-gray-400 mb-1">
                Horários
              </h3>
              <p className="text-base font-medium text-white leading-snug">
                {hours.note}
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
