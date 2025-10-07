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
    <table className="data-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Año</th>
          <th>Género</th>
          <th>Rating</th>
          {onEdit || onDelete ? <th>Acciones</th> : null}
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
            {(onEdit || onDelete) && (
              <td>
                {onEdit && (
                  <button
                    onClick={() => onEdit(movie)}
                    style={{ marginRight: "8px" }}
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(movie)}>Eliminar</button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
