import { useState } from "react";
import type { Movie } from "../types/movie";
import type { GenreDropdownType } from "../types/genre";

export const useMovieFilters = (movies: Movie[]) => {
  const [selectedGenre, setSelectedGenre] = useState<GenreDropdownType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getFilteredMovies = (): Movie[] => {
    let result = movies;

    // filter by genre
    if (selectedGenre !== "all") {
      result = result.filter((movie) => movie.genres.includes(selectedGenre));
    }

    // filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );
    }

    return result;
  };

  const isFiltering = selectedGenre !== "all" || searchQuery.trim() !== "";

  return {
    selectedGenre,
    setSelectedGenre,
    searchQuery,
    setSearchQuery,
    filteredMovies: getFilteredMovies(),
    isFiltering,
  };
};
