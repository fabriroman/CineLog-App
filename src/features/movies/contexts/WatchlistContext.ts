import { createContext } from "react";
import type { Movie } from "../../../types/movie";

export type WatchlistItem = {
  id: number;
  movieIds: number[];
  userId: string;
};

export type WatchlistContextType = {
  watchlist: WatchlistItem[];
  addToWatchlist: (movieId: number) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  findMovieById: (movieId: number) => Movie | undefined;
};

export const WatchlistContext = createContext<WatchlistContextType | null>(
  null
);
