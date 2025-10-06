import { seedReviews } from "../../../data/reviews";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import type { Review } from "../../../types/review";
import { ReviewsContext } from "./ReviewsContext";

const STORAGE_KEY = "review";

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [reviews, setReviews] = useLocalStorage<Review[]>(STORAGE_KEY, seedReviews);
  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};
