import type { Review } from "../types/review";
import { StarRating } from "./StarRating";
import "../styles/ReviewItem.css";
import { getUserById } from "../data/users";

export const ReviewItem = ({ review }: { review: Review }) => {
  const username = getUserById(review.userId)?.username;
  return (
    <div className="review-container">
      <div className="review-container__header">
        <p className="review-container__username">{username}</p>
        <StarRating value={review.rating} readOnly />
      </div>
      <div className="review-container__body">
        <p className="review-container__text">{review.review_text}</p>
        <p className="review-container__tag">tag: {review.tag}</p>
      </div>
    </div>
  );
};