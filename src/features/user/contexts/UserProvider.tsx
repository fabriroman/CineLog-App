import { type ReactNode, useContext } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { WatchlistContext } from "../../movies/contexts/WatchlistContext";
import { UserContext, type UserContextType } from "./UserContext";
import type { Movie } from "../../../types/movie";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");

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

  const userContext: UserContextType = {
    currentUser: auth.currentUser,
    isAdmin: auth.isAdmin,
    moviesInWatchlist: watchlist
      .flatMap((item) => item.movieIds)
      .map((movieId) => findMovieById(movieId))
      .filter((movie) => movie !== undefined) as Movie[],
    addToWatchlist: addToWatchlist,
    removeFromWatchlist: removeFromWatchlist,
    isInWatchlist: isInWatchlist,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
