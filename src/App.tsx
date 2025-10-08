import { Route, Routes } from "react-router-dom";
import { HomePage } from "./features/movies/pages/HomePage";
import LoginPage from "./features/auth/pages/LoginPage";
import { RequireGuest } from "./features/auth/guards/RequireGuest";
import { MovieDetailPage } from "./features/movies/pages/MovieDetailPage";
import { ProfilePage } from "./features/profile/pages/ProfilePage";
import { Admin } from "./features/admin/pages/Admin";
import { RequireAdmin } from "./features/auth/guards/RequireAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/login"
          element={
            <RequireGuest>
              <LoginPage />
            </RequireGuest>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
