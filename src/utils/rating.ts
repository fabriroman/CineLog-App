import type { Review } from '../types/review';

export function getRating(reviews: Review[], movieId: number): number | null {
  const movieReviews = reviews.filter(review => review.movieId === movieId);
  if (movieReviews.length === 0) return null;
  
  const sum = movieReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round(sum / movieReviews.length);
}