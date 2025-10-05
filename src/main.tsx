import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MoviesProvider } from "./features/movies/contexts/MoviesProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/contexts/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MoviesProvider>
          <App />
        </MoviesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
