import type { GenreDropdownType } from "../types/genre";
import { GenreDropdown } from "./GenreDropdown";
import { SearchBar } from "./SearchBar";
import "../styles/Filter.css";

interface FilterProps {
  selectedGenre: GenreDropdownType;
  onGenreChange: (genre: GenreDropdownType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Filter = ({
  selectedGenre,
  onGenreChange,
  searchQuery,
  onSearchChange,
}: FilterProps) => {
  return (
    <div className="filter">
      <div className="filter__controls">
        <GenreDropdown selectedGenre={selectedGenre} onChange={onGenreChange} />
        <SearchBar searchQuery={searchQuery} onChange={onSearchChange} />
      </div>
    </div>
  );
};
