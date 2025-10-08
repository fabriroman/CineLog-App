import { useContext, useState } from "react";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { MoviesTable } from "./MoviesTable";
import { CreateMovieModal } from "./CreateMovieModal";

export const AdminMoviesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const moviesCtx = useContext(MoviesContext);

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies } = moviesCtx;

  return (
    <section className="admin__section">
      <div className="admin__section-header">
        <h2 className="admin__section-title">Movies</h2>
        <button onClick={() => setIsModalOpen(true)}>Add New Movie</button>
      </div>
      <div className="admin__content">
        <MoviesTable movies={movies} />
      </div>
      <CreateMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
