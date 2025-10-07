import { useState } from "react";
import { StarRating } from "./StarRating";
import type { Review } from "../types/review";
import "../styles/ReviewModal.css";

type ReviewModalProps = {
  onClose: () => void;
  onSubmit: (data: { rating: number; review_text: string; tag: Review["tag"] }) => void;
};

export const ReviewModal = ({ onClose, onSubmit }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [tag, setTag] = useState<Review["tag"]>("Netflix");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) {
      alert("Please provide a rating and a review text.");
      return;
    }
    onSubmit({ rating, review_text: reviewText.trim(), tag });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Add Your Review</h2>

        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">Your Rating:</label>
          <StarRating value={rating} onChange={setRating} />

          <label className="modal__label">Your Review:</label>
          <textarea
            className="modal__textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your thoughts..."
          />

          <label className="modal__label">Where did you watch it?</label>
          <select
            className="modal__select"
            value={tag}
            onChange={(e) => setTag(e.target.value as Review["tag"])}
          >
            <option value="Netflix">Netflix</option>
            <option value="Prime">Prime</option>
            <option value="Movie Theater">Movie Theater</option>
          </select>

          <div className="modal__buttons">
            <button type="button" onClick={onClose} className="modal__button modal__button--cancel">
              Cancel
            </button>
            <button type="submit" className="modal__button modal__button--save">
              Save Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
