/**
 * Cinco avaliações reais da Adega Tá no Grau 013, transcritas dos prints
 * do Google Maps enviados pelo responsável em 16/11/2026.
 *
 * Os tempos relativos correspondem à data da captura, não são atualizados
 * automaticamente. Textos parcialmente visíveis permanecem truncados.
 */
export type FeaturedReview = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  dateLabel: string;
  text: string;
};

export const featuredReviews: FeaturedReview[] = [
  {
    author: 'Rayssa Silva dos santos dantas',
    rating: 5,
    dateLabel: 'há 1 mês (na captura de nov/2026)',
    text: 'Que adega ótima! Lugar super agradável, atendimento excelente e produtos de primeira qualidade. Virei cliente fiel...',
  },
  {
    author: 'Erick Matos',
    rating: 5,
    dateLabel: 'há 1 mês (na captura de nov/2026)',
    text: 'Atendimento muito bom pessoas super educadas variedade de produtos',
  },
  {
    author: 'Diégo Wendell Américo De Souza',
    rating: 5,
    dateLabel: 'há 1 mês (na captura de nov/2026)',
    text: 'Ótimo atendimento e produtos de qualidade',
  },
  {
    author: 'Geovane Oliveira',
    rating: 5,
    dateLabel: 'há 3 semanas (na captura de nov/2026)',
    text: 'Lugar fácil acesso atendimento Toop indico',
  },
  {
    author: 'rosana vituri',
    rating: 5,
    dateLabel: 'há 1 mês (na captura de nov/2026)',
    text: 'Excelente ADEGA, sou cliente de todos os dias.. atendimento 100',
  },
];
