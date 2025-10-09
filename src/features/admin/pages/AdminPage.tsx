import { useState } from "react";
import { AdminReviewsSection } from "../../../components/AdminReviewsSection";
import { AdminMoviesSection } from "../../../components/AdminMoviesSection";
import { useNavigate } from "react-router-dom";
import "../../../styles/AdminPage.css";

export const AdminPage = () => {
  const [isReviewsShown, setIsReviewsShown] = useState(false);
  const navigate = useNavigate();

  const handleReviews = (isMovies: boolean) => {
    setIsReviewsShown(!isMovies);
  };

  return (
    <div className="admin">
      <div className="admin__header">
        <h1 className="admin__title">Cine Log Admin Panel</h1>
        <div className="admin__controls">
          <button
            className={`admin__button ${
              !isReviewsShown ? "admin__button--active" : ""
            }`}
            onClick={() => handleReviews(true)}
          >
            Movies
          </button>
          <button
            className={`admin__button ${
              isReviewsShown ? "admin__button--active" : ""
            }`}
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
      </div>

      <div className="admin__content">
        {isReviewsShown ? <AdminReviewsSection /> : <AdminMoviesSection />}
      </div>
    </div>
  );
};
