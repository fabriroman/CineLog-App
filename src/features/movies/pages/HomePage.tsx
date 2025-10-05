import { MovieCard } from "../../../components/MovieCard";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import "../../../styles/CardGrid.css"

export const HomePage = () => {
  const { movies } = useContext(MoviesContext);
  return (
    <section className="home">
      <h1 className="page-title">Movies</h1>

      <div className="cards-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
