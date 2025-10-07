import { StarRating } from "./StarRating";

export interface Review {
  id: number;
  movieId: number;
  userId: string | number;
  rating: number;
}

export interface Movie {
  id: number;
  title: string;
}

interface ReviewsTableProps {
  reviews: Review[];
  movies: Movie[];
}

export const ReviewsTable = ({ reviews, movies }: ReviewsTableProps) => {
  const getMovieTitle = (movieId: number): string | null => {
    const movie = movies.find((m) => m.id === movieId);
    return movie ? movie.title : null;
  };

  return (
    <table className="reviews-table">
      <thead className="reviews-table__header">
        <tr className="reviews-table__header-row">
          <th className="reviews-table__header-cell">Película</th>
          <th className="reviews-table__header-cell">Usuario</th>
          <th className="reviews-table__header-cell">Calificación</th>
        </tr>
      </thead>
      <tbody className="reviews-table__body">
        {reviews.map((review) => {
          const title = getMovieTitle(review.movieId);
          if (!title) return null;

          return (
            <tr key={review.id} className="reviews-table__row">
              <td className="reviews-table__cell reviews-table__cell--movie">
                {title}
              </td>
              <td className="reviews-table__cell reviews-table__cell--user">
                <span className="reviews-table__user-id">{review.userId}</span>
              </td>
              <td className="reviews-table__cell reviews-table__cell--rating">
                <StarRating value={review.rating} readOnly />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
