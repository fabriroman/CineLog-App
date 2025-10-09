import "../../../styles/HomePage.css";
import { MovieCard } from "../../../components/MovieCard";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import "../../../styles/CardGrid.css";
import { Filter } from "../../../components/Filter";
import { useMovieFilters } from "../../../hooks/useMovieFilters";
import { NoResultMessage } from "../../../components/NoResultMessage";
import { Header } from "../../../components/Header";

export const HomePage = () => {
  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;

  const {
    selectedGenre,
    setSelectedGenre,
    searchQuery,
    setSearchQuery,
    filteredMovies,
    isFiltering,
  } = useMovieFilters(movies);

  const moviesToDisplay = isFiltering ? filteredMovies : movies;

  return (
    <section className="home">
      <Header />
      <Filter
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isFiltering && moviesToDisplay.length === 0 ? (
        <NoResultMessage message="No movies found matching your criteria." />
      ) : (
        <div className="cards-grid">
          {moviesToDisplay.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};
