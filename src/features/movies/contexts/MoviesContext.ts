import { createContext } from "react";
import type { Movie } from "../../../types/movie";

export type MoviesContextType = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  getMovieTitle: (movieId: number) => string;
};

export const MoviesContext = createContext<MoviesContextType | null>(null);
