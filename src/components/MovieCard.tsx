import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import "../styles/MovieCard.css";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const { id, title, year, posterUrl, genres } = movie;
  return (
    <article className="card">
      <div className="card__image-container">
        <img className="card__img" src={posterUrl} alt={`${title} poster`} />
        <div className="card__overlay">
          <Link className="card__link" to={`/movie/${id}`}>
            <span className="card__link-text">View details</span>
          </Link>
        </div>
      </div>
      <div className="card__body">
        <div className="card__content">
          <h3 className="card__title">{title}</h3>
          <div className="card__meta">
            <span className="card__year">{year}</span>
            <div className="card__genres-container">
              {genres.slice(0, 2).map((genre, index) => (
                <span key={index} className="card__genre">
                  {genre.length > 12 ? `${genre.slice(0, 12)}...` : genre}
                </span>
              ))}
              {genres.length > 2 && (
                <span className="card__genre card__genre--more">
                  +{genres.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
