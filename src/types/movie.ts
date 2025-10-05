import type { Genre } from "./genre";

export type Movie = {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  genres: Genre[];
};
