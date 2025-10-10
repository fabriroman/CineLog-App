import { createContext } from "react";
import type { AuthContextType } from "../../auth/contexts/AuthContext";
import type { WatchlistContextType } from "../../movies/contexts/WatchlistContext";
import type { Movie } from "../../../types/movie";
import type { Review } from "../../../types/review";

export type UserContextType = Pick<AuthContextType, "currentUser" | "isAdmin"> &
  Pick<
    WatchlistContextType,
    "addToWatchlist" | "removeFromWatchlist" | "isInWatchlist"
  > & {
    moviesInWatchlist: Movie[];

    moviesWithReviews: {
      movie: Movie;
      review: Review;
    }[];
  };

export const UserContext = createContext<UserContextType | null>(null);
