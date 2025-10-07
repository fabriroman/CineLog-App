import { useContext, useState, useMemo } from "react";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { AuthContext } from "../features/auth/contexts/AuthContext";
import { ReviewModal } from "./ReviewModal";
import type { Review } from "../types/review";
import { useNavigate, useLocation } from "react-router-dom";

type AddReviewButtonProps = {
  movieId: number;
};

export const AddReviewButton = ({ movieId }: AddReviewButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth)
    throw new Error("AddReviewButton must be used within AuthProvider");
  const { currentUser } = auth;
  const { reviews, setReviews } = useContext(ReviewsContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userAlreadyReviewed = useMemo(() => {
    if (!currentUser) return false;
    return reviews.some(
      (r) => r.movieId === movieId && r.userId === currentUser.id
    );
  }, [reviews, movieId, currentUser]);

  const handleClick = () => {
    if (!currentUser) {
      navigate("/login", { state: { from: { pathname: location.pathname } } });
      return;
    }
    setShowModal(true);
  };

  const handleAddReview = (data: {
    rating: number;
    review_text: string;
    tag: Review["tag"];
  }) => {
    if (!currentUser) return;

    const newReview: Review = {
      id: Date.now(),
      userId: currentUser.id,
      movieId,
      rating: data.rating,
      review_text: data.review_text,
      tag: data.tag,
    };

    setReviews([newReview, ...reviews]);
    setShowModal(false);
  };

  if (userAlreadyReviewed) {
    return null;
  }

  return (
    <>
      <button className="movie-detail__button" onClick={handleClick}>
        Watched / Add Review
      </button>

      {showModal && (
        <ReviewModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddReview}
        />
      )}
    </>
  );
};
