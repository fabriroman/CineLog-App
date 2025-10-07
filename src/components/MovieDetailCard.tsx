import type { MovieDetailCardProps } from "../types/movie";
import "../styles/MovieDetailCard.css";
import { StarRating } from "./StarRating";
import { useContext, useState } from "react";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { getRating } from "../utils/rating";
import { WatchlistContext } from "../features/movies/contexts/WatchlistContext";
import { AddReviewButton } from "./AddReviewButton";

export const MovieDetailCard = ({ movie }: MovieDetailCardProps) => {
  const { reviews } = useContext(ReviewsContext);
  const watchlistCtx = useContext(WatchlistContext);

  if (!watchlistCtx) {
    throw new Error("MovieDetailCard must be used within WatchlistProvider");
  }

  const { addToWatchlist, isInWatchlist } = watchlistCtx;

  const [isWatched, setIsWatched] = useState(false);

  const handleAdd = () => {
    addToWatchlist(movie.id);
  };
  const handleWatched = () => {
    setIsWatched(true);
  };

  const rating = getRating(reviews, movie.id);

  return (
    <>
      <article className="movie-detail">
        <div className="movie-detail__poster">
          <img
            className="movie-detail__img"
            src={movie.posterUrl}
            alt={`Poster of ${movie.title}`}
          />
        </div>

        <div className="movie-detail__info">
          <div className="movie-detail__header">
            <h1 className="movie-detail__title">{movie.title}</h1>
            <StarRating value={rating ?? 0} readOnly />
          </div>

          <p className="movie-detail__year">{movie.year}</p>
          <div className="movie-detail__genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="movie-detail__genre">
                {genre}{" "}
              </span>
            ))}
          </div>
          <p className="movie-detail__description">{movie.description}</p>

          <div className="movie-detail__buttons">
            {!isInWatchlist(movie.id) && (
              <button className="movie-detail__button" onClick={handleAdd}>
                Add watch list
              </button>
            )}
            {!isWatched && (
              <AddReviewButton movieId={movie.id}/>
            )}
          </div>
        </div>
      </article>
    </>
  );
};
