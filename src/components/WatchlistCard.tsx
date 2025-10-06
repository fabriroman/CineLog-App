import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";
import { ProfileMovieCard } from "./ProfileMovieCard";
import { CardActions, CardButton } from "./ProfileCardActions";

interface WatchlistCardProps {
  movie: Movie;
  onRemove: (id: number) => void;
}

export const WatchlistCard = ({ movie, onRemove }: WatchlistCardProps) => {
  const { id, posterUrl, title } = movie;

  const actions = (
    <CardActions>
      <Link to={`/movie/${id}`} style={{ textDecoration: "none" }}>
        <CardButton variant="info">View details</CardButton>
      </Link>
      <CardButton variant="danger" onClick={() => onRemove(id)}>
        Remove
      </CardButton>
    </CardActions>
  );

  return (
    <ProfileMovieCard posterUrl={posterUrl} title={title} actions={actions} />
  );
};
