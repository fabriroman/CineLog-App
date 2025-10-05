import { createContext } from "react";
import type { AuthContextType } from "../../auth/contexts/AuthContext";
import type { WatchlistContextType } from "../../movies/contexts/WatchlistContext";
import type { Movie } from "../../../types/movie";

export type UserContextType = AuthContextType &
  WatchlistContextType & {
    moviesInWatchlist: Movie[];
  };

export const UserContext = createContext<UserContextType | null>(null);
