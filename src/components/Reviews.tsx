import { Star, BadgeCheck, ExternalLink, MessageSquareText, PenLine } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { companyData } from '@/data/company';
import { featuredReviews } from '@/data/featuredReviews';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Reviews() {
  const { ref, isVisible } = useScrollAnimation();
  const { reviews, maps } = companyData;
  const highlights = featuredReviews.slice(0, 5);

  return (
    <section id="avaliacoes" className="section-padding relative">
      <div className="container-custom">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <SectionHeading
            eyebrow="Avaliações"
            title="A opinião de quem nos visita"
            description="Confira o que os clientes dizem sobre a Adega Tá no Grau 013."
          />

          <div className="mx-auto max-w-5xl">
            <div className="card-surface relative overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-400/5 blur-3xl" aria-hidden="true" />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                    <BadgeCheck className="h-4 w-4 text-brand-400" aria-hidden="true" />
                    Avaliações no Google Maps
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                      {reviews.rating.toFixed(1).replace('.', ',')}
                    </span>
                    <div>
                      <div className="flex gap-1" aria-label={`Nota cadastrada: ${reviews.rating.toFixed(1)} de ${reviews.maxRating.toFixed(1)} estrelas`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-brand-400 text-brand-400" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-300">{reviews.count} avaliações cadastradas</p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
                    Nota e quantidade registradas manualmente, não atualizadas em tempo real.
                    Consulte o Google para ver os dados mais recentes.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto md:min-w-[245px]">
                  <a href={maps.reviewPageUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
                    <PenLine className="h-5 w-5" aria-hidden="true" />
                    Avaliar no Google
                  </a>
                  <a href={maps.reviewPageUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-center">
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    Ver todas no Google
                  </a>
                  <p className="max-w-xs text-center text-xs leading-relaxed text-gray-400">
                    Para publicar sua opinião, entre na sua conta do Google e selecione “Escrever uma avaliação” na página da adega.
                  </p>
                </div>
              </div>
            </div>

            {highlights.length > 0 ? (
              <div className="mt-8">
                <div className="mb-5 flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-brand-400" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold text-white">Avaliações em destaque</h3>
                </div>
                <ul className="grid gap-4 md:grid-cols-2" aria-label="Até cinco opiniões reais dos clientes">
                  {highlights.map((review, index) => (
                    <li key={index} className="card-surface flex flex-col gap-4 p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-lg font-bold text-brand-400" aria-hidden="true">
                          {review.author.trim().charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white">{review.author}</p>
                          <p className="text-xs text-gray-400">{review.dateLabel} no Google</p>
                          <div className="mt-2 flex gap-1" aria-label={`${review.rating} de 5 estrelas`}>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-brand-400 text-brand-400' : 'fill-gray-700 text-gray-700'}`} aria-hidden="true" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-sm leading-relaxed text-gray-300">“{review.text}”</blockquote>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center sm:p-8">
                <MessageSquareText className="mx-auto mb-3 h-8 w-8 text-brand-400" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-white">Comentários dos clientes</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
                  Os depoimentos em destaque serão adicionados após a confirmação de cinco avaliações reais da nossa ficha no Google.
                  Enquanto isso, você pode ler todas as opiniões diretamente no Google Maps.
                </p>
                <a href={maps.reviewPageUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:underline">
                  Ler comentários reais <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
