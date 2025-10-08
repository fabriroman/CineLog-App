import { useContext } from "react";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { ReviewsTable } from "./ReviewsTable";

export const AdminReviewsSection = () => {
  const moviesCtx = useContext(MoviesContext);
  const { reviews } = useContext(ReviewsContext);

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies } = moviesCtx;

  return (
    <section className="admin__section">
      <h2 className="admin__section-title">Reviews</h2>
      <div className="admin__content">
        <ReviewsTable reviews={reviews} movies={movies} />
      </div>
    </section>
  );
};
