import { type ReactNode, useContext } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { WatchlistContext } from "../../movies/contexts/WatchlistContext";
import { ReviewsContext } from "../../movies/contexts/ReviewsContext";
import { UserContext, type UserContextType } from "./UserContext";
import type { Movie } from "../../../types/movie";
import type { Review } from "../../../types/review";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { currentUser, isAdmin } = auth;

  const watchlistCtx = useContext(WatchlistContext);
  if (!watchlistCtx)
    throw new Error("WatchlistContext must be used within WatchlistProvider");
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    findMovieById,
  } = watchlistCtx;

  const reviewsCtx = useContext(ReviewsContext);
  if (!reviewsCtx)
    throw new Error("ReviewsContext must be used within ReviewsProvider");

  const moviesWithReviews: { movie: Movie; review: Review }[] = (
    currentUser
      ? reviewsCtx.reviews.filter((review) => review.userId === currentUser?.id)
      : []
  )
    .map((review) => ({
      movie: findMovieById(review.movieId),
      review,
    }))
    .filter(
      (item): item is { movie: Movie; review: Review } =>
        item.movie !== undefined
    );

  const userContext: UserContextType = {
    currentUser: currentUser,
    isAdmin: isAdmin,

    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    moviesInWatchlist: currentUser
      ? watchlist
          .filter((item) => item.userId === currentUser.id)
          .flatMap((item) => item.movieIds)
          .map((movieId) => findMovieById(movieId))
          .filter((movie) => movie !== undefined)
      : ([] as Movie[]),
    moviesWithReviews,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
