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
    reviewPageUrl: 'https://www.google.com/maps/place/Adega+T%C3%A1+no+Grau+013/@-24.0135337,-46.4392431,17z/data=!4m17!1m9!3m8!1s0x94ce1f005d18a55f:0x53299be2e9ce98cf!2sAdega+T%C3%A1+no+Grau+013!8m2!3d-24.0136001!4d-46.4393939!9m1!1b1!16s%2Fg%2F11nvfvmnz8!3m6!1s0x94ce1f005d18a55f:0x53299be2e9ce98cf!8m2!3d-24.0136001!4d-46.4393939!10e2!16s%2Fg%2F11nvfvmnz8',
  },

  reviews: {
    rating: 5.0,
    maxRating: 5.0,
    count: 13,
    source: 'Google Maps',
  },

  hours: {
    note: 'Horários de funcionamento',
    timezone: 'America/Sao_Paulo',
    weekly: [
      { key: 'Mon', label: 'Segunda-feira', start: '09:00', end: '22:00' },
      { key: 'Tue', label: 'Terça-feira', start: '09:00', end: '22:00' },
      { key: 'Wed', label: 'Quarta-feira', start: '09:00', end: '22:00' },
      { key: 'Thu', label: 'Quinta-feira', start: '09:00', end: '22:00' },
      { key: 'Fri', label: 'Sexta-feira', start: '09:00', end: '00:00' },
      { key: 'Sat', label: 'Sábado', start: '09:00', end: '00:00' },
      { key: 'Sun', label: 'Domingo', start: '09:00', end: '22:00' },
    ],
    specialNotice: 'Os horários podem ser diferentes em feriados e datas especiais. Consulte a loja antes da visita.',
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

  legalNotice: 'Venda de bebidas alcoólicas e produtos de tabaco proibida para menores de 18 anos. Beba com moderação. Se beber, não dirija.',

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
