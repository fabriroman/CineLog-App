import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MoviesProvider } from "./features/movies/contexts/MoviesProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/contexts/AuthProvider.tsx";
import { ReviewProvider } from "./features/movies/contexts/ReviewsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoviesProvider>
          <ReviewProvider>
            <App />
          </ReviewProvider>
        </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
