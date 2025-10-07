import { StarRating } from "./StarRating";

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
