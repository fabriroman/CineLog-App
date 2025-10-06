import { useContext } from "react";
import { ReviewsContext } from "../features/movies/contexts/ReviewsContext";




export function getRating(idMovie: number){
    const {reviews} = useContext(ReviewsContext);
    const ratingsMovie = reviews.filter((review)=>review.movieId === idMovie);

    let sum = ratingsMovie.reduce((accumulator, object) => {
        return accumulator + object.rating;
    }, 0);
    const avgRatings = sum/ratingsMovie.length;
    return Math.round(avgRatings);
}