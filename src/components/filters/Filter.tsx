import type { GenreDropdownType } from "../../types/genre";
import { GenreDropdown } from "../shared/GenreDropdown";
import { SearchBar } from "../shared/SearchBar";

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
