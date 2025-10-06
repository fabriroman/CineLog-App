import { useContext } from "react";
import { StarRating } from "./StarRating";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";

export const ReviewsTable = () => {
  const { reviews } = useContext(ReviewsContext);
  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;

  const movie = (movieId: number) => {
    return movies.find((movie) => movie.id === movieId);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Movie</th>
          <th>User</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => {
          const movieFound = movie(review.movieId);
          if (!movieFound) return null;

          return (
            <tr key={review.id}>
              <td>{movieFound.title}</td>
              <td>{review.userId}</td>
              <td>
                <StarRating value={review.rating} readOnly />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
