import "../styles/Searchbar.css"

interface SearchBarProps {
  searchQuery: string;
  onChange: (query: string) => void;
}

export const SearchBar = ({ searchQuery, onChange }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        id="movie-search"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="search-bar__input"
      />
    </div>
  );
};
