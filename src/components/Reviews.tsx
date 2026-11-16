import { Star, BadgeCheck, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { companyData } from '@/data/company';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Reviews() {
  const { ref, isVisible } = useScrollAnimation();
  const { reviews } = companyData;

  return (
    <section id="avaliacoes" className="section-padding relative">
      <div className="container-custom">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Avaliações"
            title="O que dizem sobre a Adega"
            description="Confira a avaliação da adega e consulte os comentários diretamente no Google Maps."
          />

          <div className="max-w-3xl mx-auto">
            <div className="card-surface p-8 md:p-12 text-center relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-400/5 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8 text-brand-400 fill-brand-400"
                    />
                  ))}
                </div>

                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="font-display text-5xl md:text-6xl font-extrabold text-gradient">
                    {reviews.rating.toFixed(1)}
                  </span>
                  <span className="text-2xl text-gray-400 font-medium">
                    / {reviews.maxRating.toFixed(1)}
                  </span>
                </div>

                <p className="text-lg text-gray-300 font-medium mb-1">
                  {reviews.count} avaliações
                </p>

                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <BadgeCheck className="w-4 h-4 text-brand-400" />
                  <span className="text-sm text-gray-400">
                    Fonte: {reviews.source}
                  </span>
                </div>
                <a href={companyData.maps.viewUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Ler avaliações no Google Maps
                </a>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400 max-w-xl mx-auto">
              A nota e a quantidade acima são dados registrados manualmente, não atualizados em tempo real. Consulte a página do Google para informações atuais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
