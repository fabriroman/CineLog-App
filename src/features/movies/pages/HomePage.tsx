import "../../../styles/HomePage.css";
import { MovieCard } from "../../../components/MovieCard";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";
import { Filter } from "../../../components/Filter";
import { useMovieFilters } from "../../../hooks/useMovieFilters";
import { NoResultMessage } from "../../../components/NoResultMessage";
import { Header } from "../../../components/Header";

export const HomePage = () => {
  const { movies } = useContext(MoviesContext);

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
      <h1 className="page-title">Movies</h1>
      <Filter
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isFiltering && moviesToDisplay.length === 0 ? (
        <NoResultMessage message="No movies found matching your criteria." />
      ) : (
        <div className="home__grid">
          {moviesToDisplay.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};
