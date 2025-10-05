import { MovieCard } from "./MovieCard";
import { MoviesContext } from "../features/movies/contexts/MoviesContext";
import { useContext } from "react";


export const CardGrid = () => {
    const { movies } = useContext(MoviesContext);

    return (
        <div className="cards-grid">
             {movies.map((movie) => (
                 <MovieCard key={movie.id} movie={movie} />
                 ))}
        </div>
    )
}