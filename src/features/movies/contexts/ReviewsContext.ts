import { createContext } from "react";
import type { Review } from "../../../types/review";

export type ReviewContextType = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewContextType>({
  reviews: [],
  setReviews: () => {},
});
