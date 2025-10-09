import { StarRating } from "./StarRating";
import type { Movie } from "../types/movie";

interface MoviesTableProps {
  movies: Movie[];
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
}

export const MoviesTable = ({ movies, onEdit, onDelete }: MoviesTableProps) => {
  return (
    <table className="movies-table">
      <thead className="movies-table__header">
        <tr className="movies-table__header-row">
          <th className="movies-table__header-cell">Título</th>
          <th className="movies-table__header-cell">Año</th>
          <th className="movies-table__header-cell">Género</th>
          <th className="movies-table__header-cell">Rating</th>
          {(onEdit || onDelete) && (
            <th className="movies-table__header-cell movies-table__header-cell--actions">
              Acciones
            </th>
          )}
        </tr>
      </thead>
      <tbody className="movies-table__body">
        {movies.map((movie) => (
          <tr key={movie.id} className="movies-table__row">
            <td className="movies-table__cell movies-table__cell--title">
              {movie.title}
            </td>
            <td className="movies-table__cell movies-table__cell--year">
              {movie.year}
            </td>
            <td className="movies-table__cell movies-table__cell--genre">
              {movie.genres.join(", ")}
            </td>
            <td className="movies-table__cell movies-table__cell--rating">
              <StarRating value={movie.rating} readOnly />
            </td>
            {(onEdit || onDelete) && (
               <td>
                {onEdit && <button onClick={() => onEdit(movie)}>Editar</button>}
                {onDelete && <button onClick={() => onDelete(movie)}>Eliminar</button>}
               </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
