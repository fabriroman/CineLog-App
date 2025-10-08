import { useState } from "react";
import { AdminReviewsSection } from "../../../components/AdminReviewsSection";
import { AdminMoviesSection } from "../../../components/AdminMoviesSection";

export const Admin = () => {
  const [isReviewsShown, setIsReviewsShown] = useState(false);

  const handleReviews = (isMovies: boolean) => {
    setIsReviewsShown(!isMovies);
  };

  return (
    <div className="admin">
      <h1 className="admin__title">Cine Log Admin Panel</h1>

      <div className="admin__controls">
        <button
          className="admin__button admin__button--movies"
          onClick={() => handleReviews(true)}
        >
          MOVIES
        </button>
        <button
          className="admin__button admin__button--reviews"
          onClick={() => handleReviews(false)}
        >
          REVIEWS
        </button>
      </div>

      {isReviewsShown ? <AdminReviewsSection /> : <AdminMoviesSection />}
    </div>
  );
};
