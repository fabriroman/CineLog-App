import { useContext } from "react";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { MoviesTable } from "./MoviesTable";
import "../styles/AdminMoviesSection.css";

export const AdminMoviesSection = () => {
  const moviesCtx = useContext(MoviesContext);

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies } = moviesCtx;

  return (
    <section className="admin__section">
      <div className="admin__section-header">
        <h2 className="admin__section-title">Movies</h2>
        <div className="admin__section-add">
          <button className="button button--primary">Add New Movie</button>
        </div>
      </div>
      <div className="admin__content">
        <MoviesTable movies={movies} />
      </div>
    </section>
  );
};
