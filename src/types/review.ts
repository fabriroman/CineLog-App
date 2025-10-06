export type Review = {
  id: number;
  movieId: number;
  rating: number; 
  review_text: string;
  userId: string;
  tag: "Netflix" | "Prime" | "Movie Theater";
};
