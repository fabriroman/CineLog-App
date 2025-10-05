import type { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";


type cardGridProps = {
    movies : Movie[];
}

export const CardGrid = ({ movies }: cardGridProps) =>{
    return (
        <div className="cards-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
    )
}