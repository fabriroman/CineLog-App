import { useContext, useState } from "react";
import "../../../styles/ProfilePage.css";
import { WatchlistCard } from "../../../components/WatchlistCard";
import { ReviewCard } from "../../../components/ReviewCard";
import { NoResultMessage } from "../../../components/NoResultMessage";
import { NavBar } from "../../../components/NavBar";
import { Carousel } from "../../../components/Carousel";
import { UserContext } from "../../user/contexts/UserContext";
import { ReviewsContext } from "../../movies/contexts/ReviewsContext";
import { getFavoriteGenre, getUserAverageRating } from "../../../utils/rating";
import type { Review } from "../../../types/review";
import { ReviewModal } from "../../../components/ReviewModal";

export const ProfilePage = () => {
  const userCtx = useContext(UserContext);
  const reviewsCtx = useContext(ReviewsContext);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  if (!userCtx) throw new Error("UserContext must be used within UserProvider");
  if (!reviewsCtx)
    throw new Error("ReviewsContext must be used within ReviewProvider");

  const { moviesInWatchlist, removeFromWatchlist, moviesWithReviews } = userCtx;
  const { setReviews, reviews } = reviewsCtx;

  const userReviews = userCtx.moviesWithReviews.map(({ review }) => review);
  const averageRating = getUserAverageRating(userReviews);
  const favoriteGenre = getFavoriteGenre(userCtx.moviesInWatchlist);

  const handleRemoveFromWatchlist = (id: number) => {
    removeFromWatchlist(id);
  };

  const handleRemoveReview = (id: number) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const handleEditReview = (updatedData: {
    rating: number;
    review_text: string;
    tag: Review["tag"];
  }) => {
    if (!editingReview) return;

    const updatedReviews = reviews.map((review) =>
      review.id === editingReview.id ? { ...review, ...updatedData } : review
    );

    setReviews(updatedReviews);
    setEditingReview(null);
  };

  return (
    <section className="profile">
      <div className="profile__navbar">
        <NavBar />
      </div>

      {moviesInWatchlist.length > 0 ? (
        <Carousel title="Your Watchlist">
          {moviesInWatchlist.map((movie) => (
            <WatchlistCard
              key={movie.id}
              movie={movie}
              onRemove={handleRemoveFromWatchlist}
            />
          ))}
        </Carousel>
      ) : (
        <div className="profile__section">
          <h1 className="profile__title">Your Watchlist</h1>
          <NoResultMessage message="No movies in your watchlist yet" />
        </div>
      )}

      {moviesWithReviews.length > 0 ? (
        <Carousel title="Your Reviews">
          {moviesWithReviews.map(({ movie, review }) => (
            <ReviewCard
              key={review.id}
              review={review}
              movieTitle={movie.title}
              moviePoster={movie.posterUrl}
              onRemove={handleRemoveReview}
              onEdit={setEditingReview}
            />
          ))}
        </Carousel>
      ) : (
        <div className="profile__section">
          <h1 className="profile__title">Your Reviews</h1>
          <NoResultMessage message="No reviews yet" />
        </div>
      )}

      <div className="profile__stats">
        <h2 className="profile__stats-title">My Stats</h2>
        <div className="profile__stats-list">
          <div className="profile__stats-item">
            <span className="profile__stats-label"> Average rating:</span>
            <span className="profile__stats-value">
              {userReviews.length > 0 ? averageRating.toFixed(1) : "N/A"}
            </span>
          </div>
          <div className="profile__stats-item">
            <span className="profile__stats-label"> Favorite Genre:</span>
            <span className="profile__stats-value">{favoriteGenre}</span>
          </div>
        </div>
      </div>

      {editingReview && (
        <ReviewModal
          initialReview={editingReview}
          onClose={() => setEditingReview(null)}
          onSubmit={handleEditReview}
        />
      )}
    </section>
  );
};
