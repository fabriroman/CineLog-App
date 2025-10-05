import { useContext } from "react";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { ReviewItem } from "./ReviewItem";

type ReviewListProps = {
  movieId: number;
};

export const ReviewList = ({ movieId }: ReviewListProps) => {
  const { reviews } = useContext(ReviewsContext);

  const movieReviews = reviews.filter(review => review.movieId === movieId);

  if (movieReviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div>
      <h2>Reviews ({movieReviews.length})</h2>
      {movieReviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};