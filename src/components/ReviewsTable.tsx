import { NoResultMessage } from "./NoResultMessage";
import { StarRating } from "./StarRating";
import "../styles/Table.css";

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
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-cell">Movie</th>
          <th className="table__header-cell">User</th>
          <th className="table__header-cell">Rating</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {reviews.length === 0 ? (
          <tr className="table__message">
            <td colSpan={3}>
              <NoResultMessage message="No reviews match your criteria" />
            </td>
          </tr>
        ) : (
          reviews.map((review) => (
            <tr key={review.id} className="table__row">
              <td className="table__cell table__cell--movie">
                {getMovieTitle(review.movieId)}
              </td>
              <td className="table__cell table__cell--user">
                <span className="table__user-id">{review.userId}</span>
              </td>
              <td className="table__cell table__cell--rating">
                <StarRating value={review.rating} readOnly />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
