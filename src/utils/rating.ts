import type { Genre } from "../types/genre";
import type { Movie } from "../types/movie";
import type { Review } from "../types/review";

export function getRating(reviews: Review[], movieId: number): number | null {
  const movieReviews = reviews.filter((review) => review.movieId === movieId);
  if (movieReviews.length === 0) return null;

  const sum = movieReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round(sum / movieReviews.length);
}

export function getUserAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getFavoriteGenre(movies: Movie[]): Genre | "N/A" {
  if (movies.length === 0) return "N/A";

  const allGenres = movies.flatMap((movie) => movie.genres);

  const genreCounts = new Map<Genre, number>();

  allGenres.forEach((genre) => {
    genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
  });

  if (genreCounts.size === 0) return "N/A";

  const favoriteGenreEntry = [...genreCounts.entries()].sort(
    (a, b) => b[1] - a[1]
  )[0];

  return favoriteGenreEntry ? favoriteGenreEntry[0] : "N/A";
}
