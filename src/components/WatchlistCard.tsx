import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import "../styles/WatchlistCard.css";

interface WatchlistCardProps {
  movie: Movie;
  onRemove: (id: number) => void;
}

export const WatchlistCard = ({ movie, onRemove }: WatchlistCardProps) => {
  const { id, posterUrl, title } = movie;

  return (
    <article className="watchlist-card">
      <div className="watchlist-card__image-container">
        <img
          className="watchlist-card__img"
          src={posterUrl}
          alt={`${title} poster`}
        />
        <div className="watchlist-card__overlay">
          <Link
            className="watchlist-card__button watchlist-card__button--view"
            to={`/movie/${id}`}
          >
            <span className="watchlist-card__button-text">View details</span>
          </Link>

          <button
            className="watchlist-card__button watchlist-card__button--remove"
            onClick={() => onRemove(id)}
          >
            <span className="watchlist-card__button-text">Remove</span>
          </button>
        </div>
      </div>
    </article>
  );
};
