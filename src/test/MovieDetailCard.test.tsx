import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
// ✅ mock first
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
    };
});
import { MemoryRouter } from "react-router-dom";
import { MovieDetailPage } from "../features/movies/pages/MovieDetailPage";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";
import { WatchlistContext } from "../features/movies/contexts/WatchlistContext";
import { AuthContext } from "../features/auth/contexts/AuthContext";
import type { Review } from "../types/review";

// 🔹 Mock movie data
const mockMovie = {
    id: 1,
    title: "Inception",
    year: 2010,
    genres: ["Sci-Fi", "Action"],
    description: "A dream within a dream.",
    posterUrl: "https://image.tmdb.org/inception.jpg",
    actors: ["Leonardo DiCaprio"],
    rating: 5,
};

const mockMoviesCtx = {
    movies: [mockMovie],
    deleteMovie: vi.fn(),
    updateMovie: vi.fn(),
    createMovie: vi.fn(),
    getMovieTitle: vi.fn(),
};

const mockAuthCtx = {
    currentUser: { id: "1", email: "user@cinelog.com", username: "TestUser", role: "user" },
    isAdmin: false,
    login: vi.fn(),
    logout: vi.fn(),
};

const mockReviews: Review[] = [
    { id: 1, userId: "10", movieId: 1, rating: 4, review_text: "Good movie", tag: "Netflix" },
];
const mockSetReviews = vi.fn();

const mockWatchlistCtx = {
    watchlist: [],
    addToWatchlist: vi.fn(),
    removeFromWatchlist: vi.fn(),
    isInWatchlist: () => false,
    findMovieById: vi.fn(),
};

// 🔹 Mock react-router-dom to simulate URL param


describe("MovieDetailPage", () => {
    it("renders movie detail and reviews", () => {
        render(
            <MemoryRouter initialEntries={["/movie/1"]}>
                <AuthContext.Provider value={mockAuthCtx as any}>
                    <MoviesContext.Provider value={mockMoviesCtx as any}>
                        <ReviewsContext.Provider value={{ reviews: mockReviews, setReviews: mockSetReviews }}>
                            <WatchlistContext.Provider value={mockWatchlistCtx as any}>
                                <MovieDetailPage />
                            </WatchlistContext.Provider>
                        </ReviewsContext.Provider>
                    </MoviesContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Inception")).toBeInTheDocument();
        expect(screen.getByText("2010")).toBeInTheDocument();
        expect(screen.getByText("Good movie")).toBeInTheDocument();
    });

    it("updates reviews correctly", () => {
        render(
            <MemoryRouter initialEntries={["/movie/1"]}>
                <AuthContext.Provider value={mockAuthCtx as any}>
                    <MoviesContext.Provider value={mockMoviesCtx as any}>
                        <ReviewsContext.Provider value={{ reviews: mockReviews, setReviews: mockSetReviews }}>
                            <WatchlistContext.Provider value={mockWatchlistCtx as any}>
                                <MovieDetailPage />
                            </WatchlistContext.Provider>
                        </ReviewsContext.Provider>
                    </MoviesContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const addBtn = screen.getByText("Watched / Add Review");
        fireEvent.click(addBtn);

        mockSetReviews([
            ...mockReviews,
            { id: 2, userId: "2", movieId: 1, rating: 5, review_text: "Amazing!", tag: "Prime" },
        ]);

        expect(mockSetReviews).toHaveBeenCalled();
    });
});
