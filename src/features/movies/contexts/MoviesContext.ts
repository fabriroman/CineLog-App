import { createContext } from "react";
import type { Movie } from "../../../types/movie";

export type MoviesContextType = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};

export const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  setMovies: () => {},
});
