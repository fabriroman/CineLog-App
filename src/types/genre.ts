export const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Crime",
  "Drama",
  "Music",
  "Sci-Fi",
  "Thriller",
] as const;

export type Genre = (typeof GENRES)[number];

export type GenreDropdownType = Genre | "all";
