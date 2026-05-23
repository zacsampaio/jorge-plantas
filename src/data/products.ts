import { ProductsType } from "../redux/cart/types";

export const products: ProductsType[] = [
  {
    id: 1,
    tags: ["sombra parcial", "interior"],
    bestSeller: true,
    name: "Samambaia com Cesta",
    description: "Beleza tropical e fácil de cuidar para seu ambiente!",
    price: 50.0,
    quantity: 0,
  },
  {
    id: 2,
    tags: ["sol pleno", "interior"],
    bestSeller: true,
    name: "Flecha-de-Macaco",
    description: "Traz frescor e é perfeita para purificar o ar!",
    price: 20.0,
    quantity: 0,
  },
  {
    id: 3,
    tags: ["sol pleno"],
    name: "Roseira",
    description: "As Rosas encantam e são perfeitas para presentear!",
    price: 10.0,
    quantity: 0,
  },
  {
    id: 4,
    tags: ["sombra parcial", "interior"],
    name: "Clorofito",
    description: "Traz leveza e é perfeita para purificar o ar!",
    price: 10.0,
    quantity: 0,
  },
  {
    id: 5,
    tags: ["sol pleno"],
    name: "Cacto Mini-Palma",
    description: "Traz estilo e é perfeito para decorar ambientes!",
    price: 15.0,
    quantity: 0,
  },
  {
    id: 6,
    tags: ["sombra parcial", "interior"],
    bestSeller: true,
    name: "Café de Salão",
    description: "Traz elegância e renova a atmosfera da sua casa!",
    price: 15.0,
    quantity: 0,
  },
  {
    id: 7,
    tags: ["sol pleno"],
    name: "Mini Mandacaru",
    description: "Traz simplicidade e é muito prático!",
    price: 15.0,
    quantity: 0,
  },
  {
    id: 8,
    tags: ["sombra parcial", "interior"],
    name: "Muda Clorofito Ocean",
    description: "Traz frescor e é ideal para qualquer ambiente!",
    price: 5.0,
    quantity: 0,
  },
  {
    id: 9,
    tags: ["sombra parcial"],
    name: "Orelha-de-Elefante",
    description: "Traz um toque exótico e enche o espaço de vida e cor!",
    price: 20.0,
    quantity: 0,
  },
  {
    id: 10,
    tags: ["sol pleno"],
    name: "Muda Clúsia Variegata",
    description: "Traz sofisticação e destaca-se com suas folhas únicas!",
    price: 10.0,
    quantity: 0,
  },
  {
    id: 11,
    tags: ["sol pleno"],
    name: "Muda Rosa do Deserto",
    description: "Traz beleza e é perfeita para adicionar um toque tropical!",
    price: 15.0,
    quantity: 0,
  },
  {
    id: 12,
    tags: ["sombra parcial", "interior"],
    name: "Mini Espada de São Jorge",
    description: "Traz charme e é perfeita para decorar pequenos espaços!",
    price: 10.0,
    quantity: 0,
  },
  {
    id: 13,
    tags: ["sol pleno"],
    name: "Muda Cróton Canarinho",
    description: "Traz cores vibrantes e ilumina qualquer ambiente com alegria!",
    price: 10.0,
    quantity: 0,
  },
  {
    id: 14,
    tags: ["sombra parcial", "interior"],
    bestSeller: true,
    name: "Jiboia com Cesta",
    description: "Traz um toque tropical e é ideal para pendurar e embelezar espaços!",
    price: 30.0,
    quantity: 0,
  },
  {
    id: 15,
    tags: ["sombra parcial", "interior"],
    name: "Maranta Cascavel",
    description: "Traz padrão único e é perfeita para adicionar frescor ao ambiente!",
    price: 20.0,
    quantity: 0,
  },
];

export function getBestSellerProducts(): ProductsType[] {
  return products.filter((product) => product.bestSeller);
}

export function getProductsByIds(ids: number[]): ProductsType[] {
  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is ProductsType => product !== undefined);
}

export function getProductsByTag(tag: string, limit = 4): ProductsType[] {
  return filterProductsByTag(tag).slice(0, limit);
}

export function getProductsByTagExcluding(
  tag: string,
  excludeIds: number[],
  limit = 4
): ProductsType[] {
  const excluded = new Set(excludeIds);
  return filterProductsByTag(tag)
    .filter((product) => !excluded.has(product.id))
    .slice(0, limit);
}

export function getAllProductTags(): string[] {
  const tags = products.flatMap((product) => product.tags ?? []);
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function filterProductsByTag(tag: string | null): ProductsType[] {
  if (!tag) return products;
  return products.filter((product) => product.tags?.includes(tag));
}