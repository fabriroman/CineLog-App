import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { MoviesContext } from "./MoviesContext";
import { WatchlistContext, type WatchlistItem } from "./WatchlistContext";

const STORAGE_KEY = "watchlist";

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlist, setWatchlist, clearWatchlist] = useLocalStorage<
    WatchlistItem[]
  >(STORAGE_KEY, []);
  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { currentUser } = auth;
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToLogin = () => {
    navigate("/login", { state: { from: { pathname: location.pathname } } });
  };

  const addToWatchlist = (movieId: number) => {
    if (!currentUser) {
      redirectToLogin();
      return;
    }

    if (!isInWatchlist(movieId)) {
      const userId = currentUser.id;
      const userWatchlist = watchlist.find((item) => item.userId === userId);

      if (userWatchlist) {
        // If the user already has a watchlist, add the movie
        setWatchlist(
          watchlist.map((item) =>
            item.userId === userId
              ? { ...item, movieIds: [...item.movieIds, movieId] }
              : item
          )
        );
      } else {
        // If the user doesn't have a watchlist, create a new one
        const newItem: WatchlistItem = {
          id: watchlist.length + 1,
          movieIds: [movieId],
          userId,
        };
        setWatchlist([...watchlist, newItem]);
      }
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    if (!currentUser) {
      redirectToLogin();
      return;
    }

    const userId = currentUser.id;
    const newWatchlist = watchlist
      .map((item) =>
        item.userId === userId
          ? {
              ...item,
              movieIds: item.movieIds.filter((id) => id !== movieId),
            }
          : item
      )
      .filter((item) => item.movieIds.length > 0); // Remove empty watchlists

    if (newWatchlist.length === 0) {
      clearWatchlist();
    } else {
      setWatchlist(newWatchlist);
    }
  };

  const isInWatchlist = (movieId: number) => {
    if (!currentUser) return false;
    const userWatchlist = watchlist.find(
      (item) => item.userId === currentUser.id
    );
    return userWatchlist ? userWatchlist.movieIds.includes(movieId) : false;
  };

  const findMovieById = (movieId: number) => {
    return movies.find((movie) => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        findMovieById,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
