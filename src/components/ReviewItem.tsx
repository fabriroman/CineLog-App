import type { Review } from "../types/review";
import { StarRating } from "./StarRating";

export const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <div>
      <StarRating value={review.rating}/>
      <p>"{review.review_text}"</p>
      <p>tag:  {review.tag}</p>
    </div>
  );
};