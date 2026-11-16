import { MapPin, Navigation } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { companyData } from '@/data/company';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Location() {
  const { ref, isVisible } = useScrollAnimation();
  const { address, maps } = companyData;

  return (
    <section id="localizacao" className="section-padding bg-graphite-800/30 relative">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="container-custom relative z-10">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Localização"
            title="Venha nos visitar"
          />

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="card-surface p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-400/10 border border-brand-400/20">
                    <MapPin className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold">Endereço</h3>
                </div>

                <div className="space-y-1 text-gray-300">
                  <p className="text-lg font-medium text-white">
                    {address.full}
                  </p>
                  <p>
                    {address.district}, {address.city} – {address.state}
                  </p>
                  <p>CEP {address.cep}</p>
                </div>

                <a
                  href={maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full mt-6"
                >
                  <Navigation className="w-5 h-5" />
                  Abrir rota no Google Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="card-surface overflow-hidden h-full min-h-[320px] md:min-h-[400px]">
                <iframe
                  src={maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '320px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title={`Mapa - ${companyData.name}`}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
