import { useContext, useState } from "react";
import { MoviesContext } from "../../../features/movies/contexts/MoviesContext";
import { ReviewsContext } from "../../../features/movies/contexts/ReviewsContext";
import { MoviesTable } from "../../../components/MoviesTable";
import { ReviewsTable } from "../../../components/ReviewsTable";

export const Admin = () => {
  const [isReviewsShown, setIsReviewsShown] = useState(false);
  const moviesCtx = useContext(MoviesContext);
  const { reviews } = useContext(ReviewsContext);

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies } = moviesCtx;

  const handleReviews = (isMovies: boolean) => {
    setIsReviewsShown(!isMovies);
  };

  return (
    <div className="admin">
      <h1 className="admin__title">Cine Log Admin Panel</h1>

      <div className="admin__controls">
        <button
          className="admin__button admin__button--movies"
          onClick={()=>{handleReviews(true)}}
        >
          MOVIES
        </button>
        <button
          className="admin__button admin__button--reviews"
          onClick={()=>{handleReviews(false)}}
        >
          REVIEWS
        </button>
      </div>


      <section className="admin__section">
        <h2 className="admin__section-title">{isReviewsShown ? "Reviews" : "Movies"}</h2>
        <div className="admin__content">
          {isReviewsShown ? (
            <ReviewsTable reviews={reviews} movies={movies} />
          ) : (
            <MoviesTable movies={movies}/>
          )}
        </div>
      </section>
    </div>
  );
};
