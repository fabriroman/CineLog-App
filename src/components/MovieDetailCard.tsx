import type { MovieDetailCardProps } from "../types/movie";
import "../styles/MovieDetailCard.css";
import { StarRating } from "../utils/StarRating";

export const MovieDetailCard = ({ movie }: MovieDetailCardProps) => {
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
            <StarRating value={movie.rating} readOnly />
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
            <button>Add watch list</button>
            <button>Watched/Add review</button>
          </div>
        </div>
        
        
      </article>
    </>
  );
};
