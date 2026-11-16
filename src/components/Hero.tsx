import { MessageCircle, MapPin, Star, Wine, Sparkles, ShoppingBag } from 'lucide-react';
import { companyData } from '@/data/company';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <img
        src="/image.png"
        alt=""
        aria-hidden="true"
        className="logo-watermark pointer-events-none absolute right-[1%] top-1/2 hidden w-[min(62vw,760px)] -translate-y-1/2 md:block"
      />

      <div
        className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-brand-400/10 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -left-20 w-64 h-64 rounded-full bg-brand-400/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 w-full py-12 md:py-20">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 bg-gradient-to-l from-graphite-900/20 to-transparent md:block" aria-hidden="true" />
        <div className="max-w-3xl">
          <div className="animate-fade-in-down inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm text-gray-300">
              Praia Grande • Bairro Aviação
            </span>
          </div>

          <h1 className="animate-fade-in-up font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Adega <span className="text-gradient">Tá no Grau</span> 013
          </h1>

          <p
            className="animate-fade-in-up mt-6 text-xl md:text-2xl font-medium text-gray-200"
            style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Sua adega em Praia Grande, no bairro Aviação.
          </p>

          <p
            className="animate-fade-in-up mt-4 text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Conheça a Adega Tá no Grau 013. Atendimento presencial, retirada na loja
            e informações sobre entregas em um só lugar.
          </p>

          <div
            className="animate-fade-in-up mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4"
            style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <a
              href={companyData.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
            {companyData.ifoodUrl && (
              <a href={companyData.ifoodUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EA1D2C] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#C91525] hover:shadow-red-700/35 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                Pedir no iFood
              </a>
            )}
            <a
              href={companyData.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MapPin className="w-5 h-5" />
              Como chegar
            </a>
          </div>

          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-brand-400 fill-brand-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {companyData.reviews.rating.toFixed(1)} • {companyData.reviews.count} avaliações
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/10" />

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wine className="w-4 h-4 text-brand-400" />
              <span>Atendimento presencial e retirada</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-graphite-900 to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
