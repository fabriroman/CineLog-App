import { useContext } from "react";
import "../../../styles/ProfilePage.css";
import { WatchlistCard } from "../../../components/WatchlistCard";
import { ReviewCard } from "../../../components/ReviewCard";
import { NoResultMessage } from "../../../components/NoResultMessage";
import { NavBar } from "../../../components/NavBar";
import { Carousel } from "../../../components/Carousel";
import { UserContext } from "../../user/contexts/UserContext";
import { ReviewsContext } from "../../movies/contexts/ReviewsContext";

export const ProfilePage = () => {
  const userCtx = useContext(UserContext);
  const reviewsCtx = useContext(ReviewsContext);

  if (!userCtx) throw new Error("UserContext must be used within UserProvider");
  if (!reviewsCtx)
    throw new Error("ReviewsContext must be used within ReviewProvider");

  const { moviesInWatchlist, removeFromWatchlist, moviesWithReviews } = userCtx;
  const { setReviews, reviews } = reviewsCtx;

  const handleRemoveFromWatchlist = (id: number) => {
    removeFromWatchlist(id);
  };

  const handleRemoveReview = (id: number) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
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
            />
          ))}
        </Carousel>
      ) : (
        <div className="profile__section">
          <h1 className="profile__title">Your Reviews</h1>
          <NoResultMessage message="No reviews yet" />
        </div>
      )}
    </section>
  );
};
