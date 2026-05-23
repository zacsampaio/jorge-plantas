export interface CategoryShowcaseConfig {
  tag: string;
  label: string;
  title: string;
  subtitle: string;
  impactPhrase: string;
  ctaLabel: string;
  accent: "green" | "yellow";
  /** IDs fixos para a landing — sem repetir outras seções */
  productIds: number[];
}

export const categoryShowcases: CategoryShowcaseConfig[] = [
  {
    tag: "interior",
    label: "Para sua casa",
    title: "Interior",
    subtitle:
      "Espécies que prosperam dentro de casa — purificam o ar e deixam cada canto mais acolhedor.",
    impactPhrase:
      "Seu lar merece respirar verde. Escolha a planta que vai transformar o ambiente hoje.",
    ctaLabel: "Ver todas as plantas de interior",
    accent: "green",
    productIds: [4, 8, 12, 15],
  },
  {
    tag: "sol pleno",
    label: "Luz e vida",
    title: "Sol pleno",
    subtitle:
      "Para varandas ensolaradas e jardins cheios de energia — o sol do Ceará é parceiro delas.",
    impactPhrase:
      "Sob o sol fortaleense, suas plantas florescem. Leve esse vigor para a sua varanda.",
    ctaLabel: "Ver todas as plantas de sol pleno",
    accent: "yellow",
    productIds: [3, 5, 7, 10],
  },
];

/** Mais vendidos na landing (ids únicos, sem cruzar com as vitrines abaixo) */
export const landingBestSellerIds = [1, 2, 6, 14] as const;

export const brandImpactQuotes = [
  {
    quote:
      "Verde não é só decoração — é bem-estar pulsando na sua casa, todos os dias.",
    signature: "Jorge Plantas",
    cta: "Monte seu pedido agora",
    ctaTo: "/produtos",
  },
  {
    quote:
      "Há mais de 20 anos cultivando com carinho em Fortaleza. Cada planta chega até você com a nossa história.",
    signature: "Da nossa terra para o seu lar",
    cta: "Conheça o catálogo",
    ctaTo: "/produtos",
  },
] as const;
