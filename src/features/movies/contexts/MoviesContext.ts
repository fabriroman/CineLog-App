import { createContext } from "react";
import type { Movie } from "../../../types/movie";

export type CreateMovieData = Omit<Movie, "id">;

export type MoviesContextType = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  createMovie: (movieData: CreateMovieData) => void;
  updateMovie: (id: number, updateData: Partial<Movie>) => void;
  deleteMovie: (id: number) => void;
};

export const MoviesContext = createContext<MoviesContextType | null>(null);
