import { type ReactNode, useContext } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { WatchlistContext } from "../../movies/contexts/WatchlistContext";
import { UserContext } from "./UserContext";
import type { Movie } from "../../../types/movie";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");

  const watchlist = useContext(WatchlistContext);
  if (!watchlist)
    throw new Error("WatchlistContext must be used within WatchlistProvider");

  // Compose the contexts into a single user context
  const userContext = {
    ...auth,
    ...watchlist,
    moviesInWatchlist: watchlist.watchlist
      .flatMap((item) => item.movieIds)
      .map((movieId) => watchlist.findMovieById(movieId))
      .filter((movie) => movie !== undefined) as Movie[],
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
