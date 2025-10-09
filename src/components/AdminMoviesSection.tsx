import { useContext, useState } from "react";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { MoviesTable } from "./MoviesTable";
import { MovieFormModal } from "./MovieFormModal";
import "../styles/AdminMoviesSection.css";
import type { Movie } from "../types/movie";

export const AdminMoviesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null);
  const moviesCtx = useContext(MoviesContext);

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies, deleteMovie } = moviesCtx;

  const handleEdit = (movie: Movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const handleDelete = (movie: Movie) => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      deleteMovie(movie);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);
  };

  return (
    <section className="admin__section">
      <div className="admin__section-header">
        <h2 className="admin__section-title">Movies</h2>
        <div className="admin__section-add">
          <button onClick={() => setIsModalOpen(true)}>Add New Movie</button>
        </div>
      </div>
      <div className="admin__content">
        <MoviesTable
          movies={movies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <MovieFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movieToEdit={movieToEdit}
      />
    </section>
  );
};
