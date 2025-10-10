import "../styles/GenreDropwdown.css";
import { GENRES, type GenreDropdownType } from "../types/genre";

interface GenreDropdownProps {
  selectedGenre: GenreDropdownType;
  onChange: (genre: GenreDropdownType) => void;
}

export const GenreDropdown = ({
  selectedGenre,
  onChange,
}: GenreDropdownProps) => {
  return (
    <div className="genre-dropdown">
      <label htmlFor="genre-select" className="genre-dropdown__label">
        Genre:
      </label>
      <select
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => onChange(e.target.value as GenreDropdownType)}
        className="genre-dropdown__select"
      >
        <option value="all">All</option>
        {GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
