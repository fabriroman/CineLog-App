import "../../../styles/MovieDetailPage.css";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../contexts/MoviesContext";
import { MovieDetailCard } from "../../../components/MovieDetailCard";
import { ReviewList } from "../../../components/ReviewList";
import { NavBar } from "../../../components/NavBar";
import { NoResultMessage } from "../../../components/NoResultMessage";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = id ? parseInt(id, 10) : NaN;

  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-page__navbar">
        <NavBar />
      </div>
      {movie ? (
        <>
          <div className="movie-detail-page__card">
            <MovieDetailCard movie={movie} />
          </div>
          <div className="movie-detail-page__reviews">
            <ReviewList movieId={movieId} />
          </div>
        </>
      ) : (
        <NoResultMessage message="There isn't any details on this movie" />
      )}
    </div>
  );
};
