import { useContext, useState } from "react";
import { MoviesContext } from "../../../features/movies/contexts/MoviesContext";
import { ReviewsContext } from "../../../features/movies/contexts/ReviewsContext";
import { MoviesTable } from "../../../components/MoviesTable";
import { ReviewsTable } from "../../../components/ReviewsTable";

export const Admin = () => {
  const [isMoviesShown, setIsMovieShown] = useState(false);
  const [isReviewsShown, setIsReviewsShown] = useState(false);
  const moviesCtx = useContext(MoviesContext);
  const { reviews } = useContext(ReviewsContext);

  if (!moviesCtx) {
    throw new Error("MoviesContext must be used within MoviesProvider");
  }

  const { movies } = moviesCtx;

  const handleMovies = () => {
    setIsMovieShown(!isMoviesShown);
  };
  const handleReviews = () => {
    setIsReviewsShown(!isReviewsShown);
  };

  return (
    <>
      <h1>Cine Log Admin Panel</h1>
      <div>
        <button onClick={handleMovies}>MOVIES</button>
        <button onClick={handleReviews}>REVIEWS</button>
      </div>

      <h2>Movies</h2>
      {isMoviesShown? <MoviesTable movies={movies} /> : "There are no movies"}

      <h2>Reviews</h2>
       {isReviewsShown? <ReviewsTable reviews={reviews} movies={movies} /> : "There are no reviews"}
      
    </>
  );
};
