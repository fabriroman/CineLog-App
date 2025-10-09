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

  const updateMovie = (movieData: Movie) => {
    setMovies(movies.map((m) => (m.id === movieData.id ? movieData : m)));
  };

  const deleteMovie = (movieData: Movie) => {
    setMovies(movies.filter((m) => m.id !== movieData.id));
  };

  const getMovieTitle = (movieId: number): string => {
    const movie = movies.find((movie) => movie.id === movieId);
    return movie ? movie.title : "";
  };
  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        getMovieTitle,
        createMovie,
        updateMovie,
        deleteMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
