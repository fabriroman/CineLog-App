import { useContext, useState, useMemo } from "react";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { AuthContext } from "../features/auth/contexts/AuthContext";
import { ReviewModal } from "./ReviewModal";
import type { Review } from "../types/review";

type AddReviewButtonProps = {
  movieId: number;
};

export const AddReviewButton = ({ movieId }: AddReviewButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(AuthContext)!;
  const { reviews, setReviews } = useContext(ReviewsContext);

  // ✅ 1. Detectar si el usuario ya tiene review en esta película
  const userAlreadyReviewed = useMemo(() => {
 if (!currentUser) return false;
  return reviews.some(
    (r) => r.movieId === movieId && r.userId === currentUser.id
  );
}, [reviews, movieId, currentUser]);

  // ✅ 2. Función para agregar review (insertar al inicio)
  const handleAddReview = (data: { rating: number; review_text: string; tag: Review["tag"] }) => {
    if (!currentUser) {
      alert("Please log in to add a review.");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      userId: currentUser.email,
      movieId,
      rating: data.rating,
      review_text: data.review_text,
      tag: data.tag,
    };

    // Agregar al inicio del array → nuevo review arriba
    setReviews([newReview, ...reviews]);
    setShowModal(false);
  };

  // ✅ 3. Si ya tiene review, ocultar botón
  if (userAlreadyReviewed) {
     return <p className="movie-detail__note">You’ve already reviewed this movie.</p>;
  }

  return (
    <>
      <button className="movie-detail__button" onClick={() => setShowModal(true)}>
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
