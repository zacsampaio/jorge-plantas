import { House, Sun, CloudSun } from "phosphor-react";

export interface CategoryInfo {
  tag: string;
  title: string;
  description: string;
  icon: typeof House;
  accent: "green" | "yellow" | "gray";
}

export const categories: CategoryInfo[] = [
  {
    tag: "interior",
    title: "Para dentro de casa",
    description:
      "Plantas que se adaptam bem a ambientes internos, trazendo frescor e vida aos seus espaços.",
    icon: House,
    accent: "green",
  },
  {
    tag: "sol pleno",
    title: "Sol pleno",
    description:
      "Ideais para varandas, jardins e áreas com bastante luminosidade durante o dia.",
    icon: Sun,
    accent: "yellow",
  },
  {
    tag: "sombra parcial",
    title: "Sombra parcial",
    description:
      "Perfeitas para cantos com luz indireta — versáteis e fáceis de manter.",
    icon: CloudSun,
    accent: "gray",
  },
];
