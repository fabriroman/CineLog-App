import { seedMovies } from "../../../data/movies";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Movie } from "../../../types/movie";
import { MoviesContext } from "./MoviesContext";

const STORAGE_KEY = "movies";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useLocalStorage<Movie[]>(STORAGE_KEY, seedMovies);
  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
