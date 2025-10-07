import type { Review } from "../types/review";
import { StarRating } from "./StarRating";
import "../styles/ReviewCard.css";
import { ProfileMovieCard } from "./ProfileMovieCard";
import { CardActions, CardButton } from "./ProfileCardActions";

interface ReviewCardProps {
  review: Review;
  movieTitle?: string;
  moviePoster?: string;
  onRemove: (id: number) => void;
  onEdit?: (review: Review) => void;
}

export const ReviewCard = ({
  review,
  movieTitle = "Movie Title",
  moviePoster = "",
  onRemove,
  onEdit,
}: ReviewCardProps) => {
  const { id, rating, review_text, tag } = review;

  const actions = (
    <CardActions>
      <div className="review-card__content">
        <h3 className="review-card__title">{movieTitle}</h3>
        <div className="review-card__rating">
          <StarRating value={rating} readOnly={true} />
        </div>
        <p className="review-card__tag">{tag}</p>
        <p className="review-card__text">{review_text}</p>
      </div>
      <CardButton variant="primary" onClick={() => onEdit?.(review)}>
        Edit
      </CardButton>
      <CardButton variant="danger" onClick={() => onRemove(id)}>
        Delete
      </CardButton>
    </CardActions>
  );

  return (
    <ProfileMovieCard
      posterUrl={moviePoster}
      title={movieTitle}
      actions={actions}
    />
  );
};
