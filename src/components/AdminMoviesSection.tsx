import { useContext, useState } from "react";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { MoviesTable } from "./MoviesTable";
import { CreateMovieModal } from "./CreateMovieModal";
import { EditMovieModal } from "./EditMovieModal";
import type { Movie} from "../types/movie";

export const AdminMoviesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const moviesCtx = useContext(MoviesContext);
  const [editingMovie, setEditingMovie] = useState<Movie  | null>(null);
 
  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }
  const { movies,deleteMovie } = moviesCtx;

  const handleEdit = (movie: Movie)=> {
    setEditingMovie(movie)
  }

  const handleDelete = (movie: Movie) => {
    deleteMovie(movie.id);
  };

  return (
    <section className="admin__section">
      <div className="admin__section-header">
        <h2 className="admin__section-title">Movies</h2>
        <button onClick={() => setIsModalOpen(true)}>Add New Movie</button>
      </div>
      <div className="admin__content">
        <MoviesTable movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <CreateMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {editingMovie && (
        <EditMovieModal movie={editingMovie}
        onClose={() => setEditingMovie(null)}/>
      )}
    </section>
  );
};
