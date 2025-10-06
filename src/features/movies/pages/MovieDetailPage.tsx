import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../contexts/MoviesContext";
import { MovieDetailCard } from "../../../components/MovieDetailCard";
import { ReviewList } from "../../../components/ReviewList";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = id ? parseInt(id, 10) : NaN;

  const moviesCtx = useContext(MoviesContext);
  if (!moviesCtx)
    throw new Error("MoviesContext must be used within MoviesProvider");
  const { movies } = moviesCtx;
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <>
      <h1>MovieDetail</h1>
      {movie ? (
        <>
          <MovieDetailCard movie={movie} />
          <ReviewList movieId={movieId} />
        </>
      ) : (
        "No hay"
      )}
    </>
  );
};
