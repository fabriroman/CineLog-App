import { useContext, useState } from "react";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { ReviewsTable } from "./ReviewsTable";
import { SearchBar } from "./SearchBar";
import "../styles/AdminReviewSection.css";

export const AdminReviewsSection = () => {
  const moviesCtx = useContext(MoviesContext);
  const { reviews } = useContext(ReviewsContext);
  const [searchQuery, setSearchQuery] = useState("");

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies, getMovieTitle } = moviesCtx;

  const filteredReviews = reviews.filter((reviews) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const movieTitle = getMovieTitle(reviews.movieId).toLowerCase();
    const userId = reviews.userId.toString().toLowerCase();

    return movieTitle.includes(query) || userId.includes(query);
  });

  return (
    <section className="admin__section">
      <h2 className="admin__section-title">Reviews</h2>
      <div className="admin__filters">
        <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="admin__content">
        <ReviewsTable reviews={filteredReviews} movies={movies} />
      </div>
    </section>
  );
};
