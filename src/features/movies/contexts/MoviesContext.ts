import { createContext } from "react";
import type { Movie } from "../../../types/movie";

export type CreateMovieData = Omit<Movie, "id">;

export type MoviesContextType = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  getMovieTitle: (movieId: number) => string;
  createMovie: (movieData: CreateMovieData) => void;
  updateMovie: (movieData: Movie) => void;
  deleteMovie: (movieData: Movie) => void;
};

export const MoviesContext = createContext<MoviesContextType | null>(null);
