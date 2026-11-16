/**
 * Avaliações em destaque da Adega Tá no Grau 013.
 *
 * Adicione aqui somente opiniões reais da ficha desta adega no Google Maps,
 * verificando nome, nota, data aproximada e texto. Não utilize comentários
 * de outros estabelecimentos nem gere comentários fictícios.
 *
 * O componente Reviews mostra no máximo cinco avaliações desta lista.
 */
export type FeaturedReview = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;
  text: string;
};

export const featuredReviews: FeaturedReview[] = [];
