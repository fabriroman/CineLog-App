import type { Genre } from "./genre";

export type Movie = {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  description: string;
  rating: number;
  genres: Genre[];
  actors: string[];
};




export type MovieDetailCardProps = {
  movie: Movie;
}

