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

export const ReviewsTable = ({
  reviews,
  movies,
}: ReviewsTableProps) => {
  const getMovieTitle = (movieId: number): string | null => {
    const movie = movies.find((m) => m.id === movieId);
    return movie ? movie.title : null;
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Película</th>
          <th>Usuario</th>
          <th>Calificación</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => {
          const title = getMovieTitle(review.movieId);
          if (!title) return null;

          return (
            <tr key={review.id}>
              <td>{title}</td>
              <td>
                <span>
                  {review.userId}
                </span>
              </td>
              <td>
                <StarRating value={review.rating} readOnly />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
