import { seedMovies } from "../../../data/movies";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Movie } from "../../../types/movie";
import { MoviesContext } from "./MoviesContext";

const STORAGE_KEY = "movies";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useLocalStorage<Movie[]>(STORAGE_KEY, seedMovies);
  const createMovie = (movieData: Omit<Movie, "id">) => {
    const newMovie = {
      ...movieData,
      id: Math.max(0, ...movies.map((m) => m.id)) + 1,
    };
    setMovies([...movies, newMovie]);
  };

  return (
    <MoviesContext.Provider value={{ movies, setMovies, createMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};
