export type Movie = {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  genres: string[];
  description: string;
  rating: number
};

export type MovieDetailCardProps = {
  movie: Movie;
}
