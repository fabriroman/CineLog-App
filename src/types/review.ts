export type Review = {
  id: number;
  movieId: number;
  rating: number; 
  review_text: string;
  userId: number;
  tag: "Netflix" | "Prime" | "Movie Theater";
};
