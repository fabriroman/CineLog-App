import { Route, Routes } from "react-router-dom";
import { HomePage } from "./features/movies/pages/HomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import { RequireGuest } from "./features/auth/guards/RequireGuest";
import { MovieDetailPage } from "./features/movies/pages/MovieDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route
          path="/login"
          element={
            <RequireGuest>
              <LoginPage />
            </RequireGuest>
          }
        />
      </Routes>
    </>
  );
}

export default App;
