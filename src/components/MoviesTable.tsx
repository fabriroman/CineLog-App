import { StarRating } from "./StarRating";
import "../styles/Table.css";

export interface Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
  rating: number;
}

interface MoviesTableProps {
  movies: Movie[];
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
}

export const MoviesTable = ({ movies, onEdit, onDelete }: MoviesTableProps) => {
  return (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-cell">Title</th>
          <th className="table__header-cell">Year</th>
          <th className="table__header-cell">Genre</th>
          <th className="table__header-cell">Rating</th>
          {(onEdit || onDelete) && (
            <th className="table__header-cell table__header-cell--actions">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="table__body">
        {movies.map((movie) => (
          <tr key={movie.id} className="table__row">
            <td className="table__cell table__cell--title">{movie.title}</td>
            <td className="table__cell">{movie.year}</td>
            <td className="table__cell">{movie.genres.join(", ")}</td>
            <td className="table__cell">
              <StarRating value={movie.rating} readOnly />
            </td>
            {(onEdit || onDelete) && (
              <td className="movies-table__cell movies-table__cell--actions">
                {onEdit && (
                  <button
                    className="movies-table__action-button movies-table__action-button--edit"
                    onClick={() => onEdit(movie)}
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button
                    className="movies-table__action-button movies-table__action-button--delete"
                    onClick={() => onDelete(movie)}
                  >
                    Eliminar
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
