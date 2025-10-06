import { useContext, useRef, useState } from "react";
import "../styles/ProfilePage.css";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { WatchlistCard } from "./WatchlistCard";
import { NoResultMessage } from "./NoResultMessage";
import { NavBar } from "./NavBar";

const initialMockWatchlistIds = [1, 2, 3, 4, 5, 6, 7, 8];

export const ProfilePage = () => {
  const { movies } = useContext(MoviesContext);
  const [watchlistIds, setWatchlistIds] = useState<number[]>(
    initialMockWatchlistIds
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const watchlistMovies = movies.filter((movie) =>
    watchlistIds.includes(movie.id)
  );

  const handleRemove = (id: number) => {
    setWatchlistIds((prev) => prev.filter((movieId) => movieId !== id));
  };

  return (
    <section className="profile">
      <div className="profile__navbar">
        <NavBar />
      </div>

      <h1 className="profile__title">Your Watchlist</h1>
      {watchlistMovies.length > 0 ? (
        <div className="profile__carousel">
          <button
            className="carousel__arrow carousel__arrow--left"
            onClick={scrollLeft}
          >
            ←
          </button>
          <div className="carousel__track" ref={carouselRef}>
            {watchlistMovies.map((movie) => (
              <WatchlistCard
                key={movie.id}
                movie={movie}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <button
            className="carousel__arrow carousel__arrow--right"
            onClick={scrollRight}
          >
            <div className="arrow">→</div>
          </button>
        </div>
      ) : (
        <div className="profile__empty">
          <NoResultMessage message="No movies in your watchlist" />
        </div>
      )}
    </section>
  );
};
