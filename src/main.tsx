import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/contexts/AuthProvider.tsx";
import { ReviewProvider } from "./features/movies/contexts/ReviewsProvider.tsx";
import { MoviesProvider } from "./features/movies/contexts/MoviesProvider.tsx";
import { WatchlistProvider } from "./features/movies/contexts/WatchlistProvider.tsx";
import { UserProvider } from "./features/user/contexts/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoviesProvider>
          <WatchlistProvider>
            <ReviewProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </ReviewProvider>
          </WatchlistProvider>
        </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
