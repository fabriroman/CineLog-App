import "../styles/ProfileMovieCard.css";

interface ProfileMovieCardProps {
  posterUrl: string;
  title: string;
  actions?: React.ReactNode;
}

export const ProfileMovieCard = ({
  posterUrl,
  title,
  actions,
}: ProfileMovieCardProps) => {
  return (
    <article className="movie-card">
      <div className="movie-card__image-container">
        <img
          className="movie-card__img"
          src={posterUrl}
          alt={`${title} poster`}
        />
        <div className="movie-card__overlay">{actions}</div>
      </div>
    </article>
  );
};
