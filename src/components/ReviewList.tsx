import { useContext } from "react";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { ReviewItem } from "./ReviewItem";
import "../styles/ReviewList.css";

type ReviewListProps = {
  movieId: number;
};

export const ReviewList = ({ movieId }: ReviewListProps) => {
  const { reviews } = useContext(ReviewsContext);

  const movieReviews = reviews.filter(review => review.movieId === movieId);

  return (
    <div className="reviews-container">
      <h2 className="reviews-container__title">
        Reviews ({movieReviews.length})
      </h2>

      {movieReviews.length === 0 ? (
        <p className="reviews-container__empty">No reviews yet.</p>
      ) : (
        <div className="reviews-container__list">
          {movieReviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};