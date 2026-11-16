export const companyData = {
  name: 'Adega Tá no Grau 013',
  shortName: 'Tá no Grau 013',
  segment: 'Adega e comércio local',
  city: 'Praia Grande',
  state: 'SP',
  neighborhood: 'Aviação',

  address: {
    street: 'Av. Jorge Hagge',
    number: '461',
    full: 'Av. Jorge Hagge, nº 461',
    district: 'Aviação',
    city: 'Praia Grande',
    state: 'SP',
    cep: '11702-390',
  },

  phone: {
    display: '(13) 99615-8547',
    raw: '13996158547',
    ddd: '13',
    number: '99615-8547',
  },

  // Link da ficha da adega no iFood informado pelo responsável.
  ifoodUrl: 'https://www.ifood.com.br/delivery/praia-grande-sp/adega-ta-no-grau-013-aviacao/ff6c8969-7512-41d2-b197-144765c8fc48',

  whatsapp: {
    message: 'Olá! Encontrei a Adega Tá no Grau 013 pelo site e gostaria de obter informações.',
    url: 'https://wa.me/5513996158547?text=Ol%C3%A1%21%20Encontrei%20a%20Adega%20T%C3%A1%20no%20Grau%20013%20pelo%20site%20e%20gostaria%20de%20obter%20informa%C3%A7%C3%B5es.',
  },

  maps: {
    query: 'Adega Tá no Grau 013, Av. Jorge Hagge 461, Praia Grande, SP',
    embedUrl:
      'https://www.google.com/maps?q=Adega+T%C3%A1+no+Grau+013,+Av.+Jorge+Hagge+461,+Praia+Grande,+SP&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Adega+T%C3%A1+no+Grau+013,+Av.+Jorge+Hagge+461,+Avia%C3%A7%C3%A3o,+Praia+Grande,+SP,+11702-390',
    viewUrl:
      'https://www.google.com/maps/search/?api=1&query=Adega+T%C3%A1+no+Grau+013,+Av.+Jorge+Hagge+461,+Praia+Grande,+SP',
  },

  reviews: {
    rating: 5.0,
    maxRating: 5.0,
    count: 13,
    source: 'Google Maps',
  },

  hours: {
    note: 'Consulte nossos horários de funcionamento',
    closingTime: '00h00',
  },

  features: {
    womenLed: true,
    lgbtqiaFriendly: true,
  },

  services: [
    'Atendimento presencial',
    'Retirada na loja',
    'Informações sobre entregas',
    'Ambiente acolhedor e inclusivo',
  ],

  legalNotice: 'Venda de bebidas alcoólicas proibida para menores de 18 anos.',

  navLinks: [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Atendimento', href: '#atendimento' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Contato', href: '#contato' },
  ],
} as const;

export type CompanyData = typeof companyData;
