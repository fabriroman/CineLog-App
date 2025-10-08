import { seedMovies } from "../../../data/movies";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Movie } from "../../../types/movie";
import { MoviesContext } from "./MoviesContext";

const STORAGE_KEY = "movies";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useLocalStorage<Movie[]>(STORAGE_KEY, seedMovies);

  const getMovieTitle = (movieId: number): string => {
    const movie = movies.find((movie) => movie.id === movieId);
    return movie ? movie.title : "";
  };
  return (
    <MoviesContext.Provider value={{ movies, setMovies, getMovieTitle }}>
      {children}
    </MoviesContext.Provider>
  );
};
