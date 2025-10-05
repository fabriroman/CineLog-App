import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MoviesProvider } from "./features/movies/contexts/MoviesProvider.tsx";
import { ReviewProvider } from "./features/movies/contexts/ReviewsProvider.tsx";
import { AuthProvider } from "./features/auth/contexts/AuthProvider.tsx";
import { WatchlistProvider } from "./features/movies/contexts/WatchlistProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoviesProvider>
          <WatchlistProvider>
            <ReviewProvider>
              <App />
            </ReviewProvider>
          </WatchlistProvider>
        </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);