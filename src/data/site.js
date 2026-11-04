// Dados centralizados da loja e dos arquivos usados pelas seções do site.
export const phone = '2730512181';
export const address = 'Av. Copacabana, 317 - Morada de Laranjeiras, Serra - ES, 29166-820';
export const placeId = 'ChIJAxYeCgAduAARobQTGoCxXrQ';

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}&query_place_id=${placeId}`;
export const mapEmbedUrl = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(address)}&z=14&output=embed`;

export const services = [
  'Avaliação de óleo e fluido do câmbio',
  'Sistema de freios',
  'Pneus',
  'Bateria',
  'Ar-condicionado',
  'Arrefecimento',
  'Câmbio automático',
  'Suspensão',
  'Elétrica em geral'
];

export const servicePhotos = [
  { src: '/images/carro-em-revisao.png', alt: 'Carro em revisão em um elevador automotivo' },
  { src: '/images/equipe-em-servico.png', alt: 'Mecânicos trabalhando na parte inferior de um carro' },
  { src: '/images/fachada-noturna-hq.png', alt: 'Fachada da TCM Auto Center à noite' },
  { src: '/images/motor-detalhe-hq.png', alt: 'Detalhe de um motor automotivo' }
];

// Comentários copiados da imagem enviada pela loja, usados como contingência da API.
export const referenceReviews = [
  {
    name: 'Vinicia Becalli Delboni',
    age: 'há 3 meses',
    text: 'Depois da experiência que tive, posso dizer que essa oficina merece 5 estrelas! Atendimento excelente, serviço de qualidade e, acima de tudo, honestidade. É muito bom encontrar profissionais em quem realmente podemos confiar. Super recomendo!'
  },
  {
    name: 'Edson Borges',
    age: 'há 2 semanas',
    text: 'Parabéns e muito obrigado a toda a equipe da TCM Auto Center! Gostaríamos de registrar nosso agradecimento pelo excelente atendimento prestado e pela transparência com o preço justo. É um grande diferencial encontrar…'
  },
  {
    name: 'Barbara Nippes Dallapicola',
    age: 'há 1 ano',
    text: 'Equipe honesta, atendimento atencioso e diferenciado!!! Marcelo e Diego são excelentes profissionais e prontamente me atenderam com muita atenção e profissionalismo!! Virei cliente fiel!!!!! Indico para todos!!!!!'
  }
];

export const partnerBrands = [
  { src: '/images/marca-honda.png', alt: 'Honda' },
  { src: '/images/marca-lubrax.png', alt: 'Lubrax' },
  { src: '/images/marca-petronas.png', alt: 'Petronas' }
];
