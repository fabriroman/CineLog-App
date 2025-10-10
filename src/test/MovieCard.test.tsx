import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import type { Movie } from '../types/movie';

const mockMovie: Movie = {
  id: 123,
  title: "Inception",
  year: 2010,
  posterUrl: "https://example.com/inception.jpg",
  description: "Goood movie not a bad movie",
  rating: 5,
  genres: ["Sci-Fi", "Action", "Thriller"],
  actors: ["Anna", "William"],
};

describe("MovieCard", () => {
  it('renders movie title, year, and "View Details" button', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    // 1. Title
    expect(screen.getByText("Inception")).toBeInTheDocument();

    // 2. Year
    expect(screen.getByText("2010")).toBeInTheDocument();

    // 3. Link
    const viewDetailsLink = screen.getByRole("link", { name: /view details/i });
    expect(viewDetailsLink).toBeInTheDocument();
  });
});
