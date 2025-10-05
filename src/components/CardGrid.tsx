import { MovieCard } from "./MovieCard";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { useContext } from "react";

export const CardGrid = () => {
  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;

  return (
    <div className="cards-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
