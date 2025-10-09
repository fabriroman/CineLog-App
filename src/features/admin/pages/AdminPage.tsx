import { useState } from "react";
import { AdminReviewsSection } from "../../../components/AdminReviewsSection";
import { AdminMoviesSection } from "../../../components/AdminMoviesSection";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const [isReviewsShown, setIsReviewsShown] = useState(false);

  const handleReviews = (isMovies: boolean) => {
    setIsReviewsShown(!isMovies);
  };

  const navigate = useNavigate();

  return (
    <div className="admin">
      <h1 className="admin__title">Cine Log Admin Panel</h1>

      <div className="admin__controls">
        <button
          className="admin__button admin__button--movies"
          onClick={() => handleReviews(true)}
        >
          Movies
        </button>
        <button
          className="admin__button admin__button--reviews"
          onClick={() => handleReviews(false)}
        >
          Reviews
        </button>
        <button
          className="admin__button admin__button--home"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      {isReviewsShown ? <AdminReviewsSection /> : <AdminMoviesSection />}
    </div>
  );
};
