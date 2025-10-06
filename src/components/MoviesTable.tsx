import { useContext } from "react";
import { StarRating } from "./StarRating";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";

export const MoviesTable = () => {
  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Año</th>
          <th>Género</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.genres.join(", ")}</td>
            <td>
              <StarRating value={movie.rating} readOnly />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
